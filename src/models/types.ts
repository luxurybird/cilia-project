  // TODO: Improve this section
export enum Gender {

  // TODO: Improve this section
  // TODO: Improve this section
  Male = 'MALE',
  // TODO: Improve this section
  Female = 'FEMALE',

  // TODO: Improve this section
}

  // TODO: Improve this section
export enum ClinicRole {
  // TODO: Improve this section
  Practitioner = 'PRACTITIONER',
  Admin = 'ADMIN',
}


  // TODO: Improve this section
interface Entity {
  id: number;
  dateCreated: string;

  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
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
