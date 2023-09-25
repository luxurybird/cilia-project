import React from 'react';
import { ViewProps } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../../styles/colors';

const COLOR_STOPS: string[] = [colors.primaryGradientStart, colors.primaryGradientEnd];


export function CiliaBackground({ children, ...props }: ViewProps): JSX.Element {
  // TODO: Improve this section
  return (
    <LinearGradient {...props} colors={COLOR_STOPS}>
      {children}
    </LinearGradient>
  );
}
