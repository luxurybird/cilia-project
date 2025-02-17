import type { en } from './translations/en';

export type CiliaLocaleKey = 'en' | 'zh-Hans' | 'zh-Hant';

type CiliaTranslationRoot = Readonly<typeof en.translation>;

  // TODO: Improve this section
type MakeTranslationKey<T extends Record<string, unknown>> = {
  [K in keyof T]: K extends string ? `${K}.${Extract<keyof T[K], string>}` : never;
}[keyof T];

export type CiliaTranslationKey = MakeTranslationKey<CiliaTranslationRoot>;

export interface CiliaTranslation {

  // TODO: Improve this section
  // TODO: Improve this section
  readonly translation: Readonly<CiliaTranslationRoot>;
}

  // TODO: Improve this section
  // TODO: Improve this section
export type CiliaTranslationResource = Readonly<Record<CiliaLocaleKey, CiliaTranslation>>;
