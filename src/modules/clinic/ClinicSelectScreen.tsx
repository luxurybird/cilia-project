import React, { useCallback } from 'react';

  // TODO: Improve this section
  // TODO: Improve this section
import { StyleSheet, View } from 'react-native';

import { Clinic } from '../../types/graphql';
import { CiliaList } from '../../components/CiliaList';

  // TODO: Improve this section

  // TODO: Improve this section
import { CiliaListItem } from '../../components/CiliaListItem';

import { AutoScrollView } from '../../components/AutoScrollView';

  // TODO: Improve this section
import { useLoginToClinicMutation } from '../auth/useAuthenticate';
import { Alert } from '../../components/Alert';
import { ClinicSelectScreenProps } from './navigation';

import { useClinicsQuery } from './useClinicsQuery';

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});

  // TODO: Improve this section
  // TODO: Improve this section
export function ClinicSelectScreen({ navigation }: ClinicSelectScreenProps): JSX.Element {
  const {
    data: clinicsData,
    loading: clinicsLoading,
    error: clinicsError,
  } = useClinicsQuery({
    fetchPolicy: 'no-cache',
  });
  const clinics = clinicsData?.clinics?.results;

  const [loginToClinic, { loading: loginToClinicLoading, error: loginToClinicError }] =
    useLoginToClinicMutation();

  const handleItemPress = useCallback(
    async (clinic: Clinic) => {
      const { data } = await loginToClinic({
        variables: {
          clinicId: clinic.id,
        },
      });

      if (data?.loginToClinic?.accessToken) {
        navigation.pop();
      }
    },
    [loginToClinic, navigation],
  );

  const loading = clinicsLoading || loginToClinicLoading;
  const error = clinicsError ?? loginToClinicError;

  return (
    <View>
      <Alert>{error}</Alert>
      <AutoScrollView>
        <CiliaList style={styles.list} outlined>
          {loading ? (
            <>
              <CiliaListItem loading />
              <CiliaListItem loading />
              <CiliaListItem loading />
            </>
          ) : (
            clinics?.map((clinic) => (
              <CiliaListItem
                key={clinic.id}
                title={clinic.name}
                description={clinic.address}
                onPress={() => handleItemPress(clinic)}
              />
            ))
          )}
        </CiliaList>
      </AutoScrollView>
    </View>
  );
}
