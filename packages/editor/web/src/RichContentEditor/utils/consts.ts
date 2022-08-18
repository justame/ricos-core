import { HEADER_BLOCK } from 'ricos-content';

export const DOC_STYLE_CLASSES = {
  headerOne: 'rich_content_H1',
  headerTwo: 'rich_content_H2',
  headerThree: 'rich_content_H3',
  headerFour: 'rich_content_H4',
  headerFive: 'rich_content_H5',
  headerSix: 'rich_content_H6',
  paragraph: 'rich_content_P',
  'ordered-list-item': 'rich-content-OL',
  'unordered-list-item': 'rich-content-UL',
};

export const DRAFT_TO_RICOS_CUSTOM_STYLES = {
  [HEADER_BLOCK.ONE]: 'h1',
  [HEADER_BLOCK.TWO]: 'h2',
  [HEADER_BLOCK.THREE]: 'h3',
  [HEADER_BLOCK.FOUR]: 'h4',
  [HEADER_BLOCK.FIVE]: 'h5',
  [HEADER_BLOCK.SIX]: 'h6',
  [HEADER_BLOCK.PARAGRAPH]: 'p',
};

// Taken from common/statics/styles/consts.scss any change here should also be done there and vice-versa.
export const defaultFontSizes = {
  [HEADER_BLOCK.ONE]: '40px',
  [HEADER_BLOCK.TWO]: '28px',
  [HEADER_BLOCK.THREE]: '24px',
  [HEADER_BLOCK.FOUR]: '20px',
  [HEADER_BLOCK.FIVE]: '18px',
  [HEADER_BLOCK.SIX]: '16px',
  [HEADER_BLOCK.PARAGRAPH]: '16px',
};

export const defaultMobileFontSizes = {
  [HEADER_BLOCK.ONE]: '32px',
  [HEADER_BLOCK.TWO]: '24px',
  [HEADER_BLOCK.THREE]: '20px',
  [HEADER_BLOCK.FOUR]: '20px',
  [HEADER_BLOCK.FIVE]: '16px',
  [HEADER_BLOCK.SIX]: '14px',
  [HEADER_BLOCK.PARAGRAPH]: '14px',
};
