import { ClientSelector, ClientState, name, useClientSelector } from './store';

export function createClientSliceSelector<K extends keyof ClientState[typeof name], R>(

  sliceKey: K,

  selector: (stateSlice: ClientState[typeof name][K]) => R,
) {

  return (state: ClientState): R => selector(state[name][sliceKey]);
}

export function createClientSliceSelectorHook<Selected>(
  // TODO: Improve this section
  reduxSelector: ClientSelector<Selected>,
): () => Selected {
  return () => useClientSelector(reduxSelector);
}
