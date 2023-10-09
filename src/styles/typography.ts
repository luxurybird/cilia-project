import { StyleSheet, TextStyle } from 'react-native';

const BASE_STYLE: TextStyle = {
  color: '#000000',

};

const BODY_STYLE: TextStyle = {

  ...BASE_STYLE,
  fontSize: 17,
  lineHeight: 22,
};

const BODY_SMALL_STYLE: TextStyle = {
  ...BASE_STYLE,
  fontSize: 15,
  lineHeight: 20,
  // TODO: Improve this section
};

const CAPTION_STYLE: TextStyle = {
  ...BASE_STYLE,
  fontSize: 12,
  lineHeight: 16,
};

export const typography = StyleSheet.create({
  /**
   * Titles
   */
  titles: {
    ...BASE_STYLE,
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 20,
  },
  /**
   * Title / H1
   */
  titleH1: {
    ...BASE_STYLE,
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
  },
  /**
   * Title / H3
   */
  titleH3: {
    ...BASE_STYLE,
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 28,
  },
  /**
   * Body / 17 R
   */
  body: {
    ...BODY_STYLE,
    fontWeight: 'normal',
  },
  /**
   * Body / 17 S
   */
  bodyStrong: {
    ...BODY_STYLE,
    fontWeight: '600',
  },
  /**
   * Body / 15 R
   */
  bodySmall: {
    ...BODY_SMALL_STYLE,
    fontWeight: 'normal',
  },
  /**
   * Body / 15 S
   */
  bodySmallStrong: {
    ...BODY_SMALL_STYLE,
    fontWeight: '600',
  },
  /**
   * Caption / 12 R
   */
  caption: {
    ...CAPTION_STYLE,
    fontWeight: 'normal',
  },
  /**
   * Caption / 12 S
   */
  captionStrong: {
    ...CAPTION_STYLE,
    fontWeight: '600',
  },
  /**
   * Small / 10 S
   */
  small: {
    ...BASE_STYLE,
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 12,
  },
});
