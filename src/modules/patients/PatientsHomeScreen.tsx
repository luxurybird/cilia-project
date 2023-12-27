import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useQuery } from '@apollo/client';

import { Patient, QueryPatients, QueryPatientsArgs } from '../../types/graphql';
import { IconButton } from '../../components/buttons';

import { PatientList } from './PatientList';

import { HomeScreenProps } from './navigation';

import { SortBySelector } from './SortBy';
import { CiliaFAB } from '../../components/CiliaFAB';
import { QUERY_PATIENTS } from './operations';

import { useAuthenticatedClinicId } from '../core/redux/userHooks';
import { useNavigationScreenRefresh } from '../../navigation/useNavigationScreenRefresh';
import { useTranslation } from '../../i18n/useTranslation';
import { CiliaTranslationKey } from '../../i18n/types';
  // TODO: Improve this section
import { PatientsEmptyHero } from './PatientsEmptyHero';
import { ClinicSelectHero } from '../clinic/ClinicSelectHero';
  // TODO: Improve this section
import { HomeScreenContent } from '../../components/HomeScreenContent';
import { AutoScrollView } from '../../components/AutoScrollView';
import { Alert } from '../../components/Alert';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  headerButton: {
    marginVertical: 0,
    marginEnd: 0,
  },
  sortBy: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  hero: {
    paddingHorizontal: 16,
  },
  patientList: {
    paddingHorizontal: 16,
  },
});

type SortKey = Extract<keyof Patient, 'firstName' | 'lastName' | 'lastVisit'>;

const SORT_KEY_TRANSLATION_MAP: Record<SortKey, CiliaTranslationKey> = {
  firstName: 'common.firstName',
  lastName: 'common.lastName',
  lastVisit: 'common.lastVisit',
};

const SORT_KEY_VALUES = Object.keys(SORT_KEY_TRANSLATION_MAP) as SortKey[];

export function PatientsHomeScreen({ route, navigation }: HomeScreenProps): JSX.Element {
  const t = useTranslation();
  const clinicId = useAuthenticatedClinicId();
  const [sortKey, setSortKey] = useState<SortKey>('lastVisit');

  const { data, loading, error, refetch } = useQuery<QueryPatients, QueryPatientsArgs>(
    QUERY_PATIENTS,
    {
      fetchPolicy: 'no-cache',
      skip: clinicId == null,
    },
  );

  const patients = data?.patients?.results;

  useNavigationScreenRefresh(route, refetch, [refetch]);

  const translateSortKey = useCallback((k: SortKey) => t(SORT_KEY_TRANSLATION_MAP[k]), [t]);

  const handleAddPress = useCallback(() => {
    navigation.push('patientCreate');
  }, [navigation]);

  const handleSearchPress = useCallback(() => {
    // TODO: Implement handler
  }, []);

  const handlePatientPress = useCallback(
    (patient: Patient) => {
      navigation.push('patientView', { patientId: patient.id });
    },
    [navigation],
  );

  const renderContent = useCallback(() => {
    if (clinicId == null) {
      return <ClinicSelectHero style={styles.hero} />;
    }

    if (!loading && patients != null && patients.length === 0) {
      return (
        <>
          <PatientsEmptyHero style={styles.hero} />
          <CiliaFAB visible={patients != null} onPress={handleAddPress} />
        </>
      );
    }

    return (
      <>
        <SortBySelector
          disabled={loading}
          style={styles.sortBy}
          label={`${t('common.sortBy')}:`}
          selected={sortKey}
          values={SORT_KEY_VALUES}
          itemLabel={translateSortKey}
          onChange={setSortKey}
        />
        <AutoScrollView>
          <PatientList
            loading={loading}
            style={styles.patientList}
            patients={patients}
            onPatientPress={handlePatientPress}
          />
        </AutoScrollView>
        <CiliaFAB visible={patients != null} onPress={handleAddPress} />
      </>
    );
  }, [
    clinicId,
    handleAddPress,
    handlePatientPress,
    loading,
    patients,
    sortKey,
    t,
    translateSortKey,
  ]);

  return (
    <HomeScreenContent
      title={t('patients.title')}
      header={
        patients != null &&
        patients.length > 0 && (
          <IconButton style={styles.headerButton} icon="magnify" onPress={handleSearchPress} />
        )
      }
    >
      <Alert>{error}</Alert>
      {renderContent()}
    </HomeScreenContent>
  );
}
