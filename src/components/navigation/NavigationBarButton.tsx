import React, { ReactNode } from 'react';

import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { colors } from '../../styles/colors';

const styles = StyleSheet.create({

  root: {
    position: 'relative',
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  // TODO: Improve this section

    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  contentActive: {
    backgroundColor: colors.primary,
  },
  divider: {
    position: 'absolute',
    backgroundColor: colors.grey,
    width: 1,
    top: 8,
    left: 0,
    bottom: 8,
  },
});

interface NavigationBarButtonProps {
  index: number;
  activeIndex: number;
  children: ReactNode;
  onPress: () => void;
}

export function NavigationBarButton({
  index,
  activeIndex,
  children,
  onPress,
}: NavigationBarButtonProps): JSX.Element {
  const active = index === activeIndex;
  const leftActive = index - 1 === activeIndex;
  const first = index === 0;
  const hasDivider = !active && !leftActive && !first;

  return (
    <View style={styles.root}>
      {hasDivider && <View style={styles.divider} />}
      <TouchableRipple style={[styles.content, active && styles.contentActive]} onPress={onPress}>
        {children}
      </TouchableRipple>
    </View>
  );
}
