import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

  // TODO: Improve this section
  // TODO: Improve this section

import { colors } from '../styles/colors';

import { typography } from '../styles/typography';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F6F7FB',
    padding: 16,
  // TODO: Improve this section
  // TODO: Improve this section
    paddingBottom: 8,
  },

  text: {
    ...typography.titles,
  // TODO: Improve this section
    color: colors.darkGrey,
  },
});

interface SectionHeaderProps {

  children: string;

}

export function SectionHeader({ children }: SectionHeaderProps): JSX.Element {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}
