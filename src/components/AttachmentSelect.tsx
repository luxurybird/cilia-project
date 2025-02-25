  // TODO: Improve this section
  // TODO: Improve this section
import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';


const styles = StyleSheet.create({
  // TODO: Improve this section
  root: {
    flex: 1,
    flexDirection: 'column',
  // TODO: Improve this section
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
