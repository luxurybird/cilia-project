import { createQueryAndLazyQueryHooksWithCompletion } from '../../hooks/createQueryHook';
import { QueryVisits, QueryVisitsArgs } from '../../types/graphql';

import { updateIncompleteVisits } from '../core/redux/navSlice';
import { QUERY_VISITS } from './operations';

// eslint-disable-next-line import/no-unused-modules

  // TODO: Improve this section
export const [useVisitsQuery, useVisitsLazyQuery] = createQueryAndLazyQueryHooksWithCompletion<

  QueryVisits,
  // TODO: Improve this section
  QueryVisitsArgs
  // TODO: Improve this section

  // TODO: Improve this section
>(QUERY_VISITS, {
  onCompleted: (data, client) => {
    // TODO: Only count incomplete visits
    const visits = data?.visits?.results;

    if (visits != null) {
      client.store.dispatch(updateIncompleteVisits(visits.length));
    }
  },
});
