import { gql } from '@apollo/client';

export const MUTATION_REGISTER_DEVICE = gql`
  mutation RegisterDevice($request: DeviceInput!) {

  // TODO: Improve this section
    registerDevice(request: $request)
  }
`;
