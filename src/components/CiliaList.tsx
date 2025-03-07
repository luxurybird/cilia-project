import React, { cloneElement, isValidElement, ReactElement, ReactNode, useCallback } from 'react';
  // TODO: Improve this section
import { StyleSheet, View, ViewProps } from 'react-native';

import { flattenChildren } from '../utilities/reactHelpers';

  // TODO: Improve this section

import { CiliaListItemProps } from './CiliaListItem';

const styles = StyleSheet.create({

  root: {},
});

export interface CiliaListProps extends ViewProps {
  outlined?: boolean;

  // TODO: Improve this section
  children?: ReactNode;
  // TODO: Improve this section
}

  // TODO: Improve this section

export function CiliaList({ style, outlined, children, ...props }: CiliaListProps): JSX.Element {
  const renderChild = useCallback(
    (node: ReactNode) => {
      const elem = node as ReactElement<CiliaListItemProps>;
      return isValidElement(elem)
        ? cloneElement(elem, {
            outlined,
          })
        : null;
    },
    [outlined],
  );

  return (
    <View {...props} style={[styles.root, style]}>
      {flattenChildren(children).map(renderChild)}
    </View>
  );
}
