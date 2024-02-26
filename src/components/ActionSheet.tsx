  // TODO: Improve this section
import React, {
  // TODO: Improve this section
  Children,
  cloneElement,

  // TODO: Improve this section

  isValidElement,

  ReactElement,
  // TODO: Improve this section
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
  // TODO: Improve this section
  // TODO: Improve this section
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';

import { Color, colors } from '../styles/colors';

  // TODO: Improve this section
import { ButtonProps, TextButton } from './buttons';

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
    marginBottom: 0,

  },
  content: {
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: colors.white,
    marginBottom: 16,
  },
});

interface ActionSheetButtonProps extends Pick<ButtonProps, 'onPress'> {
  color?: Extract<Color, 'primary' | 'red'>;
  children: string;
}

export function ActionSheetButton({
  color = 'primary',
  children,
  ...props
}: ActionSheetButtonProps): JSX.Element {
  const labelStyle = useMemo(
    () => ({
      color: colors[color],
    }),
    [color],
  );

  return (
    <TextButton {...props} style={styles.button} labelStyle={labelStyle}>
      {children}
    </TextButton>
  );
}

interface ActionSheetProps {
  visible: boolean;
  children?: ReactElement<ActionSheetButtonProps> | ReactElement<ActionSheetButtonProps>[];
  onDismiss?: () => void;
}

export function ActionSheet({
  visible,
  children,
  onDismiss,
}: ActionSheetProps): JSX.Element | null {
  const renderChild = useCallback(
    (elem: ReactNode) => (isValidElement(elem) ? cloneElement(elem, {}) : null),
    [],
  );

  // FIXME: Find a way to enable animations on show/hide while fixing overlay issue
  if (!visible) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <Modal
            visible={visible}
            style={styles.root}
            contentContainerStyle={{
              ...styles.content,
              paddingBottom: insets?.bottom,
            }}
            onDismiss={onDismiss}
          >
            {Children.toArray(children).map(renderChild)}
          </Modal>
        )}
      </SafeAreaInsetsContext.Consumer>
    </SafeAreaProvider>
  );
}
