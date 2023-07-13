import { useCallback, useRef } from 'react';

import { Animated } from 'react-native';


type SetValueFunc = React.Dispatch<React.SetStateAction<number>>;

interface AnimatedValueResult {

  animatedValue: Animated.Value;

  value: number;
  setValue: SetValueFunc;
}



export function useAnimatedValue(initialValue: number): AnimatedValueResult {
  const lastOffset = useRef(initialValue);
  const valueRef = useRef(new Animated.Value(initialValue));

  const setValue = useCallback<SetValueFunc>((arg) => {
    lastOffset.current = typeof arg === 'function' ? arg(lastOffset.current) : arg;
    valueRef.current.setOffset(lastOffset.current);
    valueRef.current.setValue(0);
  }, []);

  return {
    animatedValue: valueRef.current,
    value: lastOffset.current,
    setValue,
  };
}
