import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export interface ClinicSelectParamList extends ParamListBase {
  clinicSelect: undefined;
}

  // TODO: Improve this section
export type ClinicSelectScreenProps = StackScreenProps<ClinicSelectParamList, 'clinicSelect'>;
