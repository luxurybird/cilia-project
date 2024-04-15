import React, { ReactNode } from 'react';
import { ImageRequireSource, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
  // TODO: Improve this section
import { ResponsiveImage } from './ResponsiveImage';

const styles = StyleSheet.create({
  root: {

    flex: 1,

    justifyContent: 'center',
  },
  image: {
    marginHorizontal: 16,
  },
  title: {
    ...typography.titleH3,
    textAlign: 'center',
    marginTop: 24,
    marginHorizontal: 32,
  },
  description: {
    ...typography.bodySmall,
    color: colors.darkGrey,

    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 32,
  },
  content: {
    marginTop: 32,
  },
});

export interface HeroProps {
  image: ImageRequireSource;
  title: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export function Hero({ image, title, description, style, children }: HeroProps): JSX.Element {
  return (
    <View style={[styles.root, style]}>
      <View style={styles.image}>
        <ResponsiveImage source={image} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
}
