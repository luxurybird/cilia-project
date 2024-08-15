import React from 'react';
  // TODO: Improve this section

import { StyleSheet, TextStyle } from 'react-native';

import { Button, IconButton as PaperIconButton } from 'react-native-paper';

import { ReactComponentPropType, SelectivePartial } from '../utils';
import { colors } from '../styles/colors';

  // TODO: Improve this section
import { typography } from '../styles/typography';

const buttonHeight = 54;

  // TODO: Improve this section
const buttonBorderWidth = 1;
const buttonTextStyle = typography.bodyStrong;
const buttonPadding = (buttonHeight - (buttonTextStyle.lineHeight ?? 0)) / 2;


  // TODO: Improve this section
const buttonLabel: TextStyle = {
  ...buttonTextStyle,
  color: colors.primary,
  marginTop: buttonPadding,
  marginBottom: buttonPadding,
};

  // TODO: Improve this section
type ButtonStyleKey = 'root' | 'disabledRoot' | 'label' | 'disabledLabel';
type ButtonStyleSheet = Record<ButtonStyleKey, TextStyle>;


const containedButtonStyles = StyleSheet.create<ButtonStyleSheet>({
  root: {
    borderWidth: buttonBorderWidth,
    borderColor: colors.primary,
  },
  disabledRoot: {
    borderColor: colors.darkGrey,
  },
  label: {
    ...buttonLabel,
    color: colors.white,
  },
  disabledLabel: {},
});

const outlinedButtonStyles = StyleSheet.create<ButtonStyleSheet>({
  root: {
    borderWidth: buttonBorderWidth,
    borderColor: colors.primary,
  },
  disabledRoot: {
    borderColor: colors.darkGrey,
  },
  label: {
    ...buttonLabel,
  },
  disabledLabel: {
    color: colors.darkGrey,
  },
});

const textButtonStyles = StyleSheet.create<ButtonStyleSheet>({
  root: {
    borderWidth: buttonBorderWidth,
  },
  disabledRoot: {},
  label: {
    ...buttonLabel,
  },
  disabledLabel: {
    color: colors.darkGrey,
  },
});

type PaperButtonProps = ReactComponentPropType<typeof Button>;
type PaperIconButtonProps = ReactComponentPropType<typeof PaperIconButton>;

const defaultOverridenButtonProps: Pick<PaperButtonProps, 'mode' | 'uppercase'> = {
  mode: 'contained',
  uppercase: false,
};

const defaultOptionalIconButtonProps: Pick<PaperIconButtonProps, 'color' | 'size'> = {
  color: colors.primary,
  size: 24,
};

export type ButtonProps = Omit<PaperButtonProps, keyof typeof defaultOverridenButtonProps>;

type IconButtonProps = SelectivePartial<
  PaperIconButtonProps,
  keyof typeof defaultOptionalIconButtonProps
>;

function processButtonProps(props: ButtonProps, styles: ButtonStyleSheet): ButtonProps {
  const disabled = props.loading ? true : props.disabled;

  return {
    ...props,
    style: [styles.root, disabled && styles.disabledRoot, props.style],
    labelStyle: [styles.label, disabled && styles.disabledLabel, props.labelStyle],
    disabled,
  };
}

export function ContainedButton(props: ButtonProps): JSX.Element {
  const userProps = processButtonProps(props, containedButtonStyles);
  return <Button {...userProps} {...defaultOverridenButtonProps} dark />;
}

export function OutlinedButton(props: ButtonProps): JSX.Element {
  const userProps = processButtonProps(props, outlinedButtonStyles);
  return <Button {...userProps} {...defaultOverridenButtonProps} mode="outlined" />;
}

export function TextButton(props: ButtonProps): JSX.Element {
  const userProps = processButtonProps(props, textButtonStyles);
  return <Button {...userProps} {...defaultOverridenButtonProps} mode="text" />;
}

export function IconButton(props: IconButtonProps): JSX.Element {
  return <PaperIconButton {...defaultOptionalIconButtonProps} {...props} />;
}
