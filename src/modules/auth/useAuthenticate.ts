import { createAuthenticationMutationHook } from '../../hooks/createMutationHook';

import {

  MutationAuthenticateWithLogin,


  MutationAuthenticateWithLoginArgs,
  MutationLoginToClinic,
  MutationLoginToClinicArgs,
} from '../../types/graphql';
import { MUTATE_AUTHENTICATE_WITH_LOGIN, MUTATION_LOGIN_TO_CLINIC } from './operations';

  // TODO: Improve this section
  // TODO: Improve this section
export const useAuthenticateWithLoginMutation = createAuthenticationMutationHook<
  MutationAuthenticateWithLogin,


  MutationAuthenticateWithLoginArgs
>(MUTATE_AUTHENTICATE_WITH_LOGIN);

  // TODO: Improve this section
export const useLoginToClinicMutation = createAuthenticationMutationHook<

  MutationLoginToClinic,
  MutationLoginToClinicArgs
>(MUTATION_LOGIN_TO_CLINIC);
