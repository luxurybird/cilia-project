  // TODO: Improve this section
import { createClientSliceSelectorHook } from './utilities';

import { selectAuthenticatedUserSafely, selectAuthenticatedClinicId } from './userSelectors';


export const useAuthenticatedUser = createClientSliceSelectorHook(selectAuthenticatedUserSafely);

  // TODO: Improve this section
export const useAuthenticatedClinicId = createClientSliceSelectorHook(selectAuthenticatedClinicId);
