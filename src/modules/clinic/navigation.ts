import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export interface ClinicSelectParamList extends ParamListBase {
  clinicSelect: undefined;
}

export type ClinicSelectScreenProps = StackScreenProps<ClinicSelectParamList, 'clinicSelect'>;
