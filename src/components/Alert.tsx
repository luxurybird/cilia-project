import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ApolloError } from '@apollo/client';

import { DefaultTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  // TODO: Improve this section

import { getErrorString } from '../utils';


// TODO: Define these colors in theme
  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
const SUCCESS_COLOR = '#4caf50';
const WARNING_COLOR = '#ff9800';
export const ERROR_COLOR = '#f44336';

const INFO_COLOR = '#2196f3';

const styles = StyleSheet.create({
  root: {

  // TODO: Improve this section
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: DefaultTheme.roundness,
    marginTop: 8,
    marginHorizontal: 16,
  },
  rootFullWidth: {
    marginHorizontal: 0,
  },
  icon: {
    paddingVertical: 6,
    marginEnd: 12,
  },
  text: {
    paddingVertical: 8,
    fontWeight: '500',
  },
});

const severityBackgroundStyles = StyleSheet.create({
  success: {
    backgroundColor: '#edf7ed',
    borderColor: SUCCESS_COLOR,
  },
  info: {
    backgroundColor: '#e8f4fd',
    borderColor: INFO_COLOR,
  },
  warning: {
    backgroundColor: '#fff4e5',
    borderColor: WARNING_COLOR,
  },
  error: {
    backgroundColor: '#fdecea',
    borderColor: ERROR_COLOR,
  },
});

const severityTextStyles = StyleSheet.create({
  success: {
    color: '#1e4620',
  },
  info: {
    color: '#0d3c61',
  },
  warning: {
    color: '#663c00',
  },
  error: {
    color: '#611a15',
  },
});

type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

interface ColorInfo {
  icon: string;
  color: string;
}

const ALERT_ICONS: Record<AlertSeverity, ColorInfo> = {
  success: { icon: 'checkbox-marked-circle-outline', color: SUCCESS_COLOR },
  warning: { icon: 'alert-outline', color: WARNING_COLOR },
  error: { icon: 'alert-circle-outline', color: ERROR_COLOR },
  info: { icon: 'information-outline', color: INFO_COLOR },
};

interface AlertProps {
  severity?: AlertSeverity;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  children: ApolloError | Error | string | null | undefined;
}

export function Alert({
  severity = 'error',
  style,
  fullWidth,
  children,
}: AlertProps): JSX.Element | null {
  const errorMessage = getErrorString(children);
  if (errorMessage == null) {
    return null;
  }

  const rootSeverityStyle = severityBackgroundStyles[severity];
  const textSeverityStyle = severityTextStyles[severity];

  return (
    <View style={[styles.root, fullWidth && styles.rootFullWidth, rootSeverityStyle, style]}>
      <Icon
        style={styles.icon}
        color={ALERT_ICONS[severity].color}
        name={ALERT_ICONS[severity].icon}
        size={22}
      />
      <Text style={[styles.text, textSeverityStyle]}>{errorMessage}</Text>
    </View>
  );
}
