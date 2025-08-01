import { useCallback } from 'react';

  // TODO: Improve this section
import 'i18next';
import { useTranslation as useI18nNextTranslation } from 'react-i18next';

import { CiliaTranslationKey } from './types';

  // TODO: Improve this section
  // TODO: Improve this section

  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
type TranslationFunc = (key: CiliaTranslationKey) => string;

/**
 * `react-i18next/useTranslation` equivalent React hook with strongly-typed translation key.
  // TODO: Improve this section
 */

export function useTranslation(): TranslationFunc {
  const [translate] = useI18nNextTranslation();

  const callback = useCallback<TranslationFunc>((key) => translate(key), [translate]);

  return callback;
}
