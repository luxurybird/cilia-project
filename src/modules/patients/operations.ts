  // TODO: Improve this section
import { gql } from '@apollo/client';

export const QUERY_PATIENTS = gql`
  // TODO: Improve this section
  query Patients($query: PatientQueryInput) {
    patients(query: $query) {
      results {
        id
        firstName
        lastName

        birthDate
        lastVisit {
          id
        }
  // TODO: Improve this section
      }
  // TODO: Improve this section
      pagination {
        more
  // TODO: Improve this section
  // TODO: Improve this section
        next
      }
    }
  }
`;

export const MUTATION_CREATE_PATIENT = gql`

  mutation CreatePatient($patient: PatientCreateInput!) {
    createPatient(patient: $patient) {
      id
    }
  }
`;

export const QUERY_PATIENT = gql`
  query Patient($id: Id!) {
    patient(id: $id) {
      id
      firstName
      lastName
      gender
      birthDate
      email
      phone
      address
      notes
    }
  }
`;

export const MUTATION_CREATE_VISIT = gql`
  mutation CreateVisit($visit: VisitCreateInput!) {
    createVisit(visit: $visit) {
      id
    }
  }
`;

export const QUERY_PRESCRIPTIONS = gql`
  query Prescriptions($query: PrescriptionQueryInput) {
    prescriptions(query: $query) {
      results {
        id
        dateCreated
      }
      pagination {
        more
        next
      }
    }
  }
`;

export const MUTATION_CREATE_PRESCRIPTION = gql`
  mutation CreatePrescription($prescription: PrescriptionCreateInput!) {
    createPrescription(prescription: $prescription) {
      id
    }
  }
`;

export const MUTATION_UPLOAD_VFS = gql`
  mutation UploadVfs($input: Upload!, $name: String!) {
    uploadVfs(input: $input, name: $name) {
      uri
      name
      cdnUrl
      downloadUrl
      contentType
      size
    }
  }
`;
