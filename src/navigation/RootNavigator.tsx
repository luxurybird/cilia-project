import React, { useMemo } from 'react';
import { ImageRequireSource, StyleSheet } from 'react-native';
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
} from '@react-navigation/material-bottom-tabs';

import { colors } from '../styles/colors';
import { CiliaStatusBar } from '../modules/layout/CiliaStatusBar';
import { LoginScreen } from '../modules/auth/LoginScreen';
import { PatientsRoot } from '../modules/patients/PatientsRoot';
import { TasksRoot } from '../modules/tasks/TasksRoot';
import { SettingsRoot } from '../modules/settings/SettingsRoot';
import patientsIcon from '../assets/images/icon-patients.png';
import tasksIcon from '../assets/images/icon-tasks.png';
import settingsIcon from '../assets/images/icon-settings.png';
import { CiliaIcon } from '../components/CiliaIcon';
import { useAuthenticatedUser } from '../modules/core/redux/userHooks';
import { useBooleanState } from '../hooks/useBooleanState';
import { useIncompleteVisitsBadge } from '../modules/visits/useIncompleteVisitsBadge';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#fdfdfd',
  },
});

const Tab = createMaterialBottomTabNavigator();

function createTabBarOptions(icon: ImageRequireSource): MaterialBottomTabNavigationOptions {
  return {
    tabBarIcon: ({ color }) => <CiliaIcon source={icon} color={color} />,
  };
}

export function RootNavigator(): JSX.Element {
  const [loggingIn, startLoginFlow, endLoginFlow] = useBooleanState(false);
  const [isLoggedIn] = useAuthenticatedUser();
  const incompleteVisits = useIncompleteVisitsBadge();

  const patientsOptions = useMemo(() => createTabBarOptions(patientsIcon), []);
  const tasksOptions = useMemo(
    () => ({
      ...createTabBarOptions(tasksIcon),
      tabBarBadge: incompleteVisits,
    }),
    [incompleteVisits],
  );
  const settingsOptions = useMemo(() => createTabBarOptions(settingsIcon), []);

  if (!isLoggedIn || loggingIn) {
    return <LoginScreen onSubmitBegin={startLoginFlow} onSubmitEnd={endLoginFlow} />;
  }

  return (
    <>
      <CiliaStatusBar mode="default" />
      <Tab.Navigator
        labeled={false}
        barStyle={styles.bar}
        activeColor={colors.primary}
        inactiveColor={colors.grey}
      >
        <Tab.Screen name="Patients" options={patientsOptions} component={PatientsRoot} />
        <Tab.Screen name="Tasks" options={tasksOptions} component={TasksRoot} />
        <Tab.Screen name="Settings" options={settingsOptions} component={SettingsRoot} />
      </Tab.Navigator>
    </>
  );
}
