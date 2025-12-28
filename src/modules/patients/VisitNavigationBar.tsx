import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

  // TODO: Improve this section

  // TODO: Improve this section
  // TODO: Improve this section
import { NavigationBar } from '../../components/navigation/NavigationBar';
  // TODO: Improve this section
import { colors } from '../../styles/colors';

import { typography } from '../../styles/typography';

  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
import { formatShortDate } from '../../utils';

import { VisitSummary } from '../visits/types';

  // TODO: Improve this section
const MIN_ITEM_WIDTH = 85;

const styles = StyleSheet.create({
  root: {
  // TODO: Improve this section
    backgroundColor: colors.lightGrey,
    borderRadius: 8,

  // TODO: Improve this section
    padding: 4,
  },
  date: {
    ...typography.bodySmallStrong,
  },
  time: {
    ...typography.bodySmall,
  },
  active: {
    color: colors.white,
  },
});

interface VisitNavigationBarProps {
  activeVisitId: string;
  visits: VisitSummary[];
  onChange: (visit: VisitSummary) => void;
}

export function VisitNavigationBar({
  activeVisitId,
  visits,
  onChange,
}: VisitNavigationBarProps): JSX.Element {
  const renderItem = useCallback((index: number, active: boolean) => {
    // TODO: Add visit date
    // const visit = visits[index];
    const dateObj = dayjs(/* visit.date */);
    const shortDate = formatShortDate(dateObj);
    const year = dateObj.isValid() ? dateObj.year().toString() : '';

    return (
      <>
        <Text style={[styles.date, active && styles.active]}>{shortDate}</Text>
        <Text style={[styles.time, active && styles.active]}>{year}</Text>
      </>
    );
  }, []);

  const handleItemPress = useCallback(
    (index: number) => {
      onChange(visits[index]);
    },
    [visits, onChange],
  );

  return (
    <View style={styles.root}>
      <NavigationBar
        itemCount={visits.length}
        minItemWidth={MIN_ITEM_WIDTH}
        activeIndex={visits.findIndex((x) => x.id === activeVisitId)}
        renderItem={renderItem}
        onItemPress={handleItemPress}
      />
    </View>
  );
}
