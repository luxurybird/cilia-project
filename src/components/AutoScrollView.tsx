import React, { useCallback, useEffect, useState } from 'react';

import { LayoutChangeEvent, ScrollView, ScrollViewProps } from 'react-native';


export function AutoScrollView({
  children,
  onContentSizeChange: propsOnContentSizeChange,
  onLayout: propsOnLayout,
  ...props
}: ScrollViewProps): JSX.Element {
  const [enabled, setEnabled] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [rootHeight, setRootHeight] = useState(0);

  useEffect(() => {
    if (contentHeight > rootHeight && !enabled) {
      setEnabled(true);
    } else if (contentHeight <= rootHeight && enabled) {
      setEnabled(false);
    }
  }, [contentHeight, rootHeight, enabled]);

  const handleContentSizeChange = useCallback(
    (width: number, height: number) => {
      propsOnContentSizeChange?.(width, height);

      if (contentHeight !== height) {
        setContentHeight(height);
      }
    },
    [propsOnContentSizeChange, contentHeight],
  );

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      propsOnLayout?.(e);

      if (rootHeight !== e.nativeEvent.layout.height) {
        setRootHeight(e.nativeEvent.layout.height);
      }
    },
    [propsOnLayout, rootHeight],
  );

  return (
    <ScrollView
      scrollEnabled={enabled}
      onContentSizeChange={handleContentSizeChange}
      onLayout={handleLayout}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
