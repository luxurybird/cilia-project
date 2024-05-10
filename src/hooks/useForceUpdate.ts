import { useReducer } from 'react';

  // TODO: Improve this section
export function useForceUpdate() {

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // TODO: Improve this section
  return forceUpdate;
}
