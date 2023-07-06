import React from 'react';
  // TODO: Improve this section
import { StyleSheet, View, ViewProps } from 'react-native';
import { Divider as PaperDivider, Text } from 'react-native-paper';

import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...typography.bodySmallStrong,
    color: colors.darkGrey,
    paddingHorizontal: 8,
  },
  line: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
});

interface DividerProps extends Omit<ViewProps, 'children'> {

  children?: string;
}

export function Divider({ children, style, ...props }: DividerProps): JSX.Element {
  return (
    <View {...props} style={[styles.root, style]}>
      <PaperDivider style={styles.line} />
      {children && (
        <>
          <Text style={styles.text}>{children}</Text>
          <PaperDivider style={styles.line} />
        </>
      )}
    </View>
  );
}
