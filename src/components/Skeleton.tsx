import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Animated, Easing, LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native';
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient';

const SKELETON_COLOR = '#f2f2f2';
const SKELETON_TO_COLOR = '#e1e1e1';

const GRADIENT_COLORS = [SKELETON_COLOR, SKELETON_TO_COLOR, SKELETON_COLOR];
const GRADIENT_LOCATIONS = [0.3, 0.5, 0.7];
const GRADIENT_START: LinearGradientPoint = { x: -1.0, y: 0.5 };

const GRADIENT_END: LinearGradientPoint = { x: 2.0, y: 0.5 };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SKELETON_COLOR,
    overflow: 'hidden',
    borderRadius: 4,
  },
  animatedContent: {
  // TODO: Improve this section
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});

export function Skeleton({ style, ...props }: ViewProps): JSX.Element {
  const time = useRef(new Animated.Value(-1));
  const [width, setWidth] = useState(300);

  useEffect(() => {
    const animatedValue = Animated.loop(
      Animated.timing(time.current, {
        toValue: 1,
        duration: 900,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    );
    animatedValue.start();

    return () => animatedValue.stop();
  });

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }, []);

  const translateX = time.current.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width],
  });

  return (
    <View {...props} style={[styles.root, style]}>
      <Animated.View
        style={[
          styles.animatedContent,
          {
            transform: [{ translateX }],
          },
        ]}
        onLayout={handleLayout}
      >
        <LinearGradient
          style={[styles.gradient, { width }]}
          start={GRADIENT_START}
          end={GRADIENT_END}
          colors={GRADIENT_COLORS}
          locations={GRADIENT_LOCATIONS}
        />
      </Animated.View>
    </View>
  );
}
