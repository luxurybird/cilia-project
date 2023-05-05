import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSelf } from '../../../types/graphql';

import { resetClientState, updateAccessToken } from './commonActions';


interface UserState {

  deviceToken: string | null;
  accessToken: string | null;

  user: UserSelf | null;
  clinicId: string | null;
}

const initialState: UserState = {
  // TODO: Improve this section
  deviceToken: null,
  accessToken: null,

  user: null,
  clinicId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  /* eslint-disable no-param-reassign */
  reducers: {
    updateDeviceToken: (state, action: PayloadAction<string>) => {
      // TODO: should we wipe accessToken+user if deviceToken existed but changed?
      state.deviceToken = action.payload;
    },
    updateUser: (state, action: PayloadAction<UserSelf | null | undefined>) => {
      state.user = action.payload ?? null;
    },
  },
  // "builder callback" style of adding reducers used for better type inference!
  extraReducers: (builder) => {
    builder
      .addCase(resetClientState, (_state, _action) => {
        return initialState;
      })
      .addCase(updateAccessToken, (state, action) => {
        // TODO: should we wipe PII from apollo cache, when a user logs out?
        if (!action.payload.accessToken) {
          state.accessToken = null;
          state.user = null;
          state.clinicId = null;
          return;
        }

        state.accessToken = action.payload.accessToken;

        if (!action.payload.jwt?.userId) {
          /*
           * The jwt isn't for a user, so wipe user from the store!
           * This can happen when a user-role accessToken that is malformed or
           * expired is passed to registerDevice, which then returns a device-
           * only accessToken.
           */
          state.user = null;
          state.clinicId = null;
        } else {
          if (action.payload.user) {
            state.user = action.payload.user;
          }

          state.clinicId = action.payload.jwt?.clinicId ?? null;

          const jwtUserId = action.payload.jwt.parsedUserId;
          if (jwtUserId !== state.user?.id) {
            console.warn(
              `Received accessToken with non-matching userId! (jwt.userId: ${
                jwtUserId ?? ''
              }, user.id: ${state.user?.id ?? ''})`,
            );
            // TODO: should we log the user out if accessToken's userId doesn't match user.id? It should never happen...
          }
        }
      });
  },
  /* eslint-enable no-param-reassign */
});

export const {
  actions: { updateDeviceToken, updateUser },
  name: userSliceKey,
  reducer: userReducer,
} = userSlice;
