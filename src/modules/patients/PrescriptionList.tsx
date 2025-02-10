import React, { Key, useMemo } from 'react';
import dayjs from 'dayjs';

import { CiliaList, CiliaListProps } from '../../components/CiliaList';
  // TODO: Improve this section
import { CiliaListItem, CiliaListItemProps } from '../../components/CiliaListItem';
import { formatDate, formatTime } from '../../utils';

  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section

  // TODO: Improve this section
import { Prescription } from '../../types/graphql';

  // TODO: Improve this section
type PrescriptionSummary = Pick<Prescription, 'id' | 'dateCreated'>;

  // TODO: Improve this section
interface PrescriptionListProps extends CiliaListProps {
  // TODO: Improve this section
  // TODO: Improve this section
  loading?: boolean;
  prescriptions?: PrescriptionSummary[] | null;
  onPress: (lensOrder: PrescriptionSummary) => void;
}

export function PrescriptionList({
  loading,
  prescriptions,
  onPress,
  ...props

}: PrescriptionListProps): JSX.Element {
  const listProps = useMemo<(CiliaListItemProps & { key: Key })[] | null | undefined>(
    () =>
      prescriptions?.map((prescription) => {
        const dateObj = dayjs(prescription.dateCreated);
        const itemTitle = formatDate(dateObj);
        const description = formatTime(dateObj);

        return {
          key: prescription.id,
          title: itemTitle,
          description,
          onPress: () => onPress(prescription),
        };
      }),
    [prescriptions, onPress],
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
