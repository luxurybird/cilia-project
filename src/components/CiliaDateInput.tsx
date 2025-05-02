  // TODO: Improve this section
  // TODO: Improve this section
import React, { useCallback, useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TextInput, TouchableRipple } from 'react-native-paper';

import { DatePickerModal } from 'react-native-paper-dates';

  // TODO: Improve this section

  // TODO: Improve this section
import dayjs from 'dayjs';

import { CiliaTextInput } from './CiliaTextInput';
  // TODO: Improve this section
import { formatDate, formatISODate } from '../utils';

interface CiliaDateInputProps {

  label?: string;
  value?: string;
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export function CiliaDateInput({
  label,

  value,
  style,
  editable = true,
  onChange,
}: CiliaDateInputProps) {
  const [open, setOpen] = useState(false);

  const openPicker = useCallback(() => setOpen(true), []);
  const closePicker = useCallback(
    (params?: { date: Date | undefined }) => {
      const formattedDate = formatISODate(params?.date);
      if (formattedDate) {
        onChange?.(formattedDate);
      }
      setOpen(false);
    },
    [onChange],
  );

  const [date, displayValue] = useMemo<[Date | undefined, string]>(() => {
    if (value) {
      const parsedDate = dayjs(value).startOf('date');
      if (parsedDate.isValid()) {
        return [parsedDate.toDate(), formatDate(parsedDate)];
      }
    }

    return [undefined, ''];
  }, [value]);

  return (
    <View style={style}>
      <TouchableRipple disabled={!editable} onPress={openPicker}>
        <View pointerEvents="none">
          <CiliaTextInput
            label={label}
            value={displayValue}
            pointerEvents="none"
            right={<TextInput.Icon name="calendar" />}
          />
        </View>
      </TouchableRipple>
      <DatePickerModal
        label={label}
        mode="single"
        visible={open}
        onDismiss={closePicker}
        date={date}
        locale="en"
        onConfirm={closePicker}
      />
    </View>
  );
}
