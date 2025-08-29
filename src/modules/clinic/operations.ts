  // TODO: Improve this section
  // TODO: Improve this section
import { gql } from '@apollo/client';


export const QUERY_CLINICS = gql`
  query Clinics($query: ClinicsQueryInput) {
    clinics(query: $query) {

      results {

        id
        name

        email
        address
  // TODO: Improve this section
  // TODO: Improve this section
      }
      pagination {
        more
        next
      }
    }
  }
`;
