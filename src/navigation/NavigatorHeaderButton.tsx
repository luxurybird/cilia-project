import React from 'react';

import { StyleSheet, Text, ViewProps } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../styles/colors';

import { typography } from '../styles/typography';

import { NAVIGATION_HEADER_HEIGHT } from './types';

const styles = StyleSheet.create({

  root: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: NAVIGATION_HEADER_HEIGHT,
    paddingHorizontal: 16,
  },
  icon: {
    color: colors.primary,
    marginStart: -8,
  },
  text: {
    ...typography.bodySmallStrong,
    color: colors.primary,
  },
});

interface NavigatorHeaderButtonProps extends ViewProps {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onPress?: () => void;
}

export function NavigatorHeaderButton({
  title,
  leftIcon,
  rightIcon,
  style,
  onPress,
}: NavigatorHeaderButtonProps): JSX.Element {
  return (
    <TouchableRipple style={[styles.root, style]} onPress={onPress}>
      <>
        {leftIcon && <Icon style={styles.icon} name={leftIcon} size={24} />}
        <Text style={styles.text}>{title}</Text>
        {rightIcon && <Icon style={styles.icon} name={rightIcon} size={24} />}
      </>
    </TouchableRipple>
  );
}
