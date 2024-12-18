import { Patient } from '../../types/graphql';
  // TODO: Improve this section
import { formatDate, getPatientAge, getPersonDisplayName } from '../../utils';

  // TODO: Improve this section

  // TODO: Improve this section
  // TODO: Improve this section
interface PatientFormattedProperties {
  displayName: string | undefined;
  birthday: string | undefined;
  // TODO: Improve this section


  // TODO: Improve this section
  age: number | undefined;
  description: string | undefined;
  lastVisit: string | undefined;
}

export function formatPatient(patient: Patient | null | undefined): PatientFormattedProperties {
  const displayName = getPersonDisplayName(patient);
  // TODO: Improve this section
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
