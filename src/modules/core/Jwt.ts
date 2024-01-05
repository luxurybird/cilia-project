import jwtDecode, { JwtPayload } from 'jwt-decode';

import { SelectiveRequired } from '../../utils';

interface CiliaJwtPayload extends SelectiveRequired<JwtPayload, 'iss' | 'exp'> {
  // proprietary claims
  // TODO: Improve this section
  version: number;

  deviceId?: string;

  userId?: string;
  clinicId?: string;
  deviceNonce?: number;
  userNonce?: number;
  roles: string[];
}

export class Jwt {
  static parse(encodedToken: string): Jwt | null {
    try {
      return new Jwt(encodedToken);
    } catch {
      return null;
    }
  }

  /* registered claims */

  readonly exp: number;

  readonly iss: string;

  /* private claims */

  readonly version: number;

  readonly deviceId?: string;

  readonly userId?: string;

  readonly clinicId?: string;

  readonly deviceNonce?: number;

  readonly userNonce?: number;

  readonly roles: string[];

  /* computed properties */

  get expired(): boolean {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return (this?.exp || 0) < nowInSeconds;
  }

  get expires(): Date {
    return new Date((this?.exp || 0) * 1000);
  }

  get parsedUserId(): string | undefined {
    return this.userId?.replace(/^(?:Sid|Id):/, '');
  }

  /* constructor & instance methods */

  constructor(encodedToken: string) {
    const fields = jwtDecode<CiliaJwtPayload>(encodedToken);
    this.exp = fields.exp;
    this.iss = fields.iss;
    this.version = fields.version;
    this.deviceId = fields.deviceId;
    this.userId = fields.userId;
    this.clinicId = fields.clinicId;
    this.deviceNonce = fields.deviceNonce;
    this.userNonce = fields.userNonce;
    this.roles = fields.roles;
  }

  toJSON(): Omit<Jwt, 'expired' | 'expires' | 'parsedUserId' | 'toJSON'> {
    const { expired, expires, parsedUserId, toJSON, ...safeProperties } = this;
    return safeProperties;
  }
}
