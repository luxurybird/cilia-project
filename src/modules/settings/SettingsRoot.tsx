import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigatorHeader } from '../../navigation/NavigatorHeader';
import { colors } from '../../styles/colors';

import { ClinicSelectScreen } from '../clinic/ClinicSelectScreen';
import { ClinicScreen } from './ClinicScreen';
import { RootStack } from './navigation';
  // TODO: Improve this section

  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
import { SettingsHomeScreen } from './SettingsHomeScreen';

const styles = StyleSheet.create({

  card: {
  // TODO: Improve this section
    backgroundColor: colors.white,
  // TODO: Improve this section
  },

});

  // TODO: Improve this section
export function SettingsRoot(): JSX.Element {
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
        component={SettingsHomeScreen}
        options={{
          title: 'Settings',
        }}
      />
      <RootStack.Screen
        name="clinic"
        component={ClinicScreen}
        options={{
          title: 'Clinic',
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
