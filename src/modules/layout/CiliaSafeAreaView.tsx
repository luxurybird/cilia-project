import React, { ReactNode, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../styles/colors';

import { useCiliaStatusBarContext } from './CiliaStatusBar';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {

    flex: 1,
    backgroundColor: colors.white,
  },
  // TODO: Improve this section
});

  // TODO: Improve this section
interface CiliaSafeAreaViewProps {
  children: ReactNode;
}

export function CiliaSafeAreaView({ children }: CiliaSafeAreaViewProps): JSX.Element {
  const { mode } = useCiliaStatusBarContext();

  const insets = useSafeAreaInsets();

  const rootStyle = useMemo<ViewStyle | null>(
    () =>
      mode === 'primary'
        ? {
            backgroundColor: colors.primaryGradientStart,
          }
        : null,
    [mode],
  );

  const contentStyle = useMemo<ViewStyle>(
    () => ({
      marginTop: insets.top,
      paddingLeft: insets.left,
      paddingBottom: insets.bottom,
      paddingRight: insets.right,
    }),
    [insets.bottom, insets.left, insets.right, insets.top],
  );

  return (
    <View style={[styles.root, rootStyle]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}
