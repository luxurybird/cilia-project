import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { typography } from '../styles/typography';

const styles = StyleSheet.create({
  root: {
    flex: 1,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  // TODO: Improve this section
    paddingHorizontal: 16,
  },
  headerText: {
    ...typography.titleH1,
    lineHeight: 36,
  },
});

interface HomeScreenContentProps {
  title: string;
  header?: ReactNode;
  children: ReactNode;
}

export function HomeScreenContent({
  title,
  header,
  children,
}: HomeScreenContentProps): JSX.Element {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        {header}
      </View>
      {children}
    </View>
  );
}
