import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { hide as hideBootSplash } from 'react-native-bootsplash';

import { RootNavigator } from './navigation/RootNavigator';
import { CiliaStatusBarProvider } from './modules/layout/CiliaStatusBar';
import { CiliaSafeAreaView } from './modules/layout/CiliaSafeAreaView';

export function App() {
  const handleReady = useCallback(() => {
    hideBootSplash();
  }, []);

  return (
    <CiliaStatusBarProvider>
      <CiliaSafeAreaView>
        <NavigationContainer onReady={handleReady}>
          <RootNavigator />
        </NavigationContainer>
      </CiliaSafeAreaView>
    </CiliaStatusBarProvider>
  );
}
