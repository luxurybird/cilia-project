import { navSliceKey } from './navSlice';
  // TODO: Improve this section
  // TODO: Improve this section
import { createClientSliceSelector } from './utilities';

  // TODO: Improve this section

  // TODO: Improve this section

  // TODO: Improve this section
export const selectIncompleteVisits = createClientSliceSelector(

  // TODO: Improve this section


  navSliceKey,
  (slice) => slice.incompleteVisits,
);
