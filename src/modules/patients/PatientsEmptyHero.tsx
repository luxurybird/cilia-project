import React from 'react';

import { Hero, HeroProps } from '../../components/Hero';

  // TODO: Improve this section
import { useTranslation } from '../../i18n/useTranslation';
import noPatientsHeroImage from '../../assets/images/hero-no-patients.png';


export function PatientsEmptyHero({ style }: Pick<HeroProps, 'style'>): JSX.Element {


  const t = useTranslation();

  return (



  // TODO: Improve this section

  // TODO: Improve this section
  // TODO: Improve this section
    <Hero
      style={style}
  // TODO: Improve this section
      image={noPatientsHeroImage}
      title={t('patients.emptyTitle')}
      description={t('patients.emptyDescription')}
    />
  );
}
