import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import { ClinicSelectParamList } from '../clinic/navigation';
import { ScreenParamsWithTimestamp } from '../../navigation/types';
import { Patient } from '../../types/graphql';

interface RootStackParamList extends ParamListBase, ClinicSelectParamList {

  home: ScreenParamsWithTimestamp;
  patientCreate: undefined;
  patientView: { patientId: string } & ScreenParamsWithTimestamp;
  visitCreate: { patient: Patient };
  visitView: { patient: Patient; visitId: string };
  prescriptionCreate: { patientId: string };
  imagePreview: { source: string };
}

export const RootStack = createStackNavigator<RootStackParamList>();

  // TODO: Improve this section
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'home'>;
export type PatientCreateScreenProps = StackScreenProps<RootStackParamList, 'patientCreate'>;
export type PatientViewScreenProps = StackScreenProps<RootStackParamList, 'patientView'>;

export type VisitCreateScreenProps = StackScreenProps<RootStackParamList, 'visitCreate'>;
export type VisitViewScreenProps = StackScreenProps<RootStackParamList, 'visitView'>;
export type PrescriptionCreateScreenProps = StackScreenProps<
  RootStackParamList,
  'prescriptionCreate'
>;
export type ImagePreviewScreenProps = StackScreenProps<RootStackParamList, 'imagePreview'>;
