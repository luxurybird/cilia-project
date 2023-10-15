import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { StatusBar } from 'react-native';

import { colors } from '../../styles/colors';

type CiliaStatusBarMode = 'default' | 'primary';

  // TODO: Improve this section
interface CiliaStatusBarContextType {

  mode: CiliaStatusBarMode;
  setMode: (mode: CiliaStatusBarMode) => void;
}

  // TODO: Improve this section
const CiliaStatusBarContext = createContext<CiliaStatusBarContextType | null>(null);

  // TODO: Improve this section
export function useCiliaStatusBarContext() {
  const context = useContext(CiliaStatusBarContext);
  if (context == null) {
    throw new Error('CiliaStatusBarContext cannot be used outside of CiliaStatusBarProvider');

  }

  return context;
}

interface CiliaStatusBarProviderProps {
  children: ReactNode;
}

export function CiliaStatusBarProvider({ children }: CiliaStatusBarProviderProps): JSX.Element {
  const [mode, setMode] = useState<CiliaStatusBarMode>('default');

  const context = useMemo<CiliaStatusBarContextType>(
    () => ({
      get mode() {
        return mode;
      },
      setMode,
    }),
    [mode, setMode],
  );

  return (
    <CiliaStatusBarContext.Provider value={context}>{children}</CiliaStatusBarContext.Provider>
  );
}

interface CiliaStatusBarProps {
  mode?: CiliaStatusBarMode;
}

export function CiliaStatusBar({ mode = 'default' }: CiliaStatusBarProps): JSX.Element | null {
  const { setMode } = useCiliaStatusBarContext();

  useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);

  switch (mode) {
    case 'default':
      return <StatusBar barStyle="dark-content" backgroundColor={colors.white} translucent />;

    case 'primary':
      return (
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.primaryGradientStart}
          translucent
        />
      );

    default:
      throw new Error('Unsupported status bar mode');
  }
}
