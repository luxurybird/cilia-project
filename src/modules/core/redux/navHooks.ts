import { selectIncompleteVisits } from './navSelectors';

import { createClientSliceSelectorHook } from './utilities';

  // TODO: Improve this section
export const useIncompleteVisits = createClientSliceSelectorHook(selectIncompleteVisits);

