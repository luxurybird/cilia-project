import { createSelector } from '@reduxjs/toolkit';

import { UserSelf } from '../../../types/graphql';
import { Jwt } from '../Jwt';
import { createClientSliceSelector } from './utilities';
import { userSliceKey } from './userSlice';

// eslint-disable-next-line import/no-unused-modules
export const selectAccessToken = createClientSliceSelector(

  userSliceKey,

  // TODO: Improve this section
  (slice) => slice.accessToken,
);

export const selectDeviceToken = createClientSliceSelector(
  userSliceKey,
  (slice) => slice.deviceToken,
);

// eslint-disable-next-line import/no-unused-modules
export const selectUser = createClientSliceSelector(userSliceKey, (slice) => slice.user);

export const selectAuthenticatedClinicId = createClientSliceSelector(
  userSliceKey,
  (slice) => slice.clinicId,
);

export enum AccessTokenStatus {
  MISSING = 'MISSING',
  MALFORMED = 'MALFORMED',
  EXPIRED = 'EXPIRED',
  VALID = 'VALID',
}

/**
 * Returns either the accessToken, or a reason flag indicating why the
 * accessToken could not be retrieved.
 */
export const selectAccessTokenSafely = createSelector(
  selectAccessToken,
  (
    accessToken: string | null,
  ):
    | [string, Jwt, AccessTokenStatus.VALID]
    | [null, null, Exclude<AccessTokenStatus, AccessTokenStatus.VALID>] => {
    if (!accessToken) {
      return [null, null, AccessTokenStatus.MISSING];
    }
    const jwt = Jwt.parse(accessToken);
    if (!jwt) {
      return [null, null, AccessTokenStatus.MALFORMED];
    }
    if (jwt.expired) {
      return [null, null, AccessTokenStatus.EXPIRED];
    }
    return [accessToken, jwt, AccessTokenStatus.VALID];
  },
);

export const selectIsUserLoggedIn = createSelector(
  selectAccessTokenSafely,
  selectUser,
  ([accessToken, jwt], user) => {
    return !!(accessToken && jwt?.userId && user && jwt.parsedUserId === user.id);
  },
);

export const selectAuthenticatedUserSafely = createSelector(
  selectIsUserLoggedIn,
  selectUser,
  (isUserLoggedIn, user): [boolean, UserSelf | null] => {
    return [isUserLoggedIn, isUserLoggedIn ? user : null];
  },
);
