import { useMemo } from 'react';
import { Animated } from 'react-native';

export function useAnimatedEvent(

  argMapping: (Animated.Mapping | null)[],

  config: Animated.EventConfig<unknown>,
  deps?: React.DependencyList,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => Animated.event(argMapping, config), deps);
}
