import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';

import { Rect, Size } from '../types';
import { clamp } from '../../utils';
  // TODO: Improve this section
  // TODO: Improve this section
import { useAnimatedValue } from '../../hooks/useAnimatedValue';
import { useForceUpdate } from '../../hooks/useForceUpdate';


const SCALE_EPSILON = 0.0001;
const TRANSLATE_PADDING = 100;

type SetTranslateFunc = (deltaX: number, deltaY: number) => void;
type SetPinchScaleFunc = (scale: number) => void;

type ToggleZoomFunc = () => void;

interface TransformResult {
  translateX: Animated.Value;
  translateY: Animated.Value;
  scale: Animated.AnimatedMultiplication;
  pinchScaleEventValue: Animated.Value;
  setTranslate: SetTranslateFunc;
  setPinchScale: SetPinchScaleFunc;
  toggleZoom: ToggleZoomFunc;
}

interface ScaleConstraints {
  /**
   * The scaling value for fitting content into the container perfectly.
   */
  fit: number;

  /**
   * The scaling value for preventing content to be smaller than 100x100.
   */
  min: number;

  /**
   * The scaling value for preventing content to be larger than 4x.
   */
  max: number;
}

function calculateScaleConstraints(
  contentSize: Size | null,
  containerSize: Size | null,
): ScaleConstraints {
  if (containerSize != null && contentSize != null) {
    const fit = Math.min(
      containerSize.width / contentSize.width,
      containerSize.height / contentSize.height,
    );
    const min = 100 / Math.max(contentSize.width, contentSize.height);
    const max = 4;

    return {
      fit,
      min,
      max,
    };
  }

  return {
    fit: 1.0,
    min: 1.0,
    max: 1.0,
  };
}

function makeRect(size: Size): Rect {
  return {
    ...size,
    x: 0,
    y: 0,
  };
}

function inflateRect(rect: Rect, delta: number): Rect {
  const twoDelta = 2 * delta;
  return {
    x: rect.x - delta,
    y: rect.y - delta,
    width: rect.width + twoDelta,
    height: rect.height + twoDelta,
  };
}

function scaleRect(contentSize: Size | null, scale: number): Rect {
  const contentWidth = contentSize?.width ?? 0;
  const contentHeight = contentSize?.height ?? 0;

  const size: Size = {
    width: contentWidth * scale,
    height: contentHeight * scale,
  };

  return {
    ...size,
    x: (contentWidth - size.width) / 2,
    y: (contentHeight - size.height) / 2,
  };
}

function usePinchScale() {
  const lastScale = useRef(1);
  const baseScale = useRef(new Animated.Value(1));
  const pinchScale = useRef(new Animated.Value(1));
  const scale = Animated.multiply(baseScale.current, pinchScale.current);

  const setValue = useCallback<SetPinchScaleFunc>((newValue) => {
    lastScale.current = newValue;
    baseScale.current.setValue(lastScale.current);
    pinchScale.current.setValue(1);
  }, []);

  return {
    animatedValue: scale,
    eventValue: pinchScale.current,
    value: lastScale.current,
    setValue,
  };
}

export function useTransform(
  contentSize: Size | null,
  containerSize: Size | null,
): TransformResult {
  const isInitialized = useRef(false);
  const forceUpdate = useForceUpdate();
  const { animatedValue: animatedTranslateX, setValue: setTranslateX } = useAnimatedValue(0);
  const { animatedValue: animatedTranslateY, setValue: setTranslateY } = useAnimatedValue(0);

  const {
    animatedValue: animatedScale,
    eventValue: pinchScaleEventValue,
    value: scale,
    setValue: setScale,
  } = usePinchScale();

  const scalingConstraints = useMemo(
    () => calculateScaleConstraints(contentSize, containerSize),
    [containerSize, contentSize],
  );

  const resetTransform = useCallback(
    (newScale: number) => {
      const scaledContentRect = scaleRect(contentSize, newScale);
      setTranslateX(-scaledContentRect.x);
      setTranslateY(-scaledContentRect.y);
      setScale(newScale);
      forceUpdate();
    },
    [contentSize, forceUpdate, setScale, setTranslateX, setTranslateY],
  );

  const updateTransform = useCallback(
    (deltaX: number, deltaY: number, newScale: number) => {
      if (containerSize == null) {
        return;
      }

      const finalScale = clamp(newScale, scalingConstraints.min, scalingConstraints.max);
      const scaledContentRect = scaleRect(contentSize, finalScale);
      const safeArea = inflateRect(makeRect(containerSize), -TRANSLATE_PADDING);
      const minTranslateX = safeArea.x - (scaledContentRect.x + scaledContentRect.width);
      const minTranslateY = safeArea.y - (scaledContentRect.y + scaledContentRect.height);
      const maxTranslateX = safeArea.x + safeArea.width - scaledContentRect.x;
      const maxTranslateY = safeArea.y + safeArea.height - scaledContentRect.y;

      setTranslateX((prev) => clamp(prev + deltaX, minTranslateX, maxTranslateX));
      setTranslateY((prev) => clamp(prev + deltaY, minTranslateY, maxTranslateY));
      setScale(finalScale);
      forceUpdate();
    },
    [
      containerSize,
      contentSize,
      forceUpdate,
      scalingConstraints.max,
      scalingConstraints.min,
      setScale,
      setTranslateX,
      setTranslateY,
    ],
  );

  useEffect(() => {
    if (!isInitialized.current && contentSize != null && containerSize != null) {
      isInitialized.current = true;
      resetTransform(Math.min(scalingConstraints.fit, 1.0));
    }
  }, [containerSize, contentSize, resetTransform, scalingConstraints.fit, updateTransform]);

  const setTranslate = useCallback<SetTranslateFunc>(
    (deltaX, deltaY) => {
      updateTransform(deltaX, deltaY, scale);
    },
    [scale, updateTransform],
  );

  const setPinchScale = useCallback<SetPinchScaleFunc>(
    (newScale) => {
      updateTransform(0, 0, scale * newScale);
    },
    [scale, updateTransform],
  );

  const toggleZoom = useCallback<ToggleZoomFunc>(() => {
    const isFitted = Math.abs(scale - scalingConstraints.fit) < SCALE_EPSILON;
    if (isFitted) {
      updateTransform(0, 0, 1.0);
    } else {
      resetTransform(scalingConstraints.fit);
    }
  }, [resetTransform, scale, scalingConstraints.fit, updateTransform]);

  return {
    translateX: animatedTranslateX,
    translateY: animatedTranslateY,
    scale: animatedScale,
    pinchScaleEventValue,
    setTranslate,
    setPinchScale,
    toggleZoom,
  };
}
