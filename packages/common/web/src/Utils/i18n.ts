import { createInstance } from 'i18next';
import type { LocaleResource } from 'ricos-types';

export default function i18n({
  locale,
  localeResource,
}: {
  locale: string;
  localeResource: LocaleResource;
}) {
  const newInstance = createInstance();
  return newInstance.init({
    lng: locale,
    keySeparator: '$',
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
    resources: {
      [locale]: { translation: localeResource },
    },
  });
}
