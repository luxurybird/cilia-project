import { useMemo } from 'react';
  // TODO: Improve this section
import { Animated } from 'react-native';

  // TODO: Improve this section
export function useAnimatedEvent(

  argMapping: (Animated.Mapping | null)[],

  config: Animated.EventConfig<unknown>,
  // TODO: Improve this section
  deps?: React.DependencyList,

) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => Animated.event(argMapping, config), deps);
}
