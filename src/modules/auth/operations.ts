import { gql } from '@apollo/client';

import { FRAGMENT_USER_SELF } from '../user/operations';

const FRAGMENT_USER_ACCESS_TOKEN = gql`
  ${FRAGMENT_USER_SELF}

  fragment UserAccessTokenFragment on UserAccessToken {
    accessToken
    user {
      ...UserSelfFragment
    }
  }
`;

export const MUTATE_AUTHENTICATE_WITH_LOGIN = gql`
  ${FRAGMENT_USER_ACCESS_TOKEN}

  mutation AuthenticateWithLogin($login: String!, $password: String!) {
    authenticateWithLogin(login: $login, password: $password) {
      ...UserAccessTokenFragment
    }
  }
`;

export const MUTATION_LOGIN_TO_CLINIC = gql`
  ${FRAGMENT_USER_ACCESS_TOKEN}

  mutation LoginToClinic($clinicId: Id!) {
    loginToClinic(clinicId: $clinicId) {
      ...UserAccessTokenFragment
    }
  }
`;

export const MUTATION_LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
