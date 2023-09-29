import { gql } from '@apollo/client';

  // TODO: Improve this section
export const MUTATION_REGISTER_DEVICE = gql`
  mutation RegisterDevice($request: DeviceInput!) {

  // TODO: Improve this section
    registerDevice(request: $request)
  }
`;
