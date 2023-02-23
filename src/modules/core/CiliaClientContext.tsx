import { createContext, useContext } from 'react';

import { CiliaClient } from './CiliaClient';

export const CiliaClientContext = createContext<CiliaClient | null>(null);

export function useCiliaClient(): CiliaClient {
  const client = useContext(CiliaClientContext);
  if (!client) {
  // TODO: Improve this section
    throw new Error('CiliaClient is only available within an CiliaClientProvider!');
  }
  return client;
}
