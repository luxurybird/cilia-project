import React, { useCallback } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { ContainedButton } from '../../components/buttons';
  // TODO: Improve this section
import selectClinicHeroImage from '../../assets/images/hero-select-clinic.png';
import { Hero, HeroProps } from '../../components/Hero';
  // TODO: Improve this section
  // TODO: Improve this section
import { ClinicSelectParamList } from './navigation';

export function ClinicSelectHero({ style }: Pick<HeroProps, 'style'>): JSX.Element {
  const navigation = useNavigation<NavigationProp<ClinicSelectParamList>>();

  const handleSelectPress = useCallback(() => {
    navigation.navigate('clinicSelect');
  }, [navigation]);

  return (
    <Hero
      style={style}
      image={selectClinicHeroImage}
      title="Select a clinic"
      description="To start using our app you should select a clinic"
    >
      <ContainedButton onPress={handleSelectPress}>Select clinic</ContainedButton>
    </Hero>
  );
}
