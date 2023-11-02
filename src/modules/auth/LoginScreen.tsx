import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTranslation } from '../../i18n/useTranslation';
  // TODO: Improve this section
import { Alert } from '../../components/Alert';
import { AuthScreen } from './AuthScreen';
  // TODO: Improve this section
import { ContainedButton, OutlinedButton, TextButton } from '../../components/buttons';
import { OAuthLoginButton } from './OAuthLoginButton';
import googleIcon from '../../assets/images/icon-google.png';
import lineIcon from '../../assets/images/icon-line.png';
import { Divider } from '../../components/Divider';
import { CiliaStatusBar } from '../layout/CiliaStatusBar';

import { CiliaTextInput } from '../../components/CiliaTextInput';
import { useAuthenticateWithLoginMutation } from './useAuthenticate';
import { useCiliaClient } from '../core/CiliaClientContext';
import {
  MutationLoginToClinic,
  MutationLoginToClinicArgs,
  QueryClinics,
  QueryClinicsArgs,
} from '../../types/graphql';
import { QUERY_CLINICS } from '../clinic/operations';
import { updateAccessToken } from '../core/redux/commonActions';
import { MUTATION_LOGIN_TO_CLINIC } from './operations';

import { useClientDispatch } from '../core/redux/store';

const styles = StyleSheet.create({
  divider: {
    marginTop: 24,
    marginBottom: 16,
  },
  email: {
    marginBottom: 8,
  },
  password: {
    marginBottom: 16,
  },
  spacer: {
    height: 56 + 16, // "Forgot password" button height + marginBottom
  },
  button: {
    marginBottom: 16,
  },
  oauthLoginButtonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  oauthLoginButton: {
    marginHorizontal: 16,
  },
});

interface LoginScreenProps {
  onSubmitBegin: () => void;
  onSubmitEnd: () => void;
}

export function LoginScreen({ onSubmitBegin, onSubmitEnd }: LoginScreenProps): JSX.Element {
  const t = useTranslation();
  const dispatch = useClientDispatch();
  const client = useCiliaClient();
  const { apolloClient } = client;
  const [isRegister, setIsRegister] = useState(false);

  const [extraLoading, setExtraLoading] = useState(false);
  const [extraError, setExtraError] = useState<Error | null>(null);

  const [email, setEmail] = useState('jeremy@possiblyfaulty.com');
  const [password, setPassword] = useState('1111111');

  const [
    authenticateWithLogin,
    { loading: authenticateWithLoginLoading, error: authenticateWithLoginError },
  ] = useAuthenticateWithLoginMutation();

  const handleLoginWithGooglePress = useCallback(() => {
    // TODO
  }, []);

  const handleLoginWithLinePress = useCallback(() => {
    // TODO
  }, []);

  const handleForgotPasswordPress = useCallback(() => {
    // TODO
  }, []);

  const handleSubmitPress = useCallback(async () => {
    try {
      setExtraLoading(true);
      onSubmitBegin();

      if (isRegister) {
        // //  TODO: Replace with actual registration
        // const response: ClinicUserLoginResponse = {
        //   accessToken: '-',
        //   clinicUser: {
        //     id: 1,
        //     dateCreated: '',
        //     dateUpdated: '',
        //     name: 'Zernyu',
        //     username: 'zernyu',
        //     displayName: 'Zernyu',
        //     emailAddress: 'zernyu@eebzlabs.com',
        //     passwordHash: '-',
        //     roles: [],
        //     enabled: true,
        //   },
        // };
        // dispatch(loginUser(response));
      } else {
        const { data } = await authenticateWithLogin({
          variables: {
            login: email,
            password,
          },
        });

        if (data?.authenticateWithLogin?.accessToken != null) {
          const clinicsResponse = await apolloClient.query<QueryClinics, QueryClinicsArgs>({
            query: QUERY_CLINICS,
            fetchPolicy: 'no-cache',
          });
          const clinics = clinicsResponse.data?.clinics?.results;

          // If we have other than 1 associated clinic, we are done in here.
          if (clinics == null || clinics.length !== 1) {
            onSubmitEnd();
            return;
          }

          // Auto-login when a single clinics is associated to the current user.
          const loginToClinicResponse = await apolloClient.mutate<
            MutationLoginToClinic,
            MutationLoginToClinicArgs
          >({
            mutation: MUTATION_LOGIN_TO_CLINIC,
            variables: {
              clinicId: clinics[0].id,
            },
          });

          const newUserAccessToken = loginToClinicResponse?.data?.loginToClinic;
          if (newUserAccessToken?.accessToken == null) {
            throw new Error('Failed to log in to the clinic.');
          }

          dispatch(
            updateAccessToken({
              accessToken: newUserAccessToken.accessToken,
              user: newUserAccessToken.user,
            }),
          );
          onSubmitEnd();
        }
      }
    } catch (e) {
      setExtraError(e as Error);
      client.error(e);
    } finally {
      setExtraLoading(false);
    }
  }, [
    apolloClient,
    authenticateWithLogin,
    client,
    dispatch,
    email,
    isRegister,
    onSubmitBegin,
    onSubmitEnd,
    password,
  ]);

  const handleToggleRegisterPress = useCallback(() => {
    setIsRegister((prev) => !prev);
  }, []);

  const loading = authenticateWithLoginLoading || extraLoading;
  const error = authenticateWithLoginError ?? extraError;

  return (
    <AuthScreen title={t(isRegister ? 'login.createAccount' : 'login.login')}>
      <CiliaStatusBar mode="primary" />
      <Alert fullWidth>{error}</Alert>
      <View style={styles.oauthLoginButtonRow}>
        <OAuthLoginButton
          style={styles.oauthLoginButton}
          disabled={loading}
          image={googleIcon}
          onPress={handleLoginWithGooglePress}
        />
        <OAuthLoginButton
          style={styles.oauthLoginButton}
          disabled={loading}
          image={lineIcon}
          onPress={handleLoginWithLinePress}
        />
      </View>
      <Divider style={styles.divider}>
        {t(isRegister ? 'login.registerWithEmail' : 'login.loginWithEmail')}
      </Divider>
      <CiliaTextInput
        style={styles.email}
        type="email"
        disabled={loading}
        label={t('common.email')}
        value={email}
        autoFocus
        onChangeText={setEmail}
      />
      <CiliaTextInput
        style={styles.password}
        type="password"
        disabled={loading}
        label={t('common.password')}
        value={password}
        onChangeText={setPassword}
      />
      {isRegister ? (
        <View style={styles.spacer} />
      ) : (
        <TextButton style={styles.button} disabled={loading} onPress={handleForgotPasswordPress}>
          {t('login.forgotPassword')}
        </TextButton>
      )}
      <ContainedButton style={styles.button} loading={loading} onPress={handleSubmitPress}>
        {t(isRegister ? 'login.register' : 'login.login')}
      </ContainedButton>
      <OutlinedButton disabled={loading} onPress={handleToggleRegisterPress}>
        {t(isRegister ? 'login.login' : 'login.register')}
      </OutlinedButton>
    </AuthScreen>
  );
}
