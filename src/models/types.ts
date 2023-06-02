export enum Gender {

  // TODO: Improve this section
  Male = 'MALE',
  // TODO: Improve this section
  Female = 'FEMALE',
}

export enum ClinicRole {
  Practitioner = 'PRACTITIONER',
  Admin = 'ADMIN',
}

interface Entity {
  id: number;
  dateCreated: string;
  dateUpdated: string;
}

export interface ClinicUser extends Entity {
  name: string;
  username: string;
  displayName: string;
  emailAddress: string;
  passwordHash: string;
  roles: ClinicRole[];
  enabled: boolean;
}
