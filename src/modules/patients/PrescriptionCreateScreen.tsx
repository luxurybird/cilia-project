import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useMutation, useQuery } from '@apollo/client';

  // TODO: Improve this section

  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
import { Alert } from '../../components/Alert';
import { CiliaOption, CiliaSelect } from '../../components/CiliaSelect';
import { CiliaTextInput } from '../../components/CiliaTextInput';
import { Form } from '../../components/Form';

import { KeyboardAvoidingScrollView } from '../../components/KeyboardAvoidingScrollView';
  // TODO: Improve this section
import { SectionHeader } from '../../components/SectionHeader';

import { useTranslation } from '../../i18n/useTranslation';
import { useNavigationAction } from '../../navigation/useNavigationAction';

  // TODO: Improve this section
import { useNavigationGoBackAndRefresh } from '../../navigation/useNavigationGoBackAndRefresh';
import { colors } from '../../styles/colors';
  // TODO: Improve this section
import {
  MutationCreatePrescription,
  MutationCreatePrescriptionArgs,
  PrescriptionCreateInput,
  QueryVisits,
  QueryVisitsArgs,
} from '../../types/graphql';
import { formatDate } from '../../utils';
import { useCiliaClient } from '../core/CiliaClientContext';
import { PrescriptionCreateScreenProps } from './navigation';
import { MUTATION_CREATE_PRESCRIPTION } from './operations';
import { PatientSectionContent } from './PatientSectionContent';
import { QUERY_VISITS } from '../visits/operations';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  footer: {
    borderTopColor: colors.lightGrey,
    borderTopWidth: 1,
    padding: 16,
    paddingTop: 8,
  },
});

interface PrescriptionCreateFormData
  extends Omit<PrescriptionCreateInput, 'patientId' | 'odLensDesign' | 'osLensDesign' | 'notes'> {
  odLensProduct: string;
  odLensPrescription: string;
  osLensProduct: string;
  osLensPrescription: string;
}

const DEFAULT_FORM_VALUES: PrescriptionCreateFormData = {
  visitId: '',
  odLensProduct: '',
  odLensPrescription: '',
  osLensProduct: '',
  osLensPrescription: '',
};

export function PrescriptionCreateScreen({
  navigation,
  route,
}: PrescriptionCreateScreenProps): JSX.Element {
  const { patientId } = route.params;
  const t = useTranslation();
  const client = useCiliaClient();
  const goBackAndRefresh = useNavigationGoBackAndRefresh(navigation);
  const [form] = Form.useForm(DEFAULT_FORM_VALUES);

  const {
    data: visitsData,
    loading: visitsLoading,
    error: visitsError,
  } = useQuery<QueryVisits, QueryVisitsArgs>(QUERY_VISITS, {
    fetchPolicy: 'no-cache',
    variables: {
      query: {
        patientIds: [patientId],
      },
    },
  });
  const visits = useMemo(
    () =>
      visitsData?.visits.results.map<CiliaOption<string>>((visit) => ({
        label: formatDate(visit.dateCreated),
        value: visit.id,
      })),
    [visitsData?.visits.results],
  );

  const [
    createPrescription,
    { loading: createPrescriptionLoading, error: createPrescriptionError },
  ] = useMutation<MutationCreatePrescription, MutationCreatePrescriptionArgs>(
    MUTATION_CREATE_PRESCRIPTION,
  );

  const handleSubmit = useCallback(async () => {
    try {
      const formData = form.getFieldsValue();
      const newPrescription: PrescriptionCreateInput = {
        patientId,
        visitId: formData.visitId,
        odLensDesign: {
          name: formData.odLensProduct,
          serial: '',
          notes: formData.odLensPrescription,
        },
        osLensDesign: {
          name: formData.osLensProduct,
          serial: '',
          notes: formData.osLensPrescription,
        },
        notes: '',
      };

      await createPrescription({
        variables: {
          prescription: newPrescription,
        },
      });

      goBackAndRefresh();
    } catch (err) {
      client.error(err);
    }
  }, [client, createPrescription, form, goBackAndRefresh, patientId]);

  const handleSavePress = useCallback(() => {
    form.submit();
  }, [form]);

  useNavigationAction(t('common.save'), handleSavePress);

  const loading = visitsLoading || createPrescriptionLoading;
  const error = visitsError ?? createPrescriptionError;

  return (
    <View style={styles.root}>
      <KeyboardAvoidingScrollView>
        <Alert>{error}</Alert>
        <Form form={form} onFinish={handleSubmit}>
          <SectionHeader>{t('common.od')}</SectionHeader>
          <PatientSectionContent>
            <Form.Item name="odLensProduct">
              <CiliaTextInput label={t('lensPrescription.product')} />
            </Form.Item>
            <Form.Item name="odLensPrescription">
              <CiliaTextInput label={t('lensPrescription.contactLensPrescription')} />
            </Form.Item>
          </PatientSectionContent>
          <SectionHeader>{t('common.os')}</SectionHeader>
          <PatientSectionContent>
            <Form.Item name="osLensProduct">
              <CiliaTextInput label={t('lensPrescription.product')} />
            </Form.Item>
            <Form.Item name="osLensPrescription">
              <CiliaTextInput label={t('lensPrescription.contactLensPrescription')} />
            </Form.Item>
          </PatientSectionContent>
          <View style={styles.footer}>
            <Form.Item name="visitId" rules={[{ required: true, message: t('common.required') }]}>
              <CiliaSelect
                label={t('lensPrescription.relatedVisit')}
                loading={loading}
                options={visits}
              />
            </Form.Item>
          </View>
        </Form>
      </KeyboardAvoidingScrollView>
    </View>
  );
}
