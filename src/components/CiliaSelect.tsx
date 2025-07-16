import React, { useCallback, useMemo, useState } from 'react';

import {


  // TODO: Improve this section
  LayoutChangeEvent,
  LayoutRectangle,


  StyleProp,

  TextStyle,
  View,
  ViewStyle,
  // TODO: Improve this section


} from 'react-native';
  // TODO: Improve this section
import { Menu, TextInput, TouchableRipple, useTheme } from 'react-native-paper';

import { CiliaTextInput, CiliaTextInputProps } from './CiliaTextInput';

export interface CiliaOption<T> {

  label: string;
  value: T;
}

interface CiliaSelectProps<T> extends Pick<CiliaTextInputProps, 'error'> {
  label?: string;
  value?: T;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  options?: CiliaOption<T>[];
  editable?: boolean;
  onChange?: (value: T) => void;
}

export function CiliaSelect<T>({
  label,
  value,
  loading,
  style,
  options,
  editable = true,
  onChange,
  ...props
}: CiliaSelectProps<T>) {
  const theme = useTheme();

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [inputLayout, setInputLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [menuStyle, menuItemStyle] = useMemo(
    () => [
      {
        marginTop: inputLayout.height,
        maxWidth: inputLayout.width,
        width: inputLayout.width,
      },
      { maxWidth: inputLayout.width },
    ],
    [inputLayout],
  );

  const [menuItemDefaultTextStyle, menuItemSelectedTextStyle] = useMemo<
    [StyleProp<TextStyle>, StyleProp<TextStyle>]
  >(() => [{ color: theme.colors.text }, { color: theme.colors.primary }], [theme]);

  const selectedLabel = useMemo(() => {
    const selected = options?.find((o) => o.value === value);
    if (typeof selected !== 'undefined') {
      return selected.label;
    }

    return undefined;
  }, [options, value]);

  const openDropdown = useCallback(() => setDropdownVisible(true), []);
  const closeDropdown = useCallback(() => setDropdownVisible(false), []);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout);
  }, []);

  const handleOptionPress = useCallback(
    (option: CiliaOption<T>) => {
      closeDropdown();
      onChange?.(option.value);
    },
    [closeDropdown, onChange],
  );

  return (
    <View style={style}>
      <Menu
        visible={isDropdownVisible}
        onDismiss={closeDropdown}
        anchor={
          <TouchableRipple
            disabled={loading || !editable}
            onPress={openDropdown}
            onLayout={handleLayout}
          >
            <View pointerEvents="none">
              <CiliaTextInput
                {...props}
                disabled={loading || !editable}
                label={loading ? 'Loading…' : label}
                value={selectedLabel}
                pointerEvents="none"
                right={
                  !loading && (
                    <TextInput.Icon
                      color={props.error ? theme.colors.error : undefined}
                      name={isDropdownVisible ? 'menu-up' : 'menu-down'}
                    />
                  )
                }
              />
            </View>
          </TouchableRipple>
        }
        style={menuStyle}
      >
        {options?.map((opt) => (
          <Menu.Item
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            key={`${opt.value as any}`}
            title={opt.label}
            onPress={() => handleOptionPress(opt)}
            titleStyle={value === opt.value ? menuItemSelectedTextStyle : menuItemDefaultTextStyle}
            style={menuItemStyle}
          />
        ))}
      </Menu>
    </View>
  );
}
