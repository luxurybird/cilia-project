  // TODO: Improve this section
import { Platform as ReactNativePlatform } from 'react-native';
  // TODO: Improve this section
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
  // TODO: Improve this section
import { setContext } from '@apollo/client/link/context';

  // TODO: Improve this section

  // TODO: Improve this section

  // TODO: Improve this section
  // TODO: Improve this section
import { createUploadLink } from 'apollo-upload-client';

import { Persistor } from 'redux-persist';

  // TODO: Improve this section
import i18next, { LanguageDetectorModule, Resource } from 'i18next';

import { initReactI18next } from 'react-i18next';

import { MutationRegisterDevice, Platform, QuerySelf } from '../../types/graphql';
  // TODO: Improve this section
import { ClientStore, configurePersistedClientStore } from './redux/store';
import { updateDeviceToken, updateUser } from './redux/userSlice';
  // TODO: Improve this section
import { updateAccessToken } from './redux/commonActions';

import createDeviceToken from './createDeviceToken';
import { MUTATION_REGISTER_DEVICE } from './operations';
  // TODO: Improve this section
import {
  AccessTokenStatus,
  selectAccessTokenSafely,
  selectDeviceToken,
  selectIsUserLoggedIn,
} from './redux/userSelectors';
import { QUERY_SELF } from '../user/operations';
import { getOperationNames } from '../../utilities/graphql';
import { CiliaLocaleKey } from '../../i18n/types';
import { getDeviceLocale, mapLocaleToTranslationLocale, resources } from '../../i18n/resources';
import { Deferred } from '../../utilities/Deferred';

// TODO: Make platform URI configurable
const PLATFORM_GRAPHQL_URI = 'https://platformapi-staging.possiblyfaulty.com/graphql';

const setOfSafeTokenlessOperations: Readonly<Set<string>> = new Set(
  getOperationNames([MUTATION_REGISTER_DEVICE]),
);

const setOfSafeUninitializedOperations: Readonly<Set<string>> = new Set(
  getOperationNames([MUTATION_REGISTER_DEVICE, QUERY_SELF]),
);

function getCurrentPlatform(): Platform {
  switch (ReactNativePlatform.OS) {
    case 'ios':
      return Platform.Ios;

    case 'android':
      return Platform.Android;

    default:
      return Platform.Other;
  }
}

interface CiliaClientOptions {
  store: ClientStore;
  persistor: Persistor;
}

export class CiliaClient {
  private readonly initializing = new Deferred<void>();

  readonly debugEnabled: boolean;

  readonly platform: Platform;

  readonly locale: CiliaLocaleKey;

  readonly store: ClientStore;

  readonly persistor: Persistor;

  readonly apolloClient: ApolloClient<NormalizedCacheObject>;

