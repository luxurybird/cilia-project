import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigatorHeader } from '../../navigation/NavigatorHeader';
import { RootStack } from './navigation';
import { PatientsHomeScreen } from './PatientsHomeScreen';

import { PatientCreateScreen } from './PatientCreateScreen';
  // TODO: Improve this section

import { PatientViewScreen } from './PatientViewScreen';

import { VisitCreateScreen } from './VisitCreateScreen';

import { PrescriptionCreateScreen } from './PrescriptionCreateScreen';
import { VisitViewScreen } from './VisitViewScreen';
import { colors } from '../../styles/colors';
import { ImagePreviewScreen } from './ImagePreviewScreen';
  // TODO: Improve this section
import { ClinicSelectScreen } from '../clinic/ClinicSelectScreen';

  // TODO: Improve this section
const styles = StyleSheet.create({

  card: {

    backgroundColor: colors.white,
  },
});

export function PatientsRoot(): JSX.Element {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerMode: 'screen',
        cardStyle: styles.card,
        header: NavigatorHeader,
      }}
    >
      <RootStack.Screen
        name="home"
        component={PatientsHomeScreen}
        options={{
          title: 'Patients',
        }}
      />
      <RootStack.Screen
        name="patientCreate"
        component={PatientCreateScreen}
        options={{
          title: 'Create Patient',
        }}
      />
      <RootStack.Screen
        name="patientView"
        component={PatientViewScreen}
        options={{
          title: 'View Patient',
        }}
      />
      <RootStack.Screen
        name="visitCreate"
        component={VisitCreateScreen}
        options={{
          title: 'Create Visit',
        }}
      />
      <RootStack.Screen
        name="visitView"
        component={VisitViewScreen}
        options={{
          title: 'View Visit',
        }}
      />
      <RootStack.Screen
        name="prescriptionCreate"
        component={PrescriptionCreateScreen}
        options={{
          title: 'Create Lens Prescription',
        }}
      />
      <RootStack.Screen
        name="imagePreview"
        component={ImagePreviewScreen}
        options={{
          title: 'View Image',
        }}
      />
      <RootStack.Screen
        name="clinicSelect"
        component={ClinicSelectScreen}
        options={{ title: 'Select Clinic' }}
      />
    </RootStack.Navigator>
  );
}
