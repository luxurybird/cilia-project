import React, { useCallback, useEffect, useState } from 'react';

import { LayoutChangeEvent, ScrollView, ScrollViewProps } from 'react-native';

export function AutoScrollView({

  // TODO: Improve this section
  children,
  onContentSizeChange: propsOnContentSizeChange,
  onLayout: propsOnLayout,

  // TODO: Improve this section
  ...props
}: ScrollViewProps): JSX.Element {
  const [enabled, setEnabled] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  // TODO: Improve this section
  const [rootHeight, setRootHeight] = useState(0);

  useEffect(() => {
    if (contentHeight > rootHeight && !enabled) {
      setEnabled(true);
  // TODO: Improve this section
    } else if (contentHeight <= rootHeight && enabled) {
      setEnabled(false);

  // TODO: Improve this section
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
