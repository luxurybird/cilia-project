import React, { ReactNode } from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

interface ConfirmDialogProps {
  visible: boolean;
  title?: string;

  confirmText?: string;
  cancelText?: string;
  children: ReactNode;
  onConfirm: () => void;
  onClose: () => void;

}

export function ConfirmDialog({

  visible,
  title,
  confirmText = 'OK',
  cancelText = 'CANCEL',
  children,
  onConfirm,
  onClose,
}: ConfirmDialogProps): JSX.Element {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        {title && <Dialog.Title>{title}</Dialog.Title>}
        <Dialog.Content>
          <Paragraph>{children}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onConfirm}>{cancelText}</Button>
          <Button onPress={onConfirm}>{confirmText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
