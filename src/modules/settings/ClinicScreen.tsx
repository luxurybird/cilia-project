import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { ConfirmDialog } from '../../components/ConfirmDialog';

import { ClinicRole, ClinicUser } from '../../models/types';
import { SectionGroup } from '../../components/SectionGroup';
import { SectionItem } from '../../components/SectionItem';
import { UserActions, UserActionType } from './UserActions';
import { useAuthenticatedClinicId } from '../core/redux/userHooks';
import { useClinicsQuery } from '../clinic/useClinicsQuery';
import { Alert } from '../../components/Alert';

const MOCK_CLINIC_USER: Omit<ClinicUser, 'id'> = {
  dateCreated: '',
  dateUpdated: '',
  name: 'Zernyu',
  username: 'zernyu',
  displayName: 'Zernyu',

  emailAddress: 'zernyu@eebzlabs.com',
  passwordHash: '-',
  roles: [ClinicRole.Practitioner],
  enabled: true,
};

const USER_LIST = Array(5)
  .fill(0)
  .map<ClinicUser>((_, index) => ({
    ...MOCK_CLINIC_USER,
    id: index + 1,
    roles: index === 0 ? [ClinicRole.Admin] : MOCK_CLINIC_USER.roles,
  }));

function formatUserDescription(user: ClinicUser): string {
  let description = user.emailAddress;

  if (user.roles.includes(ClinicRole.Admin)) {
    description += ' (Admin)';
  }

  return description;
}

interface UserActionState {
  action: UserActionType;
  user: ClinicUser;
  finish: () => void;
}

export function ClinicScreen(): JSX.Element {
  const clinicId = useAuthenticatedClinicId();
  const [userAction, setUserAction] = useState<UserActionState | null>(null);

  const { data, loading, error } = useClinicsQuery({
    fetchPolicy: 'no-cache',
    skip: clinicId == null,
    variables: {
      query: {
        ids: [clinicId ?? ''],
      },
    },
  });
  const clinic = data?.clinics?.results?.[0] ?? null;

  const userActionDialogText = useMemo(() => {
    if (!userAction) {
      return null;
    }

    // TODO: Convert this switch case to an object-literal declaration
    switch (userAction.action) {
      case UserActionType.SetAdmin:
        return `Are you sure that you want to make as administrator ${userAction.user.displayName}?`;

      case UserActionType.Delete:
        return `Are you sure that you want to delete ${userAction.user.displayName}?`;

      default:
        throw new Error('Unsupported action type');
    }
  }, [userAction]);

  const handleUserActionPress = useCallback(
    (action: UserActionType, user: ClinicUser, finish: () => void) => {
      setUserAction({
        action,
        user,
        finish,
      });
    },
    [],
  );

  const handleUserActionDialogConfirm = useCallback(() => {
    if (!userAction) {
      throw new Error('User action state is expected to be set.');
    }

    // TODO: Convert this switch case to an object-literal declaration
    switch (userAction.action) {
      case UserActionType.SetAdmin:
        // TODO: Implement setting user as administrator
        break;

      case UserActionType.Delete:
        // TODO: Implement deleting user
        break;

      default:
        throw new Error('Unsupported action type');
    }

    userAction.finish();
    setUserAction(null);
  }, [userAction]);

  const handleUserActionDialogClose = useCallback(() => {
    userAction?.finish();
    setUserAction(null);
  }, [userAction]);

  return (
    <View>
      <Alert>{error}</Alert>
      <SectionGroup title="BASIC INFORMATION">
        <SectionItem
          title={loading ? 'Loading…' : clinic?.name ?? ''}
          description={[clinic?.email, clinic?.address].filter(Boolean) as string[]}
        />
      </SectionGroup>
      <SectionGroup title="DOCTORS">
        {USER_LIST.map((user) => (
          <SectionItem
            key={user.id}
            title={user.displayName}
            description={formatUserDescription(user)}
            action={(finish) => (
              <UserActions onPress={(action) => handleUserActionPress(action, user, finish)} />
            )}
          />
        ))}
      </SectionGroup>

      <ConfirmDialog
        visible={userAction != null}
        onConfirm={handleUserActionDialogConfirm}
        onClose={handleUserActionDialogClose}
      >
        {userActionDialogText}
      </ConfirmDialog>
    </View>
  );
}
