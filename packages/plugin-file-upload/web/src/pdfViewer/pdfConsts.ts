export enum PDF_STATUS {
  NONE,
  PENDING,
  LOADING_FILE,
  READY,
  ERROR,
}

export const PDF_OPTIONS_TO_EMBED_PROPERTIES = {
  FULL: '',
  MINI: 'SIZED_CONTAINER',
};

export const PDF_OPTIONS = {
  FULL: 'FULL',
  MINI: 'MINI',
  NONE: 'NONE',
};

export const PDF_CUSTOMIZATIONS = {
  PRINT: 'disablePrint',
  DOWNLOAD: 'disableDownload',
};

export const RICOS_LOCALE_TO_ADOBE = {
  da: 'da-DK',
  nl: 'nl-NL',
  en: 'en-US',
  fi: 'fi-FI',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  ja: 'ja-JP',
  no: 'nb-NO',
  pt: 'pt-BR',
  es: 'es-ES',
  sv: 'sv-SE',
  cs: 'cs-CZ',
  ko: 'ko-KR',
  pl: 'pl-PL',
  ru: 'ru-RU',
  tr: 'tr-TR',
  zh: 'zg-CN',
};

export const ADOBE_EVENT_TO_PDF_STATUS = {
  APP_RENDERING_DONE: PDF_STATUS.READY,
  PDF_VIEWER_OPEN: PDF_STATUS.LOADING_FILE,
  APP_RENDERING_FAILED: PDF_STATUS.ERROR,
};
