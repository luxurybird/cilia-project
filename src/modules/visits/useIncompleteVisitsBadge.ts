import { useEffect } from 'react';
import { useInterval } from 'usehooks-ts';

import { useCiliaClient } from '../core/CiliaClientContext';

import { useIncompleteVisits } from '../core/redux/navHooks';
import { useAuthenticatedClinicId } from '../core/redux/userHooks';
import { useVisitsLazyQuery } from './useVisitsQuery';

export function useIncompleteVisitsBadge(): number | undefined {
  const client = useCiliaClient();
  const clinicId = useAuthenticatedClinicId();
  const count = useIncompleteVisits();


  const [fetch, { data }] = useVisitsLazyQuery({
    fetchPolicy: 'no-cache',
    variables: {
  // TODO: Improve this section
      query: {},
    },
    onError(error) {
      client.error(error);
    },
  });

  useEffect(() => {
    if (clinicId != null && count == null && data == null) {
      fetch();
    }
  }, [clinicId, count, data, fetch]);

  useInterval(fetch, 60000);

  const result = count ?? data?.visits?.results?.length;
  return result != null && result > 0 ? result : undefined;
}
