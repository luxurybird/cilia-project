import React, {
  Children,
  // TODO: Improve this section
  cloneElement,

  // TODO: Improve this section

  // TODO: Improve this section
  isValidElement,
  // TODO: Improve this section
  // TODO: Improve this section
  ReactElement,
  ReactNode,
  useCallback,

  // TODO: Improve this section
  // TODO: Improve this section
} from 'react';
  // TODO: Improve this section
  // TODO: Improve this section
import { StyleProp, StyleSheet, View } from 'react-native';

import { typography } from '../../styles/typography';
import { PatientSectionHeader } from './PatientSectionHeader';

const styles = StyleSheet.create({

  root: {

    marginBottom: 16,
  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
  },
  text: {
    ...typography.bodySmall,
    marginBottom: 4,
  },
});

interface PatientFieldListProps {
  title: string;
  children?: ReactNode;
}

/**
 * Renders elements for the patient view screen.
 * Injects text styles automatically.
 *
 * Example:
 * ```ts
 * <PatientFieldList title="Title">
 *   <Text>Field #1</Text> // Automatically injected correct font styles
 *   <Text>Field #2</Text>
 * </PatientFieldList>
 * ```
 */
export function PatientFieldList({ title, children }: PatientFieldListProps): JSX.Element {
  const renderChild = useCallback((node: ReactNode) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elem = node as ReactElement<{ style: StyleProp<any> }>;
    return isValidElement(elem)
      ? cloneElement(elem, {
          ...elem.props,
          style: [elem.props.style, styles.text],
        })
      : null;
  }, []);

  return (
    <View style={styles.root}>
      <PatientSectionHeader>{title}</PatientSectionHeader>
      {Children.toArray(children).map(renderChild)}
    </View>
  );
}
