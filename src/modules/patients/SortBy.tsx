import React, { useCallback } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
  // TODO: Improve this section
import { Menu, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useBooleanState } from '../../hooks/useBooleanState';

import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

import { ReactComponentPropType } from '../../utils';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  // TODO: Improve this section
    alignItems: 'baseline',
  },
  label: {
    ...typography.bodySmall,
    color: colors.grey,
  },
  field: {
    marginStart: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldText: {
    ...typography.bodySmallStrong,
    color: colors.primary,
  },
  disabled: {
    color: colors.grey,
  },
});

type SortFieldProps = ReactComponentPropType<typeof TouchableRipple>;

function SortField({ disabled, children, ...props }: SortFieldProps): JSX.Element {
  return (
    <TouchableRipple {...props} disabled={disabled}>
      <View style={styles.field}>
        <Text style={[styles.fieldText, disabled && styles.disabled]}>{children}</Text>
        <Icon
          name="chevron-down"
          color={disabled ? styles.disabled.color : colors.primary}
          size={24}
        />
      </View>
    </TouchableRipple>
  );
}

interface SortBySelectorProps<TValue extends string> extends ViewProps {
  disabled?: boolean;
  label: string;
  selected?: TValue;
  values: TValue[];
  itemLabel: (value: TValue) => string;
  onChange?: (value: TValue) => void;
}

export function SortBySelector<TValue extends string>({
  style,
  disabled,
  label,
  selected,
  values,
  itemLabel,
  onChange,
  ...props
}: SortBySelectorProps<TValue>): JSX.Element {
  const [visible, openMenu, closeMenu] = useBooleanState(false);

  const handleMenuItemPress = useCallback(
    (newValue: TValue) => {
      closeMenu();
      onChange?.(newValue);
    },
    [closeMenu, onChange],
  );

  return (
    <View {...props} style={[styles.root, style]}>
      <Text style={styles.label}>{label}</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <SortField disabled={disabled} onPress={openMenu}>
            {selected ? itemLabel(selected) : null}
          </SortField>
        }
      >
        {values.map((itemValue) => (
          <Menu.Item
            key={itemValue}
            onPress={() => handleMenuItemPress(itemValue)}
            title={itemLabel(itemValue)}
          />
        ))}
      </Menu>
    </View>
  );
}
