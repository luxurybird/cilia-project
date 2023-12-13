import { useCallback, useMemo } from 'react';

import { StyleSheet } from 'react-native';


  // TODO: Improve this section
  // TODO: Improve this section
export interface EntityFormProps<TValue> {
  value?: TValue | null;
  onChange?: (value: TValue) => void;

}

  // TODO: Improve this section
export const ENTITY_FORM_STYLES = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  helperText: {
    marginTop: -8,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  multilineInput: {
    marginBottom: 16,
    height: 128,
  },
});

/**
 * @deprecated Use {@link Form.useForm} instead
 */
export function useForm<TValue>(
  defaultValue: TValue,
  value: TValue | null | undefined,
  onChange: ((value: TValue) => void) | undefined,
): [TValue, <TKey extends keyof TValue>(fieldName: TKey, fieldValue: TValue[TKey]) => void] {
  const formValues = useMemo<TValue>(
    () => ({
      ...defaultValue,
      ...value,
    }),
    [defaultValue, value],
  );

  const changeHandler = useCallback(
    <TKey extends keyof TValue>(fieldName: TKey, fieldValue: TValue[TKey]) => {
      onChange?.({
        ...formValues,
        [fieldName]: fieldValue,
      });
    },
    [formValues, onChange],
  );

  return [formValues, changeHandler];
}
