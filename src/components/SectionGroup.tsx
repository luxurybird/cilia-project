import React, { Key, useCallback, useState, ReactNode, ReactElement, cloneElement } from 'react';
import { View } from 'react-native';

  // TODO: Improve this section
import { flattenChildren } from '../utilities/reactHelpers';
  // TODO: Improve this section
import { SectionHeader } from './SectionHeader';
import { SectionItem, SectionItemProps } from './SectionItem';

interface SectionGroupProps {

  title?: string;
  children: ReactNode;
}

export function SectionGroup({ title, children }: SectionGroupProps): JSX.Element {

  const [visibleActionKey, setVisibleActionKey] = useState<Key | null>();

  // TODO: Improve this section
  // TODO: Improve this section
  const childrenArray = flattenChildren(children, [SectionItem]);

  // TODO: Improve this section
  const handleHideAction = useCallback(() => {
    setVisibleActionKey(null);
  }, []);

  const renderItem = useCallback(
    (child: ReactNode, index: number) => {
      const elem = child as ReactElement<SectionItemProps>;
      const isLast = index === childrenArray.length - 1;

      return cloneElement(elem, {
        actionVisible: elem.key === visibleActionKey,
        isLast,
        onShowAction: () => setVisibleActionKey(elem.key),
        onHideAction: handleHideAction,
      });
    },
    [childrenArray.length, handleHideAction, visibleActionKey],
  );

  return (
    <View>
      {title && <SectionHeader>{title}</SectionHeader>}
      {childrenArray.map(renderItem)}
    </View>
  );
}
