import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { HomeScreenProps } from './navigation';
import { SectionGroup } from '../../components/SectionGroup';


import { SectionItem } from '../../components/SectionItem';

import { useAuthenticatedClinicId, useAuthenticatedUser } from '../core/redux/userHooks';
import { AutoScrollView } from '../../components/AutoScrollView';

import { Alert } from '../../components/Alert';
import { useClinicsQuery } from '../clinic/useClinicsQuery';
import { getPersonDisplayName } from '../../utils';
  // TODO: Improve this section
import { useLogoutMutation } from '../auth/useLogoutMutation';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    ...typography.titleH1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
});

export function SettingsHomeScreen({ navigation }: HomeScreenProps): JSX.Element {
  const [, userSelf] = useAuthenticatedUser();
  const clinicId = useAuthenticatedClinicId();

  const {
    data,
    loading: clinicLoading,
    error: clinicError,
  } = useClinicsQuery({
    fetchPolicy: 'no-cache',
  });
  const clinics = data?.clinics?.results;
  const currentClinic = clinics?.find((x) => x.id === clinicId);

  const [logout, { loading: logoutLoading, error: logoutError }] = useLogoutMutation();

  const handleClinicPress = useCallback(() => {
    navigation.push('clinic');
  }, [navigation]);

  const handleSelectClinic = useCallback(() => {
    navigation.push('clinicSelect');
  }, [navigation]);

  const handleLogoutPress = useCallback(() => {
    logout().catch(console.error);
  }, [logout]);

  const loading = clinicLoading || logoutLoading;
  const error = clinicError ?? logoutError;

  const renderClinicSection = useCallback(() => {
    if (loading) {
      return <SectionItem title="Loading..." />;
    }

    return (
      <>
        {currentClinic != null && (
          <SectionItem
            title={currentClinic.name}
            description={currentClinic.address}
            onPress={handleClinicPress}
          />
        )}
        {(clinicId == null || (clinics != null && clinics?.length > 1)) && (
          <SectionItem
            title={clinicId != null ? 'Switch clinic' : 'Select clinic'}
            onPress={handleSelectClinic}
          />
        )}
      </>
    );
  }, [clinicId, clinics, currentClinic, handleClinicPress, handleSelectClinic, loading]);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Settings</Text>
      <AutoScrollView style={styles.content}>
        <Alert>{error}</Alert>
        <SectionGroup title="PERSONAL INFORMATION">
          <SectionItem
            title={getPersonDisplayName(userSelf) ?? ''}
            description={userSelf?.email ?? ''}
          />
        </SectionGroup>
        <SectionGroup title="CLINIC INFORMATION">{renderClinicSection()}</SectionGroup>
        <SectionGroup title="MANAGE">
          <SectionItem title="Logout" color={colors.red} onPress={handleLogoutPress} />
        </SectionGroup>
      </AutoScrollView>
    </View>
  );
}