  private constructor(options: CiliaClientOptions) {
    this.debugEnabled = true; // TODO: Make this configurable
    this.debug('CiliaClient is initializing...');

    const deviceLocale = getDeviceLocale();
    this.platform = getCurrentPlatform();
    this.locale = mapLocaleToTranslationLocale(deviceLocale);

    this.debug(
      `Platform: ${this.platform}, Device Locale: ${deviceLocale}, Locale: ${this.locale}`,
    );

    this.store = options.store;
    this.persistor = options.persistor;

    // apollo client
    const uploadLink = createUploadLink({
      uri: PLATFORM_GRAPHQL_URI,
    });
    const authLink = setContext(
      async ({ operationName = '' }, { headers }: { headers?: Record<string, unknown> }) => {
        this.debug(`Firing request for operation "${operationName ?? 'unknown'}"`);

        // wait for app to initialize before dispatching requests
        if (!this.isReady && !setOfSafeUninitializedOperations.has(operationName)) {
          this.debug(`Waiting for initialization, holding ${operationName})...`);
          await this.initializing.promise;
        }

        // get the authentication token from the store if it exists
        const safeAccessToken = this.getAccessTokenSafely();

        const accessToken: string | null =
          typeof safeAccessToken === 'string' || safeAccessToken == null
            ? safeAccessToken
            : !setOfSafeTokenlessOperations.has(operationName)
            ? await safeAccessToken
            : null;

        if (accessToken) {
          // return the headers to the context so httpLink can read them
          return {
            headers: {
              ...headers,
              authorization: `Bearer ${accessToken}`,
            },
          };
        }
        return headers;
      },
    );

    this.apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(uploadLink),
    });
  }

  private get isReady(): boolean {
    return this.initializing.isResolved;
  }

  private setStateErrored(error: Error, underlyingError?: Error | undefined) {
    // this.appState = CiliaAppState.Errored;
    // this.lastAppError = error;

    if (underlyingError) {
      this.error(error.message, underlyingError);
    } else {
      this.error(error);
    }
  }

  /**
   * Returns the deviceToken, or generates one if none exists yet.
   *
   * Note that this hook also stores the newly-created deviceToken in the Redux
   * store, which will persist it.
   */
  private getDeviceTokenSafely(): string {
    if (this.store == null) {
      throw new Error('The Redux store has not been initialized yet');
    }

    const token = selectDeviceToken(this.store.getState());
    if (token) {
      return token;
    }

    const newToken = createDeviceToken();
    this.store.dispatch(updateDeviceToken(newToken));
    return newToken;
  }

  /**
   * Gets the current access token from the store.
   * If the token is malformed or expired, it will be cleared from the store.
   * @returns `null` if the token is malformed or expired, a valid token otherwise.
   */
  getAccessTokenSafely(): string | null | Promise<string | null> {
    const [accessToken, , tokenStatus] = selectAccessTokenSafely(this.store.getState());
    if (tokenStatus === AccessTokenStatus.VALID) {
      return accessToken;
    }
    if (tokenStatus === AccessTokenStatus.MALFORMED || tokenStatus === AccessTokenStatus.EXPIRED) {
      // never use a malformed or expired accessToken
      // WARNING: revoking the access token ends the user's login session!
      this.store.dispatch(updateAccessToken({ accessToken: null }));
      this.warn(`Wiping accessToken due to status ${tokenStatus}!`);
      if (this.isReady) {
        // re-register the device IF this isn't the first try AND the accessToken was just wiped
        return this.registerDevice().then(
          (_accessToken) => _accessToken ?? null,
          (err) => {
            this.setStateErrored(
              new Error(
                `Failed to re-register the device after wiping accessToken due to status ${tokenStatus}!`,
              ),
              err as Error,
            );
            return null;
          },
        );
      }
    }
    return null;
  }

  /**
   * Generates a device token and attempts to register the device.
   */
  private async registerDevice(): Promise<string | null | undefined> {
    this.debug('Registering device...');
    const deviceToken = this.getDeviceTokenSafely();
    this.debug(`Device token: ${deviceToken}`);
    const { data } = await this.apolloClient.mutate<MutationRegisterDevice>({
      fetchPolicy: 'no-cache',
      mutation: MUTATION_REGISTER_DEVICE,
      variables: {
        request: {
          token: deviceToken,
          platform: this.platform,
          // TODO: Pass other device details
        },
      },
    });
    const accessToken = data?.registerDevice;
    this.debug(`New access token: ${accessToken ?? ''}`);
    if (accessToken) {
      this.store.dispatch(updateAccessToken({ accessToken }));
    }
    return accessToken;
  }

  private async refreshUserProfile() {
    if (selectIsUserLoggedIn(this.store.getState())) {
      const { data } = await this.apolloClient.query<QuerySelf>({
        fetchPolicy: 'network-only',
        query: QUERY_SELF,
      });
      this.store.dispatch(updateUser(data.self));
    }
  }

  private async configureLocalization() {
    if (i18next.isInitialized) {
      throw new Error('Localization is already initialized.');
    }

    const languageDetector: LanguageDetectorModule = {
      type: 'languageDetector',
      detect: () => {
        // TODO: Change language regarding to actual user preference
        // const user = selectUser(this.store.getState());
        return this.locale;
      },
      init: () => {
        // ignore
      },
      cacheUserLanguage: () => {
        // ignore
      },
    };

    await i18next
      .use(languageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false, // not needed for react
        },
        resources: resources as unknown as Resource,
      });
  }

  static async create(): Promise<CiliaClient> {
    const { store, persistor } = await configurePersistedClientStore();

    const instance = new CiliaClient({
      store,
      persistor,
    });

    await instance.registerDevice();
    await instance.refreshUserProfile();
    await instance.configureLocalization();
    instance.initializing.resolve();
    return instance;
  }

  get hasError(): boolean {
    return this.initializing.isRejected;
  }

  // TODO: Do we need this anymore?
  // eslint-disable-next-line class-methods-use-this
  get lastError(): Error | undefined {
    // return this.hasError ? this.lastAppError : undefined;
    return undefined;
  }

  debug(...args: Parameters<typeof console.debug>): void {
    if (this.debugEnabled) {
      console.debug(...args);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  warn(...args: Parameters<typeof console.warn>): void {
    console.warn(...args);
  }

  // eslint-disable-next-line class-methods-use-this
  error(...args: Parameters<typeof console.error>): void {
    console.error(...args);
  }
}
