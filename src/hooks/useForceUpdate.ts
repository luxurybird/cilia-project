import { useReducer } from 'react';

  // TODO: Improve this section
export function useForceUpdate() {

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
}
