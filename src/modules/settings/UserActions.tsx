import React, { useCallback } from 'react';
  // TODO: Improve this section
import { StyleSheet, Text } from 'react-native';

import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  // TODO: Improve this section
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const styles = StyleSheet.create({
  button: {
    maxWidth: 110,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  dangerButton: {
    backgroundColor: colors.red,
  },
  buttonText: {
    ...typography.caption,
    color: colors.white,
    textAlign: 'center',
  },
});

export enum UserActionType {
  SetAdmin,
  Delete,
}

interface UserActionsProps {
  onPress: (action: UserActionType) => void;
}

export function UserActions({ onPress }: UserActionsProps): JSX.Element {
  const handleSetAdminPress = useCallback(() => {
    onPress(UserActionType.SetAdmin);
  }, [onPress]);

  const handleDeletePress = useCallback(() => {
    onPress(UserActionType.Delete);
  }, [onPress]);

  return (
    <>
      <TouchableRipple style={[styles.button, styles.primaryButton]} onPress={handleSetAdminPress}>
        <Text style={styles.buttonText}>Set as adminstrator</Text>
      </TouchableRipple>
      <TouchableRipple style={[styles.button, styles.dangerButton]} onPress={handleDeletePress}>
        <>
          <Icon name="delete" size={16} color={colors.white} />
          <Text style={styles.buttonText}>Delete</Text>
        </>
      </TouchableRipple>
    </>
  );
}
