import { DependencyList, useCallback, useRef } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';

import { ScreenParamsWithTimestamp } from './types';

export function useNavigationScreenRefresh<
  TParamList extends Record<string, ScreenParamsWithTimestamp>,
  TRouteName extends keyof TParamList,
>(route: RouteProp<TParamList, TRouteName>, callback: () => void, deps: DependencyList) {
  const lastTimestampRef = useRef<number | null>(null);

  const handleFocusEffect = useCallback(() => {
    const currentTimestamp = route.params?.timestamp;
    if (currentTimestamp !== lastTimestampRef.current) {
      lastTimestampRef.current = currentTimestamp ?? null;
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, callback, route.params?.timestamp]);

  useFocusEffect(handleFocusEffect);
}
