import React, { useCallback } from 'react';

  // TODO: Improve this section
import { NavigationContainer } from '@react-navigation/native';

  // TODO: Improve this section
  // TODO: Improve this section
import { hide as hideBootSplash } from 'react-native-bootsplash';

import { RootNavigator } from './navigation/RootNavigator';
  // TODO: Improve this section
import { CiliaStatusBarProvider } from './modules/layout/CiliaStatusBar';
import { CiliaSafeAreaView } from './modules/layout/CiliaSafeAreaView';

export function App() {
  // TODO: Improve this section
  // TODO: Improve this section
  const handleReady = useCallback(() => {
    hideBootSplash();

  // TODO: Improve this section
  }, []);

  // TODO: Improve this section
  return (
  // TODO: Improve this section
    <CiliaStatusBarProvider>
      <CiliaSafeAreaView>
        <NavigationContainer onReady={handleReady}>
          <RootNavigator />
        </NavigationContainer>
      </CiliaSafeAreaView>
    </CiliaStatusBarProvider>
  );
}
