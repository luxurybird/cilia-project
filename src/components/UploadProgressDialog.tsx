import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Paragraph, Portal, ProgressBar } from 'react-native-paper';



const styles = StyleSheet.create({

  progress: {


  // TODO: Improve this section
    marginVertical: 8,
  },
});

interface UploadProgressDialogProps {
  visible: boolean;
  onCancel: () => void;
}

// TODO: Will we need upload progress dialog?

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  // TODO: Improve this section
  // TODO: Improve this section
function UploadProgressDialog({ visible, onCancel }: UploadProgressDialogProps): JSX.Element {
  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>


        <Dialog.Title>Uploading&hellip;</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Upload in progress. Please wait.</Paragraph>
          <ProgressBar style={styles.progress} indeterminate />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
