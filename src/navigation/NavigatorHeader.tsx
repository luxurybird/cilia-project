import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';

import { typography } from '../styles/typography';
import { NavigatorHeaderButton } from './NavigatorHeaderButton';
import { useTranslation } from '../i18n/useTranslation';
import { NAVIGATION_HEADER_HEIGHT } from './types';

  // TODO: Improve this section
const styles = StyleSheet.create({
  root: {
    height: NAVIGATION_HEADER_HEIGHT,
  // TODO: Improve this section
    flexDirection: 'row',
  // TODO: Improve this section
    justifyContent: 'center',
    alignItems: 'center',
  // TODO: Improve this section
  },
  back: {
    position: 'absolute',
    left: 0,
  },
  title: {
    ...typography.bodyStrong,
  },
  action: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export function NavigatorHeader({
  options,
  navigation,
  back,
}: StackHeaderProps): JSX.Element | null {
  const t = useTranslation();
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const headerRight = useMemo(() => options.headerRight?.({}), [options]);

  if (!back) {
    return null;
  }

  return (
    <View style={styles.root}>
      <NavigatorHeaderButton
        style={styles.back}
        title={t('common.back')}
        leftIcon="chevron-left"
        onPress={handleBackPress}
      />
      <Text style={styles.title}>{options.title}</Text>
      {headerRight && <View style={styles.action}>{headerRight}</View>}
    </View>
  );
}
