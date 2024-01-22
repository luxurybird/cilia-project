import React, { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-paper';
import { useQuery } from '@apollo/client';

import { CiliaFAB } from '../../components/CiliaFAB';
import { typography } from '../../styles/typography';

import { VisitSummary } from '../visits/types';
import { VisitList } from '../visits/VisitList';
  // TODO: Improve this section
import { PatientViewScreenProps } from './navigation';
import { PatientFieldList } from './PatientFieldList';
import { PrescriptionList } from './PrescriptionList';
  // TODO: Improve this section
  // TODO: Improve this section

import { ActionSheet, ActionSheetButton } from '../../components/ActionSheet';
import { useBooleanState } from '../../hooks/useBooleanState';
import { useNavigationAction } from '../../navigation/useNavigationAction';
import { formatPatient } from './formatPatient';
import { GenderIcon } from './GenderIcon';

import {
  QueryPatient,
  QueryPatientArgs,
  QueryPrescriptions,
  QueryPrescriptionsArgs,
} from '../../types/graphql';
import { QUERY_PATIENT, QUERY_PRESCRIPTIONS } from './operations';
import { useNavigationScreenRefresh } from '../../navigation/useNavigationScreenRefresh';
import { useTranslation } from '../../i18n/useTranslation';
import { Alert } from '../../components/Alert';
import { FormText } from '../../components/FormText';
import { useVisitsQuery } from '../visits/useVisitsQuery';
import { PatientSectionHeader } from './PatientSectionHeader';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  displayNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  displayName: {
    ...typography.bodyStrong,
  },
  genderIcon: {
    marginStart: 8,
  },
  text: {
    ...typography.bodySmall,
    marginBottom: 6,
  },
  list: {
    marginVertical: 8,
  },
});

export const MOCK_VISITS_DATA: VisitSummary[] = Array(5)
  .fill(0)
  .map((_, index) => ({
    id: index.toString(),
    dateCreated: new Date(new Date(2021, 7, 30, 15, 30).valueOf() + 86400000 * index).toISOString(),
  }));

export function PatientViewScreen({ navigation, route }: PatientViewScreenProps): JSX.Element {
  const { patientId } = route.params;
  const t = useTranslation();
  const [contextMenuVisible, showContextMenu, hideContextMenu] = useBooleanState(false);

  const {
    data: patientData,
    refetch: refetchPatient,
    loading: patientLoading,
    error: patientError,
  } = useQuery<QueryPatient, QueryPatientArgs>(QUERY_PATIENT, {
    fetchPolicy: 'no-cache',
    variables: {
      id: patientId,
    },
  });
  const patient = patientData?.patient ?? null;

  const {
    data: prescriptionsData,
    refetch: refetchPrescriptions,
    loading: prescriptionsLoading,
    error: prescriptionsError,
  } = useQuery<QueryPrescriptions, QueryPrescriptionsArgs>(QUERY_PRESCRIPTIONS, {
    fetchPolicy: 'no-cache',
    variables: {
      query: {
        patientIds: [patientId],
      },
    },
  });
  const prescriptions = prescriptionsData?.prescriptions?.results ?? null;

  const {
    data: visitsData,
    refetch: refetchVisits,
    loading: visitsLoading,
    error: visitsError,
  } = useVisitsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      query: {
        patientIds: [patientId],
      },
    },
  });
  const visits = visitsData?.visits?.results ?? null;

  const refetch = useCallback(async () => {
    await refetchPatient();
    await refetchPrescriptions();
    await refetchVisits();
  }, [refetchPatient, refetchPrescriptions, refetchVisits]);

  useNavigationScreenRefresh(route, refetch, [refetch]);

  const { displayName, description } = useMemo(() => formatPatient(patient), [patient]);

  const handleEditPress = useCallback(() => {
    // TODO: Implement patient edit press
  }, []);

  const handleLensOrderPress = useCallback(() => {
    // TODO: Implement patient lens order press
  }, []);

  const handleVisitPress = useCallback(
    (visit: VisitSummary) => {
      if (patient != null) {
        navigation.push('visitView', {
          patient,
          visitId: visit.id,
        });
      }
    },
    [navigation, patient],
  );

  const handleNewLensOrderPress = useCallback(() => {
    hideContextMenu();
    navigation.push('prescriptionCreate', { patientId });
  }, [hideContextMenu, navigation, patientId]);

  const handleNewVisitPress = useCallback(() => {
    hideContextMenu();
    if (patient != null) {
      navigation.push('visitCreate', { patient });
    }
  }, [hideContextMenu, navigation, patient]);

  const handleAddPress = useCallback(() => {
    showContextMenu();
  }, [showContextMenu]);

  useNavigationAction(t('patient.editPatient'), handleEditPress);

  const loading = patientLoading || visitsLoading || prescriptionsLoading;
  const error = patientError ?? visitsError ?? prescriptionsError;

  return (
    <View style={styles.root}>
      <ScrollView style={styles.content}>
        <Alert fullWidth>{error}</Alert>
        <View style={styles.header}>
          <View style={styles.displayNameRow}>
            <FormText style={styles.displayName} skeletonWidth={200} loading={loading}>
              {displayName}
            </FormText>
            {patient != null && <GenderIcon style={styles.genderIcon} gender={patient.gender} />}
          </View>
          <FormText style={styles.text} skeletonWidth={150} loading={loading}>
            {description}
          </FormText>
        </View>

        <PatientFieldList title={t('common.contact')}>
          <FormText skeletonWidth={150} loading={loading}>
            {patient?.email}
          </FormText>
          <FormText skeletonWidth={100} loading={loading}>
            {patient?.phone}
          </FormText>
          <FormText skeletonWidth={200} loading={loading}>
            {patient?.address}
          </FormText>
        </PatientFieldList>

        <PatientFieldList title={t('common.notes')}>
          <FormText skeletonWidth={300} loading={loading}>
            {patient?.notes}
          </FormText>
        </PatientFieldList>

        <View style={styles.list}>
          <PatientSectionHeader>{t('patient.lensPrescriptions')}</PatientSectionHeader>
          <PrescriptionList
            loading={loading}
            prescriptions={prescriptions}
            onPress={handleLensOrderPress}
          />
        </View>

        <View style={styles.list}>
          <PatientSectionHeader>{t('patient.visits')}</PatientSectionHeader>
          <VisitList loading={loading} visits={visits} onPress={handleVisitPress} />
        </View>
      </ScrollView>

      <Portal>
        <ActionSheet visible={contextMenuVisible} onDismiss={hideContextMenu}>
          <ActionSheetButton onPress={handleNewLensOrderPress}>
            {t('patient.newLensPrescription')}
          </ActionSheetButton>
          <ActionSheetButton onPress={handleNewVisitPress}>
            {t('patient.newVisit')}
          </ActionSheetButton>
          <ActionSheetButton color="red" onPress={hideContextMenu}>
            {t('common.back')}
          </ActionSheetButton>
        </ActionSheet>
      </Portal>
      <CiliaFAB visible={patient != null} onPress={handleAddPress} />
    </View>
  );
}
