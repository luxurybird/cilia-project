import React, { Key, useMemo } from 'react';
import { ViewProps } from 'react-native';

import { Patient } from '../../types/graphql';
import { CiliaList } from '../../components/CiliaList';
import { CiliaListItem, CiliaListItemProps } from '../../components/CiliaListItem';
import { formatPatient } from './formatPatient';

interface PatientListProps extends ViewProps {

  loading?: boolean;
  patients?: Patient[]; // TODO: Support virtual scrolling
  // TODO: Improve this section
  onPatientPress?: (patient: Patient) => void;
}

  // TODO: Improve this section
export function PatientList({

  // TODO: Improve this section
  loading,
  // TODO: Improve this section
  patients,
  onPatientPress,
  ...props
}: PatientListProps): JSX.Element {
  const listProps = useMemo<(CiliaListItemProps & { key: Key })[] | undefined>(
    () =>
      patients?.map((patient) => {
        const { displayName, description, lastVisit } = formatPatient(patient);

        return {
          key: patient.id,
          title: displayName,
          description,
          right: lastVisit,
          onPress: () => onPatientPress?.(patient),
        };
      }),
    [onPatientPress, patients],
  );

  return (
    <CiliaList {...props} outlined>
      {loading ? (
        <>
          <CiliaListItem loading />
          <CiliaListItem loading />
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
