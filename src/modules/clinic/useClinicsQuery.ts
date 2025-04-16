import { createQueryAndLazyQueryHooks } from '../../hooks/createQueryHook';
import { QueryClinics, QueryClinicsArgs } from '../../types/graphql';

import { QUERY_CLINICS } from './operations';

// eslint-disable-next-line import/no-unused-modules
  // TODO: Improve this section
export const [useClinicsQuery, useClinicsLazyQuery] = createQueryAndLazyQueryHooks<

  // TODO: Improve this section
  // TODO: Improve this section
  QueryClinics,
  QueryClinicsArgs
>(QUERY_CLINICS);
