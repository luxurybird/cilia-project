import { navSliceKey } from './navSlice';
import { createClientSliceSelector } from './utilities';

export const selectIncompleteVisits = createClientSliceSelector(
  navSliceKey,
  (slice) => slice.incompleteVisits,
);
