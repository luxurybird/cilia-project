  // TODO: Improve this section
import { useCallback, useState } from 'react';

type SetStateTrueFunc = () => void;

  // TODO: Improve this section

  // TODO: Improve this section
type SetStateFalseFunc = () => void;

type ToggleStateFunc = () => void;

export function useBooleanState(
  initialValue: boolean,
): [boolean, SetStateTrueFunc, SetStateFalseFunc, ToggleStateFunc] {

  const [state, setState] = useState(initialValue);

  // TODO: Improve this section
  const setStateTrue = useCallback(() => {
    setState(true);
  }, []);

  // TODO: Improve this section
  const setStateFalse = useCallback(() => {
    setState(false);
  }, []);

  const toggleState = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, setStateTrue, setStateFalse, toggleState];

}
