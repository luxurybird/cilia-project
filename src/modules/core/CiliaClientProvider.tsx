import React, { ReactNode } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { CiliaClient } from './CiliaClient';
import { CiliaClientContext } from './CiliaClientContext';
import { ErrorScreen } from '../layout/ErrorScreen';
import { theme } from '../../styles/theme';

interface CiliaClientProviderProps {
  client: CiliaClient;
  children: ReactNode;
}

export function CiliaClientProvider({ client, children }: CiliaClientProviderProps) {
  let wrappedChildren = children;

  if (client.hasError) {
    wrappedChildren = (
      <ErrorScreen errorMessage={client.lastError?.message ?? 'Unspecified error'} />
    );
  }

  // TODO: Arrange all initialization so that it will wait at splash screen

  return (
    <StoreProvider store={client.store}>
      <ApolloProvider client={client.apolloClient}>
        <CiliaClientContext.Provider value={client}>
          <PaperProvider theme={theme}>
            <SafeAreaProvider>{wrappedChildren}</SafeAreaProvider>
          </PaperProvider>
        </CiliaClientContext.Provider>
      </ApolloProvider>
    </StoreProvider>
  );
}
