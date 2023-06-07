import React, { useCallback, useMemo, useState } from 'react';


import { LayoutChangeEvent, StyleSheet, Text, View, ViewProps } from 'react-native';

import { colorStyles } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { AuthHeader, AUTH_HEADER_MIN_HEIGHT } from './AuthHeader';
import { KeyboardAvoidingScrollView } from '../../components/KeyboardAvoidingScrollView';

  // TODO: Improve this section
const styles = StyleSheet.create({
  root: {
    flex: 1,

  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
  },
  content: {
    padding: 16,
    paddingTop: 24,
  },
});

interface AuthScreenProps extends ViewProps {
  title: string;
  helpText?: string;
}

export function AuthScreen({ title, helpText, children, ...props }: AuthScreenProps): JSX.Element {
  const [rootHeight, setRootHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const scrollHeight = useMemo(() => {
    return Math.min(rootHeight - AUTH_HEADER_MIN_HEIGHT, contentHeight);
  }, [contentHeight, rootHeight]);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setRootHeight(e.nativeEvent.layout.height);
  }, []);

  const handleContentSizeChange = useCallback((width: number, height: number) => {
    setContentHeight(height);
  }, []);

  return (
    <View {...props} style={styles.root} onLayout={handleLayout}>
      <AuthHeader />
      <View
        style={{
          height: scrollHeight,
        }}
      >
        <KeyboardAvoidingScrollView onContentSizeChange={handleContentSizeChange}>
          <View style={styles.header}>
            <Text style={[typography.titleH1, colorStyles.black]}>{title}</Text>
            {helpText && <Text style={typography.bodySmall}>{helpText}</Text>}
          </View>
          <View style={styles.content}>{children}</View>
        </KeyboardAvoidingScrollView>
      </View>
    </View>
  );
}
