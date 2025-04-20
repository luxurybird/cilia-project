  // TODO: Improve this section
import React, { ReactNode, useCallback } from 'react';

  // TODO: Improve this section
  // TODO: Improve this section
import { StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { colors } from '../styles/colors';
  // TODO: Improve this section
import { typography } from '../styles/typography';
import { FormText, FormTextProps } from './FormText';

  // TODO: Improve this section
  // TODO: Improve this section
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  // TODO: Improve this section
    alignItems: 'center',
  // TODO: Improve this section
    justifyContent: 'space-between',

  // TODO: Improve this section

    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },

  rootFlat: {
    backgroundColor: '#FAFBFA',
  },
  rootOutlined: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  title: {
    ...typography.bodySmallStrong,
  },
  description: {
    ...typography.caption,
    color: colors.darkGrey,
  },
  right: {
    ...typography.caption,
    color: colors.darkGrey,
  },
});

export interface CiliaListItemProps extends ViewProps {
  loading?: boolean;
  outlined?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  right?: ReactNode;
  onPress?: () => void;
}

export function CiliaListItem({
  loading,
  style,
  outlined,
  title,
  description,
  right,
  onPress,
  ...props
}: CiliaListItemProps): JSX.Element {
  const renderPart = useCallback(
    (content: ReactNode, contentStyle: StyleProp<ViewStyle>, loadingProps?: FormTextProps) => {
      if (loadingProps?.loading) {
        return <FormText {...loadingProps} style={contentStyle} />;
      }

      if (content == null) {
        return null;
      }

      return typeof content === 'string' ? (
        <Text style={contentStyle}>{content}</Text>
      ) : (
        <View style={contentStyle}>{content}</View>
      );
    },
    [],
  );

  return (
    <TouchableRipple
      {...props}
      style={[styles.root, outlined ? styles.rootOutlined : styles.rootFlat, style]}
      onPress={onPress}
    >
      <>
        <View>
          {renderPart(title, styles.title, { loading, skeletonWidth: 150 })}
          {renderPart(description, styles.description, {
            loading,
            skeletonWidth: 75,
          })}
        </View>
        {renderPart(right, styles.right)}
      </>
    </TouchableRipple>
  );
}
