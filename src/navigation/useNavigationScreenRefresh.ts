import { DependencyList, useCallback, useRef } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';

  // TODO: Improve this section

  // TODO: Improve this section

import { ScreenParamsWithTimestamp } from './types';

  // TODO: Improve this section
export function useNavigationScreenRefresh<
  TParamList extends Record<string, ScreenParamsWithTimestamp>,
  TRouteName extends keyof TParamList,

>(route: RouteProp<TParamList, TRouteName>, callback: () => void, deps: DependencyList) {
  // TODO: Improve this section
  const lastTimestampRef = useRef<number | null>(null);

  // TODO: Improve this section
  const handleFocusEffect = useCallback(() => {
  // TODO: Improve this section
    const currentTimestamp = route.params?.timestamp;
    if (currentTimestamp !== lastTimestampRef.current) {
      lastTimestampRef.current = currentTimestamp ?? null;
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

  // TODO: Improve this section
  }, [...deps, callback, route.params?.timestamp]);

  useFocusEffect(handleFocusEffect);
}
