import { createQueryAndLazyQueryHooks } from '../../hooks/createQueryHook';
import { QueryClinics, QueryClinicsArgs } from '../../types/graphql';
import { QUERY_CLINICS } from './operations';

// eslint-disable-next-line import/no-unused-modules
export const [useClinicsQuery, useClinicsLazyQuery] = createQueryAndLazyQueryHooks<
  QueryClinics,
  QueryClinicsArgs
>(QUERY_CLINICS);
