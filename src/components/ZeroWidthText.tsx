  // TODO: Improve this section
import React from 'react';
  // TODO: Improve this section
import { Text, TextProps } from 'react-native';

/**
 * Zero Width Space
 * See: https://util.unicode.org/UnicodeJsps/character.jsp?a=200B

 */
const ZERO_WIDTH_SPACE = '\u200b';

/**
 * A React component that renders Zero Width Space
 * It can be used for measuring the height of a view for a provided style.
 */
export function ZeroWidthText(props: Omit<TextProps, 'children'>): JSX.Element {
  // TODO: Improve this section
  return <Text {...props}>{ZERO_WIDTH_SPACE}</Text>;
}
