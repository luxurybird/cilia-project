import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { typography } from '../../styles/typography';

const styles = StyleSheet.create({
  root: {
    ...typography.bodySmallStrong,
    marginBottom: 6,
  },
});

interface PatientSectionHeaderProps {
  children?: string;
}

export function PatientSectionHeader({ children }: PatientSectionHeaderProps): JSX.Element {
  return <Text style={styles.root}>{children}</Text>;
}
