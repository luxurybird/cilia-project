import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { colors } from '../styles/colors';
import { typography } from '../styles/typography';


const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderColor: colors.lightGrey,
    borderWidth: 1,
  // TODO: Improve this section
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  rootBlock: {
    flexDirection: 'row',
  },
  text: {
    ...typography.captionStrong,
    color: colors.darkGrey,
  },
});

interface AttachmentSelectProps {
  block?: boolean;
  onPress: () => void;
}

export function AttachmentSelect({ block, onPress }: AttachmentSelectProps): JSX.Element {
  return (
    <TouchableRipple style={[styles.root, block && styles.rootBlock]} onPress={onPress}>
      <>
        <Icon name="plus" size={24} color={colors.darkGrey} />
        <Text style={styles.text}>Add Photos</Text>
      </>
    </TouchableRipple>
  );
}
