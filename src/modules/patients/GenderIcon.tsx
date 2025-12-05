import React from 'react';
import type { IconProps } from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Gender } from '../../models/types';

type IconDescription = Pick<IconProps, 'name' | 'color'>;

const GENDER_ICON_DESCRIPTION_MAP: Record<Gender, IconDescription> = {
  [Gender.Male]: {
    name: 'gender-male',
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
