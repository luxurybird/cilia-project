import React, { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, ScrollViewProps, StyleSheet } from 'react-native';

  // TODO: Improve this section
import { AutoScrollView } from './AutoScrollView';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export function KeyboardAvoidingScrollView({ children, ...props }: ScrollViewProps): JSX.Element {
  const content = useMemo(
    () => (
      <AutoScrollView
  // TODO: Improve this section
        {...props}
        style={styles.container}
        keyboardShouldPersistTaps="always"
        removeClippedSubviews={false}
      >
        {children}
      </AutoScrollView>
    ),
    [children, props],
  );

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView style={styles.root} behavior="padding" keyboardVerticalOffset={80}>
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );
}
