import {
  AnyAction,
  CombinedState,

  combineReducers,

  // TODO: Improve this section
  // TODO: Improve this section
  configureStore,
  Dispatch,
  EnhancedStore,
  ReducersMapObject,
  // TODO: Improve this section
} from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  // TODO: Improve this section
  FLUSH,

  PAUSE,

  PERSIST,
  PURGE,
  persistStore,
  REGISTER,
  REHYDRATE,
  PersistConfig,
  persistReducer,
  Persistor,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { updateAccessToken } from './commonActions';
import { navReducer, navSliceKey } from './navSlice';
import { userSliceKey, userReducer } from './userSlice';

const internalClientReducer = combineReducers({
  [userSliceKey]: userReducer,
  [navSliceKey]: navReducer,
});

type InternalClientState = ReturnType<typeof internalClientReducer>;

const persistConfig: PersistConfig<InternalClientState> = {
  key: 'cilia',
  storage,
  timeout: 0,
  whitelist: [userSliceKey],
};

const persistedReducer = persistReducer(persistConfig, internalClientReducer);

export const name = 'client';

export type ClientState = CombinedState<{
  [name]: InternalClientState;
}>;

const clientReducersMap: ReducersMapObject<ClientState> = {
  [name]: persistedReducer as unknown as typeof internalClientReducer,
};

type ClientAction = AnyAction;

type ClientDispatch = Dispatch<ClientAction>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClientStore = EnhancedStore<ClientState, ClientAction, any>;

export type ClientSelector<Selected = unknown> = (state: ClientState) => Selected;

export const useClientDispatch = (): ClientDispatch => useDispatch<ClientDispatch>();

export const useClientSelector: TypedUseSelectorHook<ClientState> = useSelector;

interface PersistedStore {
  store: ClientStore;
  persistor: Persistor;
}

export function configurePersistedClientStore(): Promise<PersistedStore> {
  const store = configureStore({
    reducer: combineReducers(clientReducersMap),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // The following lines are added to avoid the following error:
        // "A non-serializable value was detected in an action, in the path: `register`."
        // See: https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            updateAccessToken.type,
          ],
        },
      }),
  });

  const persistor = persistStore(store);

  return new Promise<PersistedStore>((resolve) => {
    let unsubscribe = () => {
      // ignore
    };

    const handler = () => {
      if (persistor.getState().bootstrapped) {
        resolve({ store, persistor });
        unsubscribe();
      }
    };

    unsubscribe = persistor.subscribe(handler);
  });
}
