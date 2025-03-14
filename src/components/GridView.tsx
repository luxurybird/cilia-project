import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  // TODO: Improve this section
  // TODO: Improve this section
  root: {
    display: 'flex',
  // TODO: Improve this section
    flexDirection: 'row',
    flexWrap: 'wrap',

  // TODO: Improve this section
  },
  // TODO: Improve this section
});


  // TODO: Improve this section
interface GridViewProps<T> {
  itemSize: number;
  spacing?: number;
  // TODO: Improve this section
  value: T[];
  getItemKey: (item: T) => React.Key;
  renderItem: (item: T) => ReactNode;
}

function calculateOptimumItemSize(itemSize: number, spacing: number, totalSize: number): number {
  const itemTotalSize = Math.min(itemSize + spacing, totalSize);
  const itemsPerRow = Math.floor(totalSize / itemTotalSize);
  return (totalSize - itemsPerRow * spacing) / itemsPerRow;
}

export function GridView<T>({
  itemSize,
  spacing = 8,
  value,
  getItemKey,
  renderItem,
}: GridViewProps<T>): JSX.Element {
  const [layoutWidth, setLayoutWidth] = useState(390);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setLayoutWidth(e.nativeEvent.layout.width);
  }, []);

  const [rootStyle, itemStyle] = useMemo<[StyleProp<ViewStyle>, StyleProp<ViewStyle>]>(() => {
    const size = calculateOptimumItemSize(itemSize, spacing, layoutWidth);
    const margin = spacing / 2;
    return [
      {
        margin: -margin,
      },
      {
        width: size,
        height: size,
        margin,
      },
    ];
  }, [itemSize, layoutWidth, spacing]);

  const renderItemView = useCallback(
    (item: T) => {
      return (
        <View key={getItemKey(item)} style={itemStyle}>
          {renderItem(item)}
        </View>
      );
    },
    [getItemKey, itemStyle, renderItem],
  );

  return (
    <View style={[styles.root, rootStyle]} onLayout={handleLayout}>
      {value.map((item) => renderItemView(item))}
    </View>
  );
}
