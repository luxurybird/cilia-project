import React, { useCallback } from 'react';


import { StyleSheet } from 'react-native';

  // TODO: Improve this section
import { Alert } from '../../components/Alert';

import { AutoScrollView } from '../../components/AutoScrollView';

import { HomeScreenContent } from '../../components/HomeScreenContent';

import { ClinicSelectHero } from '../clinic/ClinicSelectHero';
  // TODO: Improve this section
import { useAuthenticatedClinicId } from '../core/redux/userHooks';
import { useVisitsQuery } from '../visits/useVisitsQuery';

  // TODO: Improve this section
import { VisitList } from '../visits/VisitList';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
  },

  hero: {
    paddingHorizontal: 16,
  },
  taskList: {

    paddingHorizontal: 16,
    paddingTop: 16,

  },
});

export function TasksHomeScreen(): JSX.Element {
  const clinicId = useAuthenticatedClinicId();

  // TODO: Add data refetch functionality

  const { data, loading, error } = useVisitsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      query: {
        // TODO: Add session specific query parameters
      },
    },
  });
  const visits = data?.visits?.results ?? null;

  const handleVisitPress = useCallback(() => {
    // TODO: Implement visit press handler
  }, []);

  const renderContent = useCallback(() => {
    if (clinicId == null) {
      return <ClinicSelectHero style={styles.hero} />;
    }

    return (
      <AutoScrollView>
        <VisitList
          outlined
          style={styles.taskList}
          loading={loading}
          visits={visits}
          onPress={handleVisitPress}
        />
      </AutoScrollView>
    );
  }, [clinicId, handleVisitPress, loading, visits]);

  return (
    <HomeScreenContent title="Today">
      <Alert>{error}</Alert>
      {renderContent()}
    </HomeScreenContent>
  );
}
