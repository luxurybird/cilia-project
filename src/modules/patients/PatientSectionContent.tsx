import React, { Children, ReactElement, ReactNode, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { CiliaTextInput } from '../../components/CiliaTextInput';

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  rootNonUniformPadding: {
    paddingTop: 8,
  },
  inputChild: {
    paddingTop: 8,
  },
});

interface PatientSectionContentProps {
  children: ReactNode;
}

export function PatientSectionContent({ children }: PatientSectionContentProps): JSX.Element {
  const childArray = useMemo(() => Children.toArray(children).filter((x) => x != null), [children]);

  const renderChild = useCallback(
    (child: ReactNode, index: number) =>
      child != null ? (
        <View
          key={(child as ReactElement).key}
          style={
            index > 0 && (child as ReactElement).type === CiliaTextInput ? styles.inputChild : null
          }
        >
          {child}
        </View>
      ) : null,
    [],
  );

  const nonUniformPadding = (childArray[0] as ReactElement | undefined)?.type === CiliaTextInput;

  return (
    <View style={[styles.root, nonUniformPadding && styles.rootNonUniformPadding]}>
      {childArray.map(renderChild)}
    </View>
  );
}
