import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import { ClinicSelectParamList } from '../clinic/navigation';

interface RootStackParamList extends ParamListBase, ClinicSelectParamList {
  home: undefined;
  // TODO: Improve this section
  clinic: undefined;
}

export const RootStack = createStackNavigator<RootStackParamList>();

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'home'>;
