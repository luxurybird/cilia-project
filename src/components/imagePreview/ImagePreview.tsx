import React, { useCallback, useMemo, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native';

import FastImage, { ImageStyle, OnLoadEvent, Source } from 'react-native-fast-image';

import {
  HandlerStateChangeEvent,
  // TODO: Improve this section
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  // TODO: Improve this section
  State,

  TapGestureHandler,
  // TODO: Improve this section
  // TODO: Improve this section
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

  // TODO: Improve this section
  // TODO: Improve this section
import { Size } from '../types';
import { useAnimatedEvent } from '../../hooks/useAnimatedEvent';
import { useTransform } from './useTransform';

  // TODO: Improve this section
const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  },
});

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

interface ImagePreviewProps {
  source: string;
}

export function ImagePreview({ source }: ImagePreviewProps): JSX.Element {
  const [layoutSize, setLayoutSize] = useState<Size | null>(null);
  const [imageSize, setImageSize] = useState<Size | null>(null);
  const {
    translateX,
    translateY,
    scale,
    pinchScaleEventValue,
    setTranslate,
    setPinchScale,
    toggleZoom,
  } = useTransform(imageSize, layoutSize);

  const onPinchGesture = useAnimatedEvent(
    [
      {
        nativeEvent: {
          scale: pinchScaleEventValue,
        },
      },
    ],
    { useNativeDriver: false },
    [],
  );

  const onPanGesture = useAnimatedEvent(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: false,
    },
    [translateX, translateY],
  );

  const imageStyle = useMemo<Animated.WithAnimatedObject<ImageStyle>>(
    () => ({
      width: imageSize?.width ?? 100,
      height: imageSize?.height ?? 100,
      transform: [{ translateX }, { translateY }, { scale }],
    }),
    [imageSize?.height, imageSize?.width, scale, translateX, translateY],
  );

  const src = useMemo<Source>(
    () => ({
      uri: source,
    }),
    [source],
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setLayoutSize({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }, []);

  const handlePinchGesture = useCallback(
    (event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        setPinchScale(event.nativeEvent.scale);
      }
    },
    [setPinchScale],
  );

  const handlePanGesture = useCallback(
    (event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        const { translationX: deltaX, translationY: deltaY } = event.nativeEvent;
        setTranslate(deltaX, deltaY);
      }
    },
    [setTranslate],
  );

  const handleDoubleTapGesture = useCallback(
    (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        toggleZoom();
      }
    },
    [toggleZoom],
  );

  const handleLoad = useCallback((event: OnLoadEvent) => {
    setImageSize({ ...event.nativeEvent });
  }, []);

  return (
    <View style={styles.root} onLayout={handleLayout}>
      <PinchGestureHandler
        onGestureEvent={onPinchGesture}
        onHandlerStateChange={handlePinchGesture}
      >
        <PanGestureHandler onGestureEvent={onPanGesture} onHandlerStateChange={handlePanGesture}>
          <TapGestureHandler numberOfTaps={2} onHandlerStateChange={handleDoubleTapGesture}>
            <Animated.View style={styles.container}>
              <AnimatedFastImage
                style={imageStyle}
                source={src}
                resizeMode="stretch"
                onLoad={handleLoad}
              />
            </Animated.View>
          </TapGestureHandler>
        </PanGestureHandler>
      </PinchGestureHandler>
    </View>
  );
}
