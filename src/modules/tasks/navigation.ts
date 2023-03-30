  // TODO: Improve this section
import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ClinicSelectParamList } from '../clinic/navigation';

interface RootStackParamList extends ParamListBase, ClinicSelectParamList {
  home: undefined;
}

export const RootStack = createStackNavigator<RootStackParamList>();
