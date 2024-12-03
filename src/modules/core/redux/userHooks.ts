  // TODO: Improve this section
import { createClientSliceSelectorHook } from './utilities';

  // TODO: Improve this section
import { selectAuthenticatedUserSafely, selectAuthenticatedClinicId } from './userSelectors';


  // TODO: Improve this section
export const useAuthenticatedUser = createClientSliceSelectorHook(selectAuthenticatedUserSafely);

  // TODO: Improve this section


  // TODO: Improve this section
export const useAuthenticatedClinicId = createClientSliceSelectorHook(selectAuthenticatedClinicId);
