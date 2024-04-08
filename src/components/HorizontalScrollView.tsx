import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

  // TODO: Improve this section
const styles = StyleSheet.create({

  item: {

    overflow: 'hidden',
  },

  // TODO: Improve this section
});

interface HorizontalScrollViewProps {

  itemCount: number;

  /**
   * The provided number of items are rendered with equal width to fill the available space.
   * It's ignored when {@link minItemWidth} is provided.
  // TODO: Improve this section
   */
  visibleItemCount?: number;

  /**
   * The number of visible items will be calculated based on this value if it's provided.
   * It's guaranteed each item's width will be equal or greater than this value to fill the available space.
   * Overrides {@link visibleItemCount}.
   */
  minItemWidth?: number;

  startIndex: number;
  renderItem: (index: number, startIndex: number) => ReactNode;
  onIndexChange: (index: number) => void;
}

/**
 * Renders items in a scrollable horizontal view and snaps the scrolling position to item boundaries.
 */
export function HorizontalScrollView({
  itemCount,
  visibleItemCount,
  minItemWidth,
  startIndex,
  renderItem,
  onIndexChange,
}: HorizontalScrollViewProps): JSX.Element {
  const [itemWidth, setItemWidth] = useState(minItemWidth ?? 375);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollX.addListener((event) => {
      const newIndex = Math.round(Math.abs(event.value / itemWidth));
      onIndexChange(newIndex);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, [itemWidth, onIndexChange, scrollX]);

  const itemStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      ...styles.item,
      width: itemWidth,
    }),
    [itemWidth],
  );

  const handleScroll = useMemo(
    () =>
      Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { x: scrollX },
            },
          },
        ],
        {
          useNativeDriver: true,
        },
      ),
    [scrollX],
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const availableWidth = event.nativeEvent.layout.width;
      if (typeof minItemWidth !== 'undefined') {
        const visibleCount = Math.floor(availableWidth / minItemWidth);
        const newItemWidth = availableWidth / visibleCount;
        setItemWidth(Math.max(newItemWidth, minItemWidth));
        return;
      }

      setItemWidth(availableWidth / (visibleItemCount ?? 1));
    },
    [minItemWidth, visibleItemCount],
  );

  const handleRenderItem = useCallback(
    (_: number, index: number) => {
      const item = renderItem(index, startIndex);
      return (
        <View key={index} style={itemStyle}>
          {item}
        </View>
      );
    },
    [startIndex, itemStyle, renderItem],
  );

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      snapToAlignment="center"
      snapToInterval={itemWidth}
      decelerationRate="fast"
      scrollEventThrottle={16}
      bounces={false}
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      onLayout={handleLayout}
    >
      {Array(itemCount).fill(0).map(handleRenderItem)}
    </Animated.ScrollView>
  );
}
