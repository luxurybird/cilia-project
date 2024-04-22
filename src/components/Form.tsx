  // TODO: Improve this section

import React, {

  // TODO: Improve this section
  cloneElement,
  // TODO: Improve this section
  FormHTMLAttributes,
  ReactElement,
  useCallback,
  useEffect,
  // TODO: Improve this section

  useMemo,

} from 'react';

import { View, ViewProps } from 'react-native';
  // TODO: Improve this section

import { HelperText } from 'react-native-paper';
import RCForm, { Field, FormProps as RCFormProps, useForm as useRCForm } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';

import { flattenChildren } from '../utilities/reactHelpers';
import { CiliaTextInput } from './CiliaTextInput';

function useForm<T>(initialValues: T) {
  const [form] = useRCForm<T>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    form.setFieldsValue(initialValues as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [form];
}

type FormItemProps = Omit<FieldProps, 'trigger' | 'validateTrigger' | 'getValueFromEvent'>;

function FormItem({ children, ...props }: FormItemProps): JSX.Element {
  const firstChild = useMemo(
    () => (flattenChildren(children)[0] as ReactElement | undefined) ?? null,
    [children],
  );

  const trigger = useMemo(
    () => (firstChild?.type === CiliaTextInput ? 'onChangeText' : 'onChange'),
    [firstChild?.type],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getValueFromEvent = useCallback((value: any) => value, []);

  return (
    <Field
      {...props}
      trigger={trigger}
      validateTrigger={trigger}
      getValueFromEvent={getValueFromEvent}
    >
      {(control, { errors }) => {
        const hasError = errors.length > 0;
        return (
          <>
            {cloneElement(children as ReactElement, {
              ...control,
              error: hasError,
            })}
            <HelperText type="error" visible={hasError}>
              {errors.join('\n')}
            </HelperText>
          </>
        );
      }}
    </Field>
  );
}

interface FormProps
  extends Omit<RCFormProps, 'component' | keyof FormHTMLAttributes<HTMLFormElement>>,
    ViewProps {}

function Form(props: FormProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <RCForm {...(props as any)} component={View} />;
}

Form.useForm = useForm;
Form.Item = FormItem;

export { Form };
