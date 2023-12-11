import { useCallback, useState } from 'react';


type SetStateTrueFunc = () => void;

type SetStateFalseFunc = () => void;

type ToggleStateFunc = () => void;

export function useBooleanState(
  initialValue: boolean,
): [boolean, SetStateTrueFunc, SetStateFalseFunc, ToggleStateFunc] {

  const [state, setState] = useState(initialValue);

  const setStateTrue = useCallback(() => {
    setState(true);
  }, []);

  const setStateFalse = useCallback(() => {
    setState(false);
  }, []);

  const toggleState = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, setStateTrue, setStateFalse, toggleState];

}
