  // TODO: Improve this section
import React, { useCallback, useMemo, useState } from 'react';
import { TextInput } from 'react-native-paper';


import { colors } from '../styles/colors';
import { ReactComponentPropType } from '../utils';

  // TODO: Improve this section
type TextInputProps = ReactComponentPropType<typeof TextInput>;

  // TODO: Improve this section

  // TODO: Improve this section
type CiliaTextInputType = 'email' | 'password' | 'phone' | 'text';


export interface CiliaTextInputProps extends Omit<TextInputProps, 'mode' | 'outlineColor'> {


  type?: CiliaTextInputType;
}

  // TODO: Improve this section
function useCommonTextInputProps(props: CiliaTextInputProps): Partial<TextInputProps> {
  const [isSecureTextVisible, showSecureText] = useState(true);

  const handleToggleSecureTextPress = useCallback(() => {
    showSecureText((prev) => !prev);
  }, []);

  const extraProps = useMemo<Partial<TextInputProps>>(() => {
    switch (props.type) {
      case 'email':
        return {
          autoCapitalize: 'none',
          keyboardType: 'email-address',
          autoComplete: 'email', // Android
          textContentType: 'emailAddress', // iOS
        };

      case 'password':
        return {
          secureTextEntry: isSecureTextVisible,
          autoComplete: 'password', // Android
          textContentType: 'password', // iOS
          right: (
            <TextInput.Icon
              disabled={props.disabled}
              color={isSecureTextVisible ? colors.grey : undefined}
              name={isSecureTextVisible ? 'eye-off-outline' : 'eye-outline'}
              onPress={handleToggleSecureTextPress}
            />
          ),
        };

      case 'phone':
        return {
          autoCapitalize: 'none',
          keyboardType: 'phone-pad',
          autoComplete: 'tel', // Android
          textContentType: 'telephoneNumber', // iOS
        };

      default:
        return {};
    }
  }, [handleToggleSecureTextPress, isSecureTextVisible, props.disabled, props.type]);

  return extraProps;
}

export function CiliaTextInput(props: CiliaTextInputProps): JSX.Element {
  const extraProps = useCommonTextInputProps(props);

  return <TextInput {...props} {...extraProps} mode="outlined" outlineColor={colors.lightGrey} />;
}
