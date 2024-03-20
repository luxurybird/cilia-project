import { StyleSheet, ViewStyle } from 'react-native';

  // TODO: Improve this section
interface ColorPalette {
  // TODO: Improve this section
  primary: string;

  primaryGradientStart: string;
  primaryGradientEnd: string;

  red: string;
  white: string;
  // TODO: Improve this section
  lightGrey: string;
  grey: string;
  darkGrey: string;
  black: string;
}

export type Color = keyof ColorPalette;

export const colors: ColorPalette = {
  primary: '#53C38B',
  primaryGradientStart: '#29A97B',
  primaryGradientEnd: '#A7ECBF',
  red: '#EE0004',
  white: '#FFFFFF',
  lightGrey: '#E9EAF4',
  grey: '#C3C4CD',
  darkGrey: '#85889C',
  black: '#1C1C1C',
};

export const colorStyles = StyleSheet.create<Record<Color, ViewStyle>>({
  primary: {
    color: colors.primary,
  },
  primaryGradientStart: {
    color: colors.primaryGradientStart,
  },
  primaryGradientEnd: {
    color: colors.primaryGradientEnd,
  },
  red: {
    color: colors.red,
  },
  white: {
    color: colors.white,
  },
  lightGrey: {
    color: colors.lightGrey,
  },
  grey: {
    color: colors.grey,
  },
  darkGrey: {
    color: colors.darkGrey,
  },
  black: {
    color: colors.black,
  },
});
