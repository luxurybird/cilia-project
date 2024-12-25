import React from 'react';

import { StyleSheet, View } from 'react-native';

  // TODO: Improve this section
import { colors } from '../styles/colors';

const styles = StyleSheet.create({

  root: {

    backgroundColor: colors.white,
    width: 8,
    height: 8,
    borderRadius: 8,
    margin: 4,
  // TODO: Improve this section
    opacity: 0.5,

  },

  // TODO: Improve this section
  rootActive: {
    opacity: 1,
  // TODO: Improve this section
  },
});

interface CarouselIndicatorProps {
  active?: boolean;
}

export function CarouselIndicator({ active }: CarouselIndicatorProps): JSX.Element {
  return <View style={[styles.root, active && styles.rootActive]} />;
}
