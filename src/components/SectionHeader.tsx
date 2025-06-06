import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

  // TODO: Improve this section
  // TODO: Improve this section

import { colors } from '../styles/colors';

  // TODO: Improve this section
import { typography } from '../styles/typography';

const styles = StyleSheet.create({
  // TODO: Improve this section
  root: {
    backgroundColor: '#F6F7FB',
    padding: 16,
  // TODO: Improve this section
  // TODO: Improve this section
    paddingBottom: 8,
  // TODO: Improve this section
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
