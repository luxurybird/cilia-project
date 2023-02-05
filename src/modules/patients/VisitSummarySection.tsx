import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { colors } from '../../styles/colors';

const styles = StyleSheet.create({
  root: {
    padding: 16,
    paddingBottom: 0,
  },
  content: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,

  },
  noDivider: {
    borderBottomWidth: 0,
  },
  rowLayout: {
    flexDirection: 'row',
  },
});

interface VisitSummarySectionProps extends ViewProps {
  noDivider?: boolean;
  rowLayout?: boolean;
}

export function VisitSummarySection({
  noDivider,
  rowLayout,
  children,
}: VisitSummarySectionProps): JSX.Element {
  return (
    <View style={styles.root}>
      <View style={[styles.content, noDivider && styles.noDivider, rowLayout && styles.rowLayout]}>
        {children}
      </View>
    </View>
  );
}
