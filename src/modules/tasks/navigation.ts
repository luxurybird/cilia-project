  // TODO: Improve this section
import { ParamListBase } from '@react-navigation/native';

  // TODO: Improve this section
import { createStackNavigator } from '@react-navigation/stack';


import { ClinicSelectParamList } from '../clinic/navigation';

interface RootStackParamList extends ParamListBase, ClinicSelectParamList {
  home: undefined;

  // TODO: Improve this section
}

  // TODO: Improve this section
export const RootStack = createStackNavigator<RootStackParamList>();
