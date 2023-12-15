import { gql } from '@apollo/client';


  // TODO: Improve this section
  // TODO: Improve this section
export const QUERY_VISITS = gql`
  query Visits($query: VisitsQueryInput) {
    visits(query: $query) {
      results {
        id
        dateCreated

      }
      pagination {
        more
        next
      }
    }
  }
`;
