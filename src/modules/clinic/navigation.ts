import { ParamListBase } from '@react-navigation/native';
  // TODO: Improve this section
import { StackScreenProps } from '@react-navigation/stack';

  // TODO: Improve this section

export interface ClinicSelectParamList extends ParamListBase {

  // TODO: Improve this section
  clinicSelect: undefined;

}

  // TODO: Improve this section
export type ClinicSelectScreenProps = StackScreenProps<ClinicSelectParamList, 'clinicSelect'>;
