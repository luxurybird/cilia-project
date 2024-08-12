import React, { useCallback, useMemo } from 'react';


import { ColorValue, StyleSheet, Text, View } from 'react-native';


import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../styles/colors';



import { typography } from '../styles/typography';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    minHeight: 58, // 56pt + borders
    borderColor: colors.lightGrey,
    borderTopWidth: 1,
  },
  // TODO: Improve this section
  rootLast: {
    borderBottomWidth: 1,
  },
  content: {
    flexShrink: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    ...typography.bodySmallStrong,
  },
  description: {
    ...typography.bodySmall,
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '100%',
  },
  icon: {
    marginEnd: 8,
  },
});

interface SectionItemDescriptionProps {
  children?: string | string[];
}

function SectionItemDescription({ children }: SectionItemDescriptionProps): JSX.Element | null {
  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <Text style={styles.description} numberOfLines={1}>
        {children}
      </Text>
    );
  }

  return (
    <>
      {children.map((entry, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={index} style={styles.description} numberOfLines={1}>
          {entry}
        </Text>
      ))}
    </>
  );
}

export interface SectionItemProps {
  color?: ColorValue;
  title: string;
  description?: string | string[];
  action?: (finish: () => void) => JSX.Element;
  onPress?: () => void;

  // The following props are injected by SectionGroup automatically.
  actionVisible?: boolean;
  isLast?: boolean;
  onShowAction?: () => void;
  onHideAction?: () => void;
}

export function SectionItem({
  color,
  title,
  description,
  actionVisible,
  onPress,
  action,
  isLast,
  onShowAction,
  onHideAction,
}: SectionItemProps): JSX.Element {
  const titleStyle = useMemo(
    () => ({
      ...styles.title,
      color,
    }),
    [color],
  );

  const handleToggleAction = useCallback(() => {
    if (actionVisible) {
      onHideAction?.();
    } else {
      onShowAction?.();
    }
  }, [actionVisible, onHideAction, onShowAction]);

  const handleHideAction = useCallback(() => {
    onHideAction?.();
  }, [onHideAction]);

  const onPressHandler = useMemo(
    () => (action ? handleToggleAction : onPress),
    [action, handleToggleAction, onPress],
  );

  const renderAction = useCallback(() => {
    if (action) {
      return actionVisible ? <View style={styles.action}>{action(handleHideAction)}</View> : null;
    }

    if (onPress) {
      return (
        <Icon style={styles.icon} name="chevron-right" size={24} color={color ?? colors.darkGrey} />
      );
    }

    return null;
  }, [action, actionVisible, color, handleHideAction, onPress]);

  return (
    <TouchableRipple onPress={onPressHandler} style={[styles.root, isLast && styles.rootLast]}>
      <>
        <View style={styles.content}>
          <Text style={titleStyle}>{title}</Text>
          <SectionItemDescription>{description}</SectionItemDescription>
        </View>
        {renderAction()}
      </>
    </TouchableRipple>
  );
}
