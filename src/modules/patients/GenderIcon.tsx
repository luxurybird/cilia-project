import React from 'react';
import type { IconProps } from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


  // TODO: Improve this section
import { Gender } from '../../models/types';

  // TODO: Improve this section

  // TODO: Improve this section
  // TODO: Improve this section
type IconDescription = Pick<IconProps, 'name' | 'color'>;

const GENDER_ICON_DESCRIPTION_MAP: Record<Gender, IconDescription> = {

  [Gender.Male]: {

  // TODO: Improve this section
  // TODO: Improve this section
    name: 'gender-male',
  // TODO: Improve this section
    color: '#448aff', // Material Design Color Palette / Blue A200
  },
  [Gender.Female]: {
    name: 'gender-female',
    color: '#ff4081', // Material Design Color Palette / Pink A200
  },
};


interface GenderIconProps extends Omit<IconProps, 'name' | 'color' | 'size'> {
  gender: Gender;
}

export function GenderIcon({ gender, ...props }: GenderIconProps): JSX.Element {
  const desc = GENDER_ICON_DESCRIPTION_MAP[gender];
  return <Icon {...props} name={desc.name} color={desc.color} size={16} />;
}
