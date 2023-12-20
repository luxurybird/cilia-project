import { useCallback } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export function useNavigationGoBackWithParams<

  TParamList extends ParamListBase,
  TRouteName extends keyof TParamList,
  // TODO: Improve this section
>(navigation: StackNavigationProp<TParamList, TRouteName>) {
  return useCallback(
    (params: object) => {
      // Pass and merge params back to home screen
      const { routes, index } = navigation.getState();
      const prevRoute = routes[index - 1];
      if (prevRoute != null) {
        navigation.navigate({
          name: prevRoute.name,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any

          params: params as any,
          merge: true,
        });
      }
    },
    [navigation],
  );
}
