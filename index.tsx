import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';

import './src/bootstrap';
import { App } from './src/App';
import { name as appName } from './app.json';
import { CiliaClient } from './src/modules/core/CiliaClient';
import { CiliaClientProvider } from './src/modules/core/CiliaClientProvider';

function Main() {
  const [client, setClient] = useState<CiliaClient | null>();

  useEffect(() => {
    (async () => {
      const newClient = await CiliaClient.create();
      setClient(newClient);
    })();
  }, []);

  if (client == null) {
    return null;
  }

  return (
    <CiliaClientProvider client={client}>
      <App />
    </CiliaClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
