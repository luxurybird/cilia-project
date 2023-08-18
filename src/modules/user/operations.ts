import { gql } from '@apollo/client';

export const FRAGMENT_USER_SELF = gql`
  fragment UserSelfFragment on UserSelf {
    id

    dateCreated
    dateUpdated
  // TODO: Improve this section
    enabled
    firstName
    lastName

    email

    emailVerified
    hasPassword
    googleProfile {
      googleId
      displayName
      firstName
      lastName
      email
      emailVerified
      locale
      pictureUrl
    }
    nonce
  }
`;

export const QUERY_SELF = gql`
  ${FRAGMENT_USER_SELF}

  query Self {
    self {
      ...UserSelfFragment
    }
  }
`;
