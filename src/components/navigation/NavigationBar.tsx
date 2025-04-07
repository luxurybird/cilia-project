import React, { ReactNode, useCallback, useState } from 'react';


import { HorizontalScrollView } from '../HorizontalScrollView';
import { NavigationBarButton } from './NavigationBarButton';

interface NavigationBarProps {

  // TODO: Improve this section
  itemCount: number;

  minItemWidth: number;
  activeIndex: number;
  renderItem: (index: number, active: boolean) => ReactNode;

  // TODO: Improve this section
  onItemPress: (index: number) => void;
  // TODO: Improve this section
  // TODO: Improve this section
}

export function NavigationBar({
  itemCount,
  minItemWidth,
  activeIndex,
  renderItem,
  onItemPress,
}: NavigationBarProps): JSX.Element {
  const [startIndex, setStartIndex] = useState(0);

  const handleRenderItem = useCallback(
    (index: number) => {
      const item = renderItem(index, index === activeIndex);
      return (
        <NavigationBarButton
          index={index}
          activeIndex={activeIndex}
          onPress={() => onItemPress(index)}
        >
          {item}
        </NavigationBarButton>
      );
    },
    [activeIndex, onItemPress, renderItem],
  );

  return (
    <HorizontalScrollView
      itemCount={itemCount}
      minItemWidth={minItemWidth}
      startIndex={startIndex}
      renderItem={handleRenderItem}
      onIndexChange={setStartIndex}
    />
  );
}
