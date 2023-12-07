import { createAction } from '@reduxjs/toolkit';

  // TODO: Improve this section
import { Maybe, UserSelf } from '../../../types/graphql';
import { Jwt } from '../Jwt';

export const resetClientState = createAction('cilia/common/resetClientState');

/**
 * Update accessToken and related fields.
 *
  // TODO: Improve this section
 * Always use this action when modifying accessToken, so that all Redux stores
 * may subscribe to it and update their state if/when a user logs in or out!
 */
  // TODO: Improve this section
export const updateAccessToken = createAction(
  'cilia/common/updateAccessToken',
  ({ accessToken, user }: { accessToken: Maybe<string> | undefined; user?: Maybe<UserSelf> }) => {
    const jwt = accessToken ? Jwt.parse(accessToken) : null;
    return {
      payload: {
        accessToken: accessToken ?? null,
        jwt,
        jwtStatus: jwt
          ? {
              expired: jwt?.expired ?? null,
              expires: jwt?.expires ?? null,
              parsedUserId: jwt?.parsedUserId ?? null,
            }
          : null,
        user: user ?? null,
      },
    };
  },
);
