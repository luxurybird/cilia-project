import React, { useMemo } from 'react';

import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { CarouselIndicator } from './CarouselIndicator';

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface CarouselIndicatorListProps {
  style: StyleProp<ViewStyle>;
  activeIndex: number;
  count: number;
  // TODO: Improve this section
}

export function CarouselIndicatorList({
  style,
  activeIndex,
  count,
}: CarouselIndicatorListProps): JSX.Element {
  const children = useMemo(
    () =>
      Array(count)
        .fill(0)
        // eslint-disable-next-line react/no-array-index-key
        .map((_, index) => <CarouselIndicator key={index} active={activeIndex === index} />),
    [activeIndex, count],
  );

  return (
    <View style={[styles.root, style]}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
