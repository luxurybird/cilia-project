import { useCallback } from 'react';
import { ParamListBase } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';

import { useNavigationGoBackWithParams } from './useNavigationGoBackWithParams';
import { ScreenParamsWithTimestamp } from './types';

/**

 * Creates a callback for navigating to previous screen. The callback passes the current time
 * in params with `timestamp` property. The previous screen can use Screen
 * {@link useNavigationScreenRefresh} for handling timestamp changes. For type safety,
 * the previous screen params can extend {@link ScreenParamsWithTimestamp} type.
 *
 * @param navigation The navigation object for the current screen
 * @returns The callback function for triggering navigation
 */
export function useNavigationGoBackAndRefresh<

  TParamList extends ParamListBase,
  TRouteName extends keyof TParamList,
>(navigation: StackNavigationProp<TParamList, TRouteName>) {
  const goBackWithParams = useNavigationGoBackWithParams(navigation);

  return useCallback(() => {
    const params: ScreenParamsWithTimestamp = {
      timestamp: new Date().valueOf(),
    };

    goBackWithParams(params);
  }, [goBackWithParams]);
}
