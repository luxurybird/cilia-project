  // TODO: Improve this section

  // TODO: Improve this section
import { DefaultTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/lib/typescript/types';

  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
import { colors } from './colors';

export const theme: Theme = {
  // TODO: Improve this section
  ...DefaultTheme,

  roundness: 8,
  // TODO: Improve this section
  colors: {
    ...DefaultTheme.colors,

    primary: colors.primary,
    accent: '#C96DD8',
    background: colors.white,
    placeholder: colors.darkGrey,

  },

};
