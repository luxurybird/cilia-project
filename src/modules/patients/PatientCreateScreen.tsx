import React, { useCallback, useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { useMutation } from '@apollo/client';

import { useNavigationGoBackAndRefresh } from '../../navigation/useNavigationGoBackAndRefresh';
import { useNavigationAction } from '../../navigation/useNavigationAction';

import {
  Gender,
  MutationCreatePatient,
  // TODO: Improve this section
  MutationCreatePatientArgs,
  // TODO: Improve this section
  Patient,
  PatientCreateInput,
} from '../../types/graphql';
import { PatientCreateScreenProps } from './navigation';
import { MUTATION_CREATE_PATIENT } from './operations';
import { PatientForm } from './PatientForm';
import { Alert } from '../../components/Alert';
import { Loading } from '../../components/Loading';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
});

// TODO: Remove example data once tests are done.
const initialPatientData: Patient = {
  id: '',
  firstName: 'Zernyu',
  lastName: 'Chou',
  birthDate: '1988-03-01',
  gender: Gender.Male,
  email: 'zernyu@chou.com',
  phone: '+1234567890',
  address: 'Taiwan',
  notes: 'Cool dude',
} as const;

export function PatientCreateScreen({ navigation }: PatientCreateScreenProps): JSX.Element {
  const goBackAndRefresh = useNavigationGoBackAndRefresh(navigation);
  const [patient, setPatient] = useState<Patient>(initialPatientData);

  const [createPatient, { loading, error }] = useMutation<
    MutationCreatePatient,
    MutationCreatePatientArgs
  >(MUTATION_CREATE_PATIENT);

  const handleSavePress = useCallback(async () => {
    if (loading) {
      return;
    }

    const { id, ...restPatient } = patient;
    const newPatient: PatientCreateInput = {
      ...restPatient,
    };

    const { data } = await createPatient({
      variables: {
        patient: newPatient,
      },
    });

    if (data?.createPatient) {
      goBackAndRefresh();
    }
  }, [createPatient, goBackAndRefresh, loading, patient]);

  useNavigationAction('Save', handleSavePress);

  return (
    <View style={styles.root}>
      <Loading visible={loading} overlay />
      <ScrollView>
        <Alert>{error}</Alert>
        <PatientForm style={styles.form} value={patient} onChange={setPatient} />
      </ScrollView>
    </View>
  );
}
