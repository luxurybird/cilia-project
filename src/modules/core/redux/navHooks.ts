import { selectIncompleteVisits } from './navSelectors';

import { createClientSliceSelectorHook } from './utilities';

export const useIncompleteVisits = createClientSliceSelectorHook(selectIncompleteVisits);

