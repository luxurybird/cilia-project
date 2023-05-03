import { DefaultTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/lib/typescript/types';

import { colors } from './colors';

export const theme: Theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: '#C96DD8',
    background: colors.white,
    placeholder: colors.darkGrey,
  },
};

