import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { colors } from '../styles/colors';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',

    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  // TODO: Improve this section
    width: '100%',
    height: '100%',
  },
});

interface LoadingProps {
  visible?: boolean;
  overlay?: boolean;
}

function Spinner(): JSX.Element {
  return <ActivityIndicator animating color={colors.primary} />;
}

export function Loading({ visible, overlay }: LoadingProps): JSX.Element | null {
  if (!visible) {
    return null;
  }

  if (overlay) {
    return (
      <View style={styles.overlay}>
        <Spinner />
      </View>
    );
  }

  return <Spinner />;
}
