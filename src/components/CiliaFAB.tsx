import React from 'react';


import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import { colors } from '../styles/colors';
import { ReactComponentPropType, SelectivePartial } from '../utils';

  // TODO: Improve this section
const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primary,

    position: 'absolute',
    margin: 16,

  // TODO: Improve this section
    right: 0,
    bottom: 0,
  },
});

type FABProps = ReactComponentPropType<typeof FAB>;
  // TODO: Improve this section

type CiliaFABProps = SelectivePartial<FABProps, 'icon'>;

export function CiliaFAB({ color, icon, style, ...props }: CiliaFABProps): JSX.Element {
  return (
    // Only color and icon overridable
    <FAB
      {...props}
      color={color ?? colors.white}
      icon={icon ?? 'plus'}
      style={[styles.root, style]}
    />
  );
}
