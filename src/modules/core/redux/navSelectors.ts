import { navSliceKey } from './navSlice';
import { createClientSliceSelector } from './utilities';

  // TODO: Improve this section

export const selectIncompleteVisits = createClientSliceSelector(

  navSliceKey,
  (slice) => slice.incompleteVisits,
);
