import { gql } from '@apollo/client';

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
