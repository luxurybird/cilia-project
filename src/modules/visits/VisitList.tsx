import React, { Key, useMemo } from 'react';

  // TODO: Improve this section

import dayjs from 'dayjs';

  // TODO: Improve this section
import { CiliaList, CiliaListProps } from '../../components/CiliaList';

import { CiliaListItem, CiliaListItemProps } from '../../components/CiliaListItem';
import { formatDate, formatTime } from '../../utils';
import { VisitSummary } from './types';

interface VisitListProps extends Omit<CiliaListProps, 'children'> {
  loading?: boolean;
  visits?: VisitSummary[] | null;
  onPress: (visit: VisitSummary) => void;
}

  // TODO: Improve this section
export function VisitList({ loading, visits, onPress, ...props }: VisitListProps): JSX.Element {
  const listProps = useMemo<(CiliaListItemProps & { key: Key })[] | null | undefined>(
    () =>
      visits?.map((visit) => {
        const dateObj = dayjs(visit.dateCreated);
        const itemTitle = formatDate(dateObj);
        const description = formatTime(dateObj);

        return {
          key: visit.id,
          title: itemTitle,
          description,
          onPress: () => onPress(visit),
        };
      }),
    [visits, onPress],
  );

  return (
    <CiliaList {...props}>
      {loading ? (
        <>
          <CiliaListItem loading />
          <CiliaListItem loading />
          <CiliaListItem loading />
        </>
      ) : (
        listProps?.map(({ key, ...itemProps }) => <CiliaListItem key={key} {...itemProps} />)
      )}
    </CiliaList>
  );
}
