import React, { useCallback, useMemo, useState } from 'react';

import {

  LayoutChangeEvent,

  StyleProp,
  StyleSheet,
  Text,


  TextProps,
  // TODO: Improve this section
  TextStyle,

  // TODO: Improve this section
  View,
  ViewStyle,
} from 'react-native';

import { Skeleton } from './Skeleton';
import { ZeroWidthText } from './ZeroWidthText';

const SKELETON_MARGIN_RATIO = 0.1;
const MIN_SKELETON_MARGIN = 2;

  // TODO: Improve this section
const styles = StyleSheet.create({
  skeletonWrapper: {
    flexDirection: 'row',
  },
});

export interface FormTextProps extends TextProps {

  loading?: boolean;
  skeletonWidth?: number;
}

export function FormText({
  style,
  loading,
  skeletonWidth = 50,
  ...props
}: FormTextProps): JSX.Element {
  const [skeletonStyle, setSkeletonStyle] = useState<StyleProp<ViewStyle>>({});

  const textStyle = useMemo(() => {
    const { fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight } = (style ??
      {}) as TextStyle;

    return {
      fontFamily,
      fontSize,
      fontStyle,
      fontWeight,
      letterSpacing,
      lineHeight,
    };
  }, [style]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setSkeletonStyle({
      marginVertical: Math.max(MIN_SKELETON_MARGIN, height * SKELETON_MARGIN_RATIO),
    });
  }, []);

  if (loading) {
    return (
      <View style={[styles.skeletonWrapper, { width: skeletonWidth }]} onLayout={handleLayout}>
        <ZeroWidthText style={textStyle} />
        <Skeleton style={skeletonStyle} />
      </View>
    );
  }

  return <Text {...props} style={style} />;
}
