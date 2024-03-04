export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
  // TODO: Improve this section
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
  // TODO: Improve this section
  // TODO: Improve this section
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };

export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  // TODO: Improve this section
  Boolean: boolean;
  Int: number;
  Float: number;
  AccessToken: string;
  // TODO: Improve this section
  // TODO: Improve this section
  /** java.math.BigDecimal */
  BigDecimal: number;
  EmailAddress: string;
  Id: string;
  /** A JSON scalar */
  JSON: unknown;
  JWT: string;
  Latitude: number;
  LocalDate: string;
  LocalDateTime: string;
  /** A IETF BCP 47 language tag */
  Locale: string;
  Longitude: number;
  /** An Float scalar that must be a negative value */
  NegativeFloat: number;
  /** An Int scalar that must be a negative value */
  NegativeInt: number;
  /** An Float scalar that must be greater than or equal to zero */
  NonNegativeFloat: number;
  /** An Int scalar that must be greater than or equal to zero */
  NonNegativeInt: number;
  /** An Float scalar that must be less than or equal to zero */
  NonPositiveFloat: number;
  /** An Int scalar that must be less than or equal to zero */
  NonPositiveInt: number;
  /** An object scalar */
  Object: unknown;
  PhoneNumber: string;
  /** An Float scalar that must be a positive value */
  PositiveFloat: number;
  /** An Int scalar that must be a positive value */
  PositiveInt: number;
  /** An RFC-3339 compliant Full Time Scalar */
  Time: string;
  /** A custom scalar that represents files */
  Upload: unknown;
  /** A Url scalar */
  Url: string;
  ZonedDateTime: string;
  _FieldSet: unknown;
};

export enum AuthType {
  Email = 'EMAIL',
  Google = 'GOOGLE',
}

