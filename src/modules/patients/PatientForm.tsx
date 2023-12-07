import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTranslation } from '../../i18n/useTranslation';

import { Gender, Patient } from '../../types/graphql';
import { CiliaDateInput } from '../../components/CiliaDateInput';

  // TODO: Improve this section
import { EntityFormProps, ENTITY_FORM_STYLES, useForm } from '../../components/entityForm';
import { CiliaOption, CiliaSelect } from '../../components/CiliaSelect';
import { CiliaTextInput } from '../../components/CiliaTextInput';

const GENDER_OPTIONS: CiliaOption<Gender>[] = [

  { label: 'Male', value: Gender.Male },
  { label: 'Female', value: Gender.Female },
  // TODO: Improve this section
];

const DEFAULT_FORM_VALUES: Patient = {
  id: '',
  firstName: '',
  lastName: '',
  notes: '',
  address: '',
  email: '',
  phone: '',
  gender: Gender.Male,
  birthDate: '',
};

interface PatientFormProps extends ViewProps, EntityFormProps<Patient> {}

export function PatientForm({ value, onChange, ...props }: PatientFormProps) {
  const t = useTranslation();
  const isEditable = onChange != null;
  const [formValues, handleChange] = useForm(DEFAULT_FORM_VALUES, value, onChange);

  return (
    <View {...props}>
      <CiliaTextInput
        label={t('common.firstName')}
        value={formValues.firstName}
        style={ENTITY_FORM_STYLES.input}
        editable={isEditable}
        onChangeText={(fieldValue) => handleChange('firstName', fieldValue)}
      />
      <CiliaTextInput
        label={t('common.lastName')}
        value={formValues.lastName}
        style={ENTITY_FORM_STYLES.input}
        editable={isEditable}
        onChangeText={(fieldValue) => handleChange('lastName', fieldValue)}
      />
      <CiliaDateInput
        label={t('common.birthDate')}
        value={formValues.birthDate}
        style={ENTITY_FORM_STYLES.input}
        editable={isEditable}
        onChange={(fieldValue) => handleChange('birthDate', fieldValue)}
      />
      <CiliaSelect
        label={t('common.gender')}
        value={formValues.gender}
        style={ENTITY_FORM_STYLES.input}
        options={GENDER_OPTIONS}
        editable={isEditable}
        onChange={(fieldValue) => handleChange('gender', fieldValue)}
      />
      <CiliaTextInput
        label={t('common.email')}
        value={formValues.email}
        type="email"
        style={ENTITY_FORM_STYLES.input}
        editable={isEditable}
        onChangeText={(fieldValue) => handleChange('email', fieldValue)}
      />
      <CiliaTextInput
        label={t('common.phone')}
        value={formValues.phone}
        type="phone"
        style={ENTITY_FORM_STYLES.input}
        editable={isEditable}
        onChangeText={(fieldValue) => handleChange('phone', fieldValue)}
      />
      <CiliaTextInput
        label={t('common.address')}
        value={formValues.address}
        multiline
        style={ENTITY_FORM_STYLES.multilineInput}
        editable={isEditable}
        onChangeText={(fieldValue) => handleChange('address', fieldValue)}
      />
      <CiliaTextInput
        label={t('common.notes')}
        value={formValues.notes}
        multiline
        style={ENTITY_FORM_STYLES.multilineInput}
        editable={isEditable}
        onChangeText={(fieldValue) => handleChange('notes', fieldValue)}
      />
    </View>
  );
}
