import { DOC_STYLE_TYPES } from 'ricos-types';

// Taken from common/statics/styles/consts.scss any change here should also be done there and vice-versa.
export const defaultFontSizes = {
  [DOC_STYLE_TYPES.H1]: '40px',
  [DOC_STYLE_TYPES.H2]: '28px',
  [DOC_STYLE_TYPES.H3]: '24px',
  [DOC_STYLE_TYPES.H4]: '20px',
  [DOC_STYLE_TYPES.H5]: '18px',
  [DOC_STYLE_TYPES.H6]: '16px',
  [DOC_STYLE_TYPES.P]: '16px',
};

export const defaultMobileFontSizes = {
  [DOC_STYLE_TYPES.H1]: '32px',
  [DOC_STYLE_TYPES.H2]: '24px',
  [DOC_STYLE_TYPES.H3]: '20px',
  [DOC_STYLE_TYPES.H4]: '20px',
  [DOC_STYLE_TYPES.H5]: '16px',
  [DOC_STYLE_TYPES.H6]: '14px',
  [DOC_STYLE_TYPES.P]: '14px',
};