export type Availability = {
  __typename?: 'Availability';
  authType: Array<Maybe<AuthType>>;
  detectedType?: Maybe<AuthType>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type CheckAvailabilityInput = {
  login: Scalars['String'];
};

export type Clinic = {
  __typename?: 'Clinic';
  address: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Id'];
  name: Scalars['String'];
};

export type ClinicCreateInput = {
  address: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type ClinicPatchInput = {
  address?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ClinicResults = {
  __typename?: 'ClinicResults';
  pagination?: Maybe<Cursor>;
  results: Array<Clinic>;
};

export type ClinicUpdateInput = {
  address: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type ClinicsQueryInput = {
  addresses?: InputMaybe<Array<Scalars['String']>>;
  cursor?: InputMaybe<Scalars['String']>;
  emails?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['Id']>>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  names?: InputMaybe<Array<Scalars['String']>>;
  userIds?: InputMaybe<Array<Scalars['Id']>>;
};

export type Cursor = {
  __typename?: 'Cursor';
  more?: Maybe<Scalars['Boolean']>;
  next?: Maybe<Scalars['String']>;
};

export type Device = {
  __typename?: 'Device';
  appVersion?: Maybe<Scalars['String']>;
  id: Scalars['Id'];
  manufacturer?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  osVersion?: Maybe<Scalars['String']>;
  platform: Platform;
  pushToken?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type DeviceInput = {
  appVersion?: InputMaybe<Scalars['String']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  osVersion?: InputMaybe<Scalars['String']>;
  platform: Platform;
  pushToken?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type DevicesResult = {
  __typename?: 'DevicesResult';
  pagination?: Maybe<Cursor>;
  results: Array<Device>;
};

export enum ErrorDetail {
  /**
   * The deadline expired before the operation could complete.
   *
   * For operations that change the state of the system, this error
   * may be returned even if the operation has completed successfully.
   * For example, a successful response from a server could have been
   * delayed long enough for the deadline to expire.
   *
   * HTTP Mapping: 504 Gateway Timeout
   * Error Type: UNAVAILABLE
   */
  DeadlineExceeded = 'DEADLINE_EXCEEDED',
  /**
   * The server detected that the client is exhibiting a behavior that
   * might be generating excessive load.
   *
   * HTTP Mapping: 429 Too Many Requests or 420 Enhance Your Calm
   * Error Type: UNAVAILABLE
   */
  EnhanceYourCalm = 'ENHANCE_YOUR_CALM',
  /**
   * The requested field is not found in the schema.
   *
   * This differs from `NOT_FOUND` in that `NOT_FOUND` should be used when a
   * query is valid, but is unable to return a result (if, for example, a
   * specific video id doesn't exist). `FIELD_NOT_FOUND` is intended to be
   * returned by the server to signify that the requested field is not known to exist.
   * This may be returned in lieu of failing the entire query.
   * See also `PERMISSION_DENIED` for cases where the
   * requested field is invalid only for the given user or class of users.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: BAD_REQUEST
   */
  FieldNotFound = 'FIELD_NOT_FOUND',
  /**
   * The client specified an invalid argument.
   *
   * Note that this differs from `FAILED_PRECONDITION`.
   * `INVALID_ARGUMENT` indicates arguments that are problematic
   * regardless of the state of the system (e.g., a malformed file name).
   *
   * HTTP Mapping: 400 Bad Request
   * Error Type: BAD_REQUEST
   */
  InvalidArgument = 'INVALID_ARGUMENT',
  /**
   * The provided cursor is not valid.
   *
   * The most common usage for this error is when a client is paginating
   * through a list that uses stateful cursors. In that case, the provided
   * cursor may be expired.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: NOT_FOUND
   */
  InvalidCursor = 'INVALID_CURSOR',
  /**
   * Unable to perform operation because a required resource is missing.
   *
   * Example: Client is attempting to refresh a list, but the specified
   * list is expired. This requires an action by the client to get a new list.
   *
   * If the user is simply trying GET a resource that is not found,
   * use the NOT_FOUND error type. FAILED_PRECONDITION.MISSING_RESOURCE
   * is to be used particularly when the user is performing an operation
   * that requires a particular resource to exist.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   * Error Type: FAILED_PRECONDITION
   */
  MissingResource = 'MISSING_RESOURCE',
  /**
   * Service Error.
   *
   * There is a problem with an upstream service.
   *
   * This may be returned if a gateway receives an unknown error from a service
   * or if a service is unreachable.
   * If a request times out which waiting on a response from a service,
   * `DEADLINE_EXCEEDED` may be returned instead.
   * If a service returns a more specific error Type, the specific error Type may
   * be returned instead.
   *
   * HTTP Mapping: 502 Bad Gateway
   * Error Type: UNAVAILABLE
   */
  ServiceError = 'SERVICE_ERROR',
  /**
   * Request failed due to network errors.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  TcpFailure = 'TCP_FAILURE',
  /**
   * Request throttled based on server concurrency limits.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  ThrottledConcurrency = 'THROTTLED_CONCURRENCY',
  /**
   * Request throttled based on server CPU limits
   *
   * HTTP Mapping: 503 Unavailable.
   * Error Type: UNAVAILABLE
   */
  ThrottledCpu = 'THROTTLED_CPU',
  /**
   * The operation is not implemented or is not currently supported/enabled.
   *
   * HTTP Mapping: 501 Not Implemented
   * Error Type: BAD_REQUEST
   */
  Unimplemented = 'UNIMPLEMENTED',
  /**
   * Unknown error.
   *
   * This error should only be returned when no other error detail applies.
   * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Unknown = 'UNKNOWN',
}

export enum ErrorType {
  /**
   * Bad Request.
   *
   * There is a problem with the request.
   * Retrying the same request is not likely to succeed.
   * An example would be a query or argument that cannot be deserialized.
   *
   * HTTP Mapping: 400 Bad Request
   */
  BadRequest = 'BAD_REQUEST',
  /**
   * The operation was rejected because the system is not in a state
   * required for the operation's execution.  For example, the directory
   * to be deleted is non-empty, an rmdir operation is applied to
   * a non-directory, etc.
   *
   * Service implementers can use the following guidelines to decide
   * between `FAILED_PRECONDITION` and `UNAVAILABLE`:
   *
   * - Use `UNAVAILABLE` if the client can retry just the failing call.
   * - Use `FAILED_PRECONDITION` if the client should not retry until
   * the system state has been explicitly fixed.  E.g., if an "rmdir"
   *      fails because the directory is non-empty, `FAILED_PRECONDITION`
   * should be returned since the client should not retry unless
   * the files are deleted from the directory.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   */
  FailedPrecondition = 'FAILED_PRECONDITION',
  /**
   * Internal error.
   *
   * An unexpected internal error was encountered. This means that some
   * invariants expected by the underlying system have been broken.
   * This error code is reserved for serious errors.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Internal = 'INTERNAL',
  /**
   * The requested entity was not found.
   *
   * This could apply to a resource that has never existed (e.g. bad resource id),
   * or a resource that no longer exists (e.g. cache expired.)
   *
   * Note to server developers: if a request is denied for an entire class
   * of users, such as gradual feature rollout or undocumented allowlist,
   * `NOT_FOUND` may be used. If a request is denied for some users within
   * a class of users, such as user-based access control, `PERMISSION_DENIED`
   * must be used.
   *
   * HTTP Mapping: 404 Not Found
   */
  NotFound = 'NOT_FOUND',
  /**
   * The caller does not have permission to execute the specified
   * operation.
   *
   * `PERMISSION_DENIED` must not be used for rejections
   * caused by exhausting some resource or quota.
   * `PERMISSION_DENIED` must not be used if the caller
   * cannot be identified (use `UNAUTHENTICATED`
   * instead for those errors).
   *
   * This error Type does not imply the
   * request is valid or the requested entity exists or satisfies
   * other pre-conditions.
   *
   * HTTP Mapping: 403 Forbidden
   */
  PermissionDenied = 'PERMISSION_DENIED',
  /**
   * The request does not have valid authentication credentials.
   *
   * This is intended to be returned only for routes that require
   * authentication.
   *
   * HTTP Mapping: 401 Unauthorized
   */
  Unauthenticated = 'UNAUTHENTICATED',
  /**
   * Currently Unavailable.
   *
   * The service is currently unavailable.  This is most likely a
   * transient condition, which can be corrected by retrying with
   * a backoff.
   *
   * HTTP Mapping: 503 Unavailable
   */
  Unavailable = 'UNAVAILABLE',
  /**
   * Unknown error.
   *
   * For example, this error may be returned when
   * an error code received from another address space belongs to
   * an error space that is not known in this address space.  Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   *
   * If a client sees an unknown errorType, it will be interpreted as UNKNOWN.
   * Unknown errors MUST NOT trigger any special behavior. These MAY be treated
   * by an implementation as being equivalent to INTERNAL.
   *
   * When possible, a more specific error should be provided.
   *
   * HTTP Mapping: 520 Unknown Error
   */
  Unknown = 'UNKNOWN',
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type GoogleProfile = {
  __typename?: 'GoogleProfile';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['EmailAddress']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  pictureUrl?: Maybe<Scalars['String']>;
};

export type LensDesign = {
  __typename?: 'LensDesign';
  name: Scalars['String'];
  notes: Scalars['String'];
  serial: Scalars['String'];
};

export type LensDesignCreateInput = {
  name: Scalars['String'];
  notes: Scalars['String'];
  serial: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateWithGoogle?: Maybe<UserAccessToken>;
  authenticateWithLine?: Maybe<UserAccessToken>;
  authenticateWithLogin?: Maybe<UserAccessToken>;
  changeSelfPassword?: Maybe<UserAccessToken>;
  createPatient: Patient;
  createPrescription: Prescription;
  createVisit: Visit;
  loginToClinic?: Maybe<UserAccessToken>;
  logout?: Maybe<Scalars['AccessToken']>;
  patchSelf?: Maybe<UserAccessToken>;
  registerDevice?: Maybe<Scalars['AccessToken']>;
  registerUser?: Maybe<UserAccessToken>;
  resetPassword?: Maybe<Scalars['Boolean']>;
  updateSelf?: Maybe<UserAccessToken>;
  uploadVfs?: Maybe<VirtualFile>;
};

export type MutationAuthenticateWithGoogleArgs = {
  token: Scalars['String'];
};

export type MutationAuthenticateWithLineArgs = {
  token: Scalars['String'];
};

export type MutationAuthenticateWithLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type MutationChangeSelfPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
};

export type MutationCreatePatientArgs = {
  patient: PatientCreateInput;
};

export type MutationCreatePrescriptionArgs = {
  prescription: PrescriptionCreateInput;
};

export type MutationCreateVisitArgs = {
  visit: VisitCreateInput;
};

export type MutationLoginToClinicArgs = {
  clinicId: Scalars['Id'];
};

export type MutationPatchSelfArgs = {
  user?: InputMaybe<SelfPatchInput>;
};

export type MutationRegisterDeviceArgs = {
  request: DeviceInput;
};

export type MutationRegisterUserArgs = {
  user: UserCreateInput;
};

export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MutationUpdateSelfArgs = {
  user?: InputMaybe<SelfUpdateInput>;
};

export type MutationUploadVfsArgs = {
  input: Scalars['Upload'];
  name: Scalars['String'];
};

export type Patient = {
  __typename?: 'Patient';
  address: Scalars['String'];
  birthDate: Scalars['LocalDate'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Gender;
  id: Scalars['Id'];
  lastName: Scalars['String'];
  lastVisit?: Maybe<Visit>;
  notes: Scalars['String'];
  phone: Scalars['String'];
};

export type PatientCreateInput = {
  address: Scalars['String'];
  birthDate: Scalars['LocalDate'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Gender;
  lastName: Scalars['String'];
  notes: Scalars['String'];
  phone: Scalars['String'];
};

export type PatientPatchInput = {
  address?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['LocalDate']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type PatientQueryInput = {
  cursor?: InputMaybe<Scalars['String']>;
  emails?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['Id']>>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type PatientResults = {
  __typename?: 'PatientResults';
  pagination?: Maybe<Cursor>;
  results: Array<Patient>;
};

export type PatientUpdateInput = {
  address: Scalars['String'];
  birthDate: Scalars['LocalDate'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Gender;
  lastName: Scalars['String'];
  notes: Scalars['String'];
  phone: Scalars['String'];
};

export enum Platform {
  Android = 'ANDROID',
  Ios = 'IOS',
  Other = 'OTHER',
  Web = 'WEB',
}

export type Prescription = {
  __typename?: 'Prescription';
  dateCreated: Scalars['LocalDateTime'];
  dateUpdated?: Maybe<Scalars['LocalDateTime']>;
  id: Scalars['Id'];
  lensDesign?: Maybe<LensDesign>;
  notes: Scalars['String'];
  patientId: Scalars['Id'];
  prescription: Scalars['String'];
  product: Scalars['String'];
  userId: Scalars['Id'];
  visitId: Scalars['Id'];
};

export type PrescriptionCreateInput = {
  lensDesign?: InputMaybe<LensDesignCreateInput>;
  notes: Scalars['String'];
  patientId: Scalars['Id'];
  prescription: Scalars['String'];
  product: Scalars['String'];
  visitId: Scalars['Id'];
};

export type PrescriptionPatchInput = {
  lensDesign?: InputMaybe<LensDesignCreateInput>;
  notes?: InputMaybe<Scalars['String']>;
  prescription?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<Scalars['String']>;
};

export type PrescriptionQueryInput = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['Id']>>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  patientIds?: InputMaybe<Array<Scalars['Id']>>;
};

export type PrescriptionResults = {
  __typename?: 'PrescriptionResults';
  pagination?: Maybe<Cursor>;
  results: Array<Prescription>;
};

export type PrescriptionUpdateInput = {
  lensDesign?: InputMaybe<LensDesignCreateInput>;
  notes: Scalars['String'];
  prescription?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _service?: Maybe<Service>;
  checkAuthTypes?: Maybe<Availability>;
  clinics: ClinicResults;
  findUserById?: Maybe<User>;
  findUserByUsername?: Maybe<User>;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  patient?: Maybe<Patient>;
  patients: PatientResults;
  prescription?: Maybe<Prescription>;
  prescriptions: PrescriptionResults;
  self?: Maybe<UserSelf>;
  visit?: Maybe<Visit>;
  visits: VisitResults;
};

export type QueryCheckAuthTypesArgs = {
  token: Scalars['String'];
};

export type QueryClinicsArgs = {
  query?: InputMaybe<ClinicsQueryInput>;
};

export type QueryFindUserByIdArgs = {
  id: Scalars['Id'];
};

export type QueryFindUserByUsernameArgs = {
  username: Scalars['String'];
};

export type QueryForgotPasswordArgs = {
  deeplink?: InputMaybe<Scalars['String']>;
  login: Scalars['String'];
};

export type QueryPatientArgs = {
  id: Scalars['Id'];
};

export type QueryPatientsArgs = {
  query?: InputMaybe<PatientQueryInput>;
};

export type QueryPrescriptionArgs = {
  id: Scalars['Id'];
};

export type QueryPrescriptionsArgs = {
  query?: InputMaybe<PrescriptionQueryInput>;
};

export type QueryVisitArgs = {
  id: Scalars['Id'];
};

export type QueryVisitsArgs = {
  query?: InputMaybe<VisitsQueryInput>;
};

export type Refraction = {
  __typename?: 'Refraction';
  axis: Scalars['String'];
  bcva: Scalars['String'];
  cylinder: Scalars['String'];
  k: Scalars['String'];
  sphere: Scalars['String'];
  ucva: Scalars['String'];
};

export type RefractionCreateInput = {
  axis: Scalars['String'];
  bcva: Scalars['String'];
  cylinder: Scalars['String'];
  k: Scalars['String'];
  sphere: Scalars['String'];
  ucva: Scalars['String'];
};

export type SelfPatchInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type SelfUpdateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
  Natural = 'NATURAL',
}

export type TOTPIdentity = {
  email?: InputMaybe<Scalars['EmailAddress']>;
  phone?: InputMaybe<Scalars['PhoneNumber']>;
};

export type UploadInstructions = {
  __typename?: 'UploadInstructions';
  uploadToken: Scalars['String'];
  url: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  dateCreated: Scalars['LocalDateTime'];
  firstName: Scalars['String'];
  id: Scalars['Id'];
  lastName: Scalars['String'];
};

export type UserAccessToken = {
  __typename?: 'UserAccessToken';
  accessToken?: Maybe<Scalars['AccessToken']>;
  user?: Maybe<UserSelf>;
};

export type UserCreateInput = {
  code?: InputMaybe<Scalars['String']>;
  email: Scalars['EmailAddress'];
  emailConfirmationDeeplink?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  googlePlusToken?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type UserSelf = {
  __typename?: 'UserSelf';
  dateCreated: Scalars['LocalDateTime'];
  dateUpdated: Scalars['LocalDateTime'];
  email: Scalars['EmailAddress'];
  emailVerified: Scalars['Boolean'];
  enabled: Scalars['Boolean'];
  firstName: Scalars['String'];
  googleProfile?: Maybe<GoogleProfile>;
  hasPassword: Scalars['Boolean'];
  id: Scalars['Id'];
  lastName: Scalars['String'];
  nonce: Scalars['Int'];
};

export type VirtualFile = {
  __typename?: 'VirtualFile';
  cdnUrl?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  downloadUrl: Scalars['String'];
  name: Scalars['String'];
  size?: Maybe<Scalars['Int']>;
  uri: Scalars['String'];
};

export type Visit = {
  __typename?: 'Visit';
  actions?: Maybe<Array<Scalars['String']>>;
  attachments?: Maybe<Array<Scalars['String']>>;
  dateCreated: Scalars['LocalDateTime'];
  dateUpdated?: Maybe<Scalars['LocalDateTime']>;
  id: Scalars['Id'];
  notes: Scalars['String'];
  odPrescriptionId?: Maybe<Scalars['Id']>;
  odRefraction?: Maybe<Refraction>;
  odScanFileId?: Maybe<Scalars['String']>;
  osPrescriptionId?: Maybe<Scalars['Id']>;
  osRefraction?: Maybe<Refraction>;
  osScanFileId?: Maybe<Scalars['String']>;
  patientId: Scalars['Id'];
  userId: Scalars['Id'];
};

export type VisitCreateInput = {
  actions?: InputMaybe<Array<Scalars['String']>>;
  attachments?: InputMaybe<Array<Scalars['String']>>;
  notes: Scalars['String'];
  odPrescriptionId?: InputMaybe<Scalars['Id']>;
  odRefraction?: InputMaybe<RefractionCreateInput>;
  odScanFileId?: InputMaybe<Scalars['String']>;
  osPrescriptionId?: InputMaybe<Scalars['Id']>;
  osRefraction?: InputMaybe<RefractionCreateInput>;
  osScanFileId?: InputMaybe<Scalars['String']>;
  patientId: Scalars['Id'];
};

export type VisitPatchInput = {
  actions?: InputMaybe<Array<Scalars['String']>>;
  attachments?: InputMaybe<Array<Scalars['String']>>;
  notes?: InputMaybe<Scalars['String']>;
  odPrescriptionId?: InputMaybe<Scalars['Id']>;
  odRefraction?: InputMaybe<RefractionCreateInput>;
  odScanFileId?: InputMaybe<Scalars['String']>;
  osPrescriptionId?: InputMaybe<Scalars['Id']>;
  osRefraction?: InputMaybe<RefractionCreateInput>;
  osScanFileId?: InputMaybe<Scalars['String']>;
};

export type VisitResults = {
  __typename?: 'VisitResults';
  pagination?: Maybe<Cursor>;
  results: Array<Visit>;
};

export type VisitUpdateInput = {
  actions?: InputMaybe<Array<Scalars['String']>>;
  attachments?: InputMaybe<Array<Scalars['String']>>;
  notes: Scalars['String'];
  odPrescriptionId?: InputMaybe<Scalars['Id']>;
  odRefraction?: InputMaybe<RefractionCreateInput>;
  odScanFileId?: InputMaybe<Scalars['String']>;
  osPrescriptionId?: InputMaybe<Scalars['Id']>;
  osRefraction?: InputMaybe<RefractionCreateInput>;
  osScanFileId?: InputMaybe<Scalars['String']>;
};

export type VisitsQueryInput = {
  cursor?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['Id']>>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  patientIds?: InputMaybe<Array<Scalars['Id']>>;
};

export type Service = {
  __typename?: '_Service';
  sdl: Scalars['String'];
};

/**
 * Query type aliases
 */
export type QueryService = Pick<Query, '_service'>;
export type QueryCheckAuthTypes = Pick<Query, 'checkAuthTypes'>;
export type QueryClinics = Pick<Query, 'clinics'>;
export type QueryFindUserById = Pick<Query, 'findUserById'>;
export type QueryFindUserByUsername = Pick<Query, 'findUserByUsername'>;
export type QueryForgotPassword = Pick<Query, 'forgotPassword'>;
export type QueryPatient = Pick<Query, 'patient'>;
export type QueryPatients = Pick<Query, 'patients'>;
export type QueryPrescription = Pick<Query, 'prescription'>;
export type QueryPrescriptions = Pick<Query, 'prescriptions'>;
export type QuerySelf = Pick<Query, 'self'>;
export type QueryVisit = Pick<Query, 'visit'>;
export type QueryVisits = Pick<Query, 'visits'>;

/**
 * Mutation type aliases
 */
export type MutationAuthenticateWithGoogle = Pick<Mutation, 'authenticateWithGoogle'>;
export type MutationAuthenticateWithLine = Pick<Mutation, 'authenticateWithLine'>;
export type MutationAuthenticateWithLogin = Pick<Mutation, 'authenticateWithLogin'>;
export type MutationChangeSelfPassword = Pick<Mutation, 'changeSelfPassword'>;
export type MutationCreatePatient = Pick<Mutation, 'createPatient'>;
export type MutationCreatePrescription = Pick<Mutation, 'createPrescription'>;
export type MutationCreateVisit = Pick<Mutation, 'createVisit'>;
export type MutationLoginToClinic = Pick<Mutation, 'loginToClinic'>;
export type MutationLogout = Pick<Mutation, 'logout'>;
export type MutationPatchSelf = Pick<Mutation, 'patchSelf'>;
export type MutationRegisterDevice = Pick<Mutation, 'registerDevice'>;
export type MutationRegisterUser = Pick<Mutation, 'registerUser'>;
export type MutationResetPassword = Pick<Mutation, 'resetPassword'>;
export type MutationUpdateSelf = Pick<Mutation, 'updateSelf'>;
export type MutationUploadVfs = Pick<Mutation, 'uploadVfs'>;
