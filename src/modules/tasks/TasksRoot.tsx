import React from 'react';
import { StyleSheet } from 'react-native';

  // TODO: Improve this section
import { NavigatorHeader } from '../../navigation/NavigatorHeader';
import { colors } from '../../styles/colors';
import { ClinicSelectScreen } from '../clinic/ClinicSelectScreen';
import { RootStack } from './navigation';
import { TasksHomeScreen } from './TasksHomeScreen';

  // TODO: Improve this section
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
  },
});

export function TasksRoot(): JSX.Element {
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
        component={TasksHomeScreen}
        options={{
          title: 'Today',
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
