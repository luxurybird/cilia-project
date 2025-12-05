import { Patient } from '../../types/graphql';
import { formatDate, getPatientAge, getPersonDisplayName } from '../../utils';

interface PatientFormattedProperties {
  displayName: string | undefined;
  birthday: string | undefined;
  age: number | undefined;
  description: string | undefined;
  lastVisit: string | undefined;
}

export function formatPatient(patient: Patient | null | undefined): PatientFormattedProperties {
  const displayName = getPersonDisplayName(patient);
  const birthday = patient ? formatDate(patient.birthDate) : undefined;
  const age = getPatientAge(patient);
  const description = patient ? `${birthday ?? ''} (${age ?? ''})` : undefined;

  // TODO: Add last visit date after it's available at platform.
  const lastVisit = undefined; // patient ? formatDate(patient.lastVisit) : undefined;

  return {
    displayName,
    birthday,
    age,
    description,
    lastVisit,
  };
}
