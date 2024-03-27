import React, { useCallback } from 'react';

import { Image, ImageSourcePropType, StyleSheet } from 'react-native';


  // TODO: Improve this section
import { colors } from '../../styles/colors';

import { ButtonProps, OutlinedButton } from '../../components/buttons';

const styles = StyleSheet.create({

  // TODO: Improve this section
  root: {
    borderColor: colors.lightGrey,
    borderRadius: 36,
  },
  disabled: {
    backgroundColor: colors.lightGrey,
  },
  content: {
    // Icon style is not exported in React Native Paper.
    // So we cannot manipulate it directly. It has the following styles by default:

    //
    //   marginLeft: 12,
    //   marginRight: -4,
    //
    // So we choose values to effectively make these margin zero.
    //
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 4,
  },
  label: {
    display: 'none',
    fontSize: 40,
  },
  disabledIcon: {
    tintColor: colors.darkGrey,
  },
});

interface IconRenderProps {
  size: number;
}

interface OAuthLoginButtonProps extends Omit<ButtonProps, 'children'> {
  image: ImageSourcePropType;
}

export function OAuthLoginButton({ image, ...props }: OAuthLoginButtonProps): JSX.Element {
  const renderIcon = useCallback(
    ({ size }: IconRenderProps) => (
      <Image
        source={image}
        style={[
          props.disabled && styles.disabledIcon,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
    ),
    [image, props.disabled],
  );

  return (
    <OutlinedButton
      {...props}
      style={[styles.root, props.disabled && styles.disabled, props.style]}
      contentStyle={[styles.content, props.contentStyle]}
      labelStyle={[styles.label, props.labelStyle]}
      icon={renderIcon}
      // eslint-disable-next-line react/no-children-prop
      children={false}
    />
  );
}
