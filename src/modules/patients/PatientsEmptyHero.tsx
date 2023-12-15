import React from 'react';

import { Hero, HeroProps } from '../../components/Hero';

import { useTranslation } from '../../i18n/useTranslation';
import noPatientsHeroImage from '../../assets/images/hero-no-patients.png';

export function PatientsEmptyHero({ style }: Pick<HeroProps, 'style'>): JSX.Element {

  const t = useTranslation();

  return (

  // TODO: Improve this section

    <Hero
      style={style}
      image={noPatientsHeroImage}
      title={t('patients.emptyTitle')}
      description={t('patients.emptyDescription')}
    />
  );
}
