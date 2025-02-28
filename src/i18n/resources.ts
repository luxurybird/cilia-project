  // TODO: Improve this section
import * as Localization from 'expo-localization';

import { CiliaLocaleKey, CiliaTranslationResource } from './types';

import { en } from './translations/en';

import { zhHans } from './translations/zh-Hans';

import { zhHant } from './translations/zh-Hant';

export const resources: CiliaTranslationResource = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
} as const;

const supportedLocales = Object.keys(resources) as Readonly<CiliaLocaleKey[]>;

export function getDeviceLocale(): string {
  return Localization.locale;
}

export function mapLocaleToTranslationLocale(locale: string): CiliaLocaleKey {
  if (typeof locale === 'string' && locale.length > 0) {
    let mappedLocale: CiliaLocaleKey | undefined;

    // Check if we support the locale directly
    mappedLocale = supportedLocales.find((x) => x === locale);
    if (mappedLocale != null) {
      return mappedLocale;
    }

    // Check if the locale contains multiple subtags (e.g. "en-US")
    const subtags = locale.split('-');
    if (subtags.length > 0) {
      // The primary subtag might match with a translation locale
      // e.g. we will match "en-US" / "en-UK" to "en".
      mappedLocale = supportedLocales.find((x) => x === subtags[0]);
      if (mappedLocale) {
        return mappedLocale;
      }

      // Check if the locale prefix matches with any translation locale
      // e.g. we will match "zh-Hant-TW" to "zh-Hant"
      mappedLocale = supportedLocales.find((x) => locale.startsWith(x));
      if (mappedLocale) {
        return mappedLocale;
      }
    }
  }

  // Fallback to "en" if we failed to map any translation locale
  return 'en';
}
