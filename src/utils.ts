import React from 'react';
import { ApolloError } from '@apollo/client';

import dayjs from 'dayjs';

import { Patient, UserSelf } from './types/graphql';

export type ReactComponentPropType<T> = T extends React.ComponentClass<infer P> ? P : never;

export type SelectivePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type SelectiveRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

function isValidDateInput(date: dayjs.Dayjs | Date | string | number | null | undefined): boolean {
  return date != null && (typeof date !== 'string' || date.length !== 0);
}

export function clamp(value: number, minValue: number, maxValue: number): number {
  return Math.min(Math.max(value, minValue), maxValue);
}

export function formatISODate(
  date: dayjs.Dayjs | Date | string | number | null | undefined,
): string {
  if (isValidDateInput(date)) {
    const dateObj = dayjs(date);
    if (dateObj.isValid()) {
      return dateObj.format('YYYY-MM-DD');
    }
  }

  return '';
}

export function formatDate(date: dayjs.Dayjs | Date | string | number): string {
  if (isValidDateInput(date)) {
    const dateObj = dayjs(date);
    if (dateObj.isValid()) {
      return dateObj.format('YYYY MMMM DD');
    }
  }

  return '';
}

export function formatShortDate(date: dayjs.Dayjs | Date | string | number): string {
  if (isValidDateInput(date)) {
    const dateObj = dayjs(date);
    if (dateObj.isValid()) {
      return dateObj.format('MMM DD');
    }
  }

  return '';
}

export function formatTime(date: dayjs.Dayjs | Date | string | number): string {
  if (isValidDateInput(date)) {
    const dateObj = dayjs(date);
    if (dateObj.isValid()) {
      return dateObj.format('HH:mm');
    }
  }

  return '';
}

export function getPersonDisplayName(
  person: Patient | UserSelf | null | undefined,
): string | undefined {
  if (person == null) {
    return undefined;
  }

  let result = person.lastName;

  if (person.firstName) {
    result += (result ? ', ' : '') + person.firstName;
  }

  return result;
}

export function getPatientAge(patient: Patient | null | undefined): number | undefined {
  if (patient == null) {
    return undefined;
  }

  const birthDate = dayjs(patient.birthDate);
  return birthDate.isValid() ? dayjs().diff(birthDate, 'year') : undefined;
}

export function getErrorString(
  value: ApolloError | Error | string | null | undefined,
): string | undefined {
  if (value == null) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (value instanceof Error) {
    return value.message;
  }

  return JSON.stringify(value, null, 2);
}
