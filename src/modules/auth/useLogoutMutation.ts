import { createMutationHookWithCompletion } from '../../hooks/createMutationHook';
import { MutationLogout } from '../../types/graphql';
import { updateAccessToken } from '../core/redux/commonActions';
import { MUTATION_LOGOUT } from './operations';

export const useLogoutMutation = createMutationHookWithCompletion<MutationLogout>(
  MUTATION_LOGOUT,
  (data, client) => {
    const accessToken = data?.logout;
    if (accessToken) {
      client.store.dispatch(
        updateAccessToken({
          accessToken,
        }),
      );
    }
  },
);
