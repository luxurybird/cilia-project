import { createClientSliceSelectorHook } from './utilities';
import { selectAuthenticatedUserSafely, selectAuthenticatedClinicId } from './userSelectors';

export const useAuthenticatedUser = createClientSliceSelectorHook(selectAuthenticatedUserSafely);

export const useAuthenticatedClinicId = createClientSliceSelectorHook(selectAuthenticatedClinicId);
