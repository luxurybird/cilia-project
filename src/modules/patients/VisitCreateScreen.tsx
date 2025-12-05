import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { ReactNativeFile } from 'apollo-upload-client';

import { AttachmentList } from '../../components/AttachmentList';
import { CiliaTextInput } from '../../components/CiliaTextInput';
import { KeyboardAvoidingScrollView } from '../../components/KeyboardAvoidingScrollView';
import { SectionHeader } from '../../components/SectionHeader';
import { useNavigationAction } from '../../navigation/useNavigationAction';
import { PatientSectionContent } from './PatientSectionContent';
import { VisitCreateScreenProps } from './navigation';
import {
  MutationCreateVisit,
  MutationCreateVisitArgs,
  MutationUploadVfs,
  MutationUploadVfsArgs,
  VisitCreateInput,
} from '../../types/graphql';
import { MUTATION_CREATE_VISIT, MUTATION_UPLOAD_VFS } from './operations';
import { useAuthenticatedUser } from '../core/redux/userHooks';
import { Alert } from '../../components/Alert';
import { Loading } from '../../components/Loading';
import { Form } from '../../components/Form';
import { useCiliaClient } from '../core/CiliaClientContext';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {},
});

const DEFAULT_PATIENT_VISIT: VisitCreateInput = {
  patientId: '',
  odScanFileId: null,
  osScanFileId: null,
  notes: '',
  odRefraction: null,
  osRefraction: null,
  attachments: [],
  actions: [],
};

export function VisitCreateScreen({ navigation, route }: VisitCreateScreenProps): JSX.Element {
  const client = useCiliaClient();
  const [, selfUser] = useAuthenticatedUser();
  const { patient } = route.params;
  const [attachmentError, setAttachmentError] = useState<Error | null>(null);
  const [form] = Form.useForm(DEFAULT_PATIENT_VISIT);

  const [uploadFile, { loading: uploadFileLoading, error: uploadFileError }] = useMutation<
    MutationUploadVfs,
    MutationUploadVfsArgs
  >(MUTATION_UPLOAD_VFS);

  const [createVisit, { loading: createVisitLoading, error: createVisitError }] = useMutation<
    MutationCreateVisit,
    MutationCreateVisitArgs
  >(MUTATION_CREATE_VISIT);

  const clearAttachmentError = useCallback(() => {
    setAttachmentError(null);
  }, []);

  const handleImagePress = useCallback(
    (uri: string) => {
      navigation.navigate('imagePreview', { source: uri });
    },
    [navigation],
  );

  const handleImageSelect = useCallback(
    async (uri: string) => {
      try {
        // TODO: Make sure we really upload JPEG files all the time
        const input = new ReactNativeFile({
          uri,
          name: 'attachment.jpg',
          type: 'image/jpeg',
        });

        const { data } = await uploadFile({
          variables: {
            input,
            name: input.name ?? 'file',
          },
        });

        const remoteUri = data?.uploadVfs?.downloadUrl;

        if (remoteUri) {
          const prevAttachments = form.getFieldValue('attachments') as string[];
          form.setFieldsValue({
            attachments: [...prevAttachments, remoteUri],
          });
        }
      } catch (err) {
        client.error(err);
      }
    },
    [client, form, uploadFile],
  );

  const handleNextPress = useCallback(() => {
    form.submit();
  }, [form]);

  useNavigationAction('Next', handleNextPress);

  const handleFinish = useCallback(async () => {
    if (selfUser == null) {
      return;
    }

    const newVisit: VisitCreateInput = {
      ...form.getFieldsValue(),
      patientId: patient.id,
    };

    const { data } = await createVisit({
      variables: {
        visit: newVisit,
      },
    });

    const visitId = data?.createVisit?.id;
    if (visitId) {
      navigation.push('visitView', { patient, visitId });
    }
  }, [createVisit, form, navigation, patient, selfUser]);

  const loading = uploadFileLoading || createVisitLoading;
  const error = uploadFileError ?? attachmentError ?? createVisitError;

  return (
    <View style={styles.root}>
      <Loading visible={loading} overlay />

      <KeyboardAvoidingScrollView>
        <Alert>{error}</Alert>
        <Form form={form} onFinish={handleFinish}>
          <PatientSectionContent>
            <Form.Item name="attachments">
              <AttachmentList
                onImagePress={handleImagePress}
                onImageSelect={handleImageSelect}
                onError={setAttachmentError}
              />
            </Form.Item>
          </PatientSectionContent>
          <SectionHeader>NOTES</SectionHeader>
          <PatientSectionContent>
            <Form.Item name="notes">
              <CiliaTextInput label="Notes" multiline />
            </Form.Item>
          </PatientSectionContent>
          <SectionHeader>K READINGS</SectionHeader>
          <PatientSectionContent>
            <CiliaTextInput label="OD" />
            <CiliaTextInput label="OS" />
          </PatientSectionContent>
          <SectionHeader>UCVA</SectionHeader>
          <PatientSectionContent>
            <CiliaTextInput label="OD" />
            <CiliaTextInput label="OS" />
          </PatientSectionContent>
          <SectionHeader>BCVA</SectionHeader>
          <PatientSectionContent>
            <CiliaTextInput label="OD" />
            <CiliaTextInput label="OS" />
          </PatientSectionContent>
          <SectionHeader>REFRACTION</SectionHeader>
          <PatientSectionContent>
            <CiliaTextInput label="OD" />
            <CiliaTextInput label="OS" />
          </PatientSectionContent>
          <SectionHeader>OVER-REFRACTION</SectionHeader>
          <PatientSectionContent>
            <CiliaTextInput label="OD" />
            <CiliaTextInput label="OS" />
          </PatientSectionContent>
        </Form>
      </KeyboardAvoidingScrollView>
      <Portal>
        <Dialog visible={attachmentError != null} onDismiss={clearAttachmentError}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{attachmentError?.message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={clearAttachmentError}>CLOSE</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
