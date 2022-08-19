import React from 'react';
import {
  RICOS_FONT_SIZE_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  getDynamicInlineStyleMapper,
} from 'wix-rich-content-common';

const textColorInlineStyleMapper = getDynamicInlineStyleMapper(RICOS_TEXT_COLOR_TYPE);

const textHighlightInlineStyleMapper = getDynamicInlineStyleMapper(RICOS_TEXT_HIGHLIGHT_TYPE);

const fontSizeInlineStyleMapper = getDynamicInlineStyleMapper(RICOS_FONT_SIZE_TYPE);

const staticInlineStyleMapper = mergedStyles => ({
  BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
  ITALIC: (children, { key }) => <em key={key}>{children}</em>,
  UNDERLINE: (children, { key }) => (
    <u key={key} className={mergedStyles.underline}>
      {children}
    </u>
  ),
  CODE: (children, { key }) => (
    <span key={key} className={mergedStyles.code}>
      {children}
    </span>
  ),
  NOT_BOLD: (children, { key }) => (
    <span style={{ fontWeight: 'normal' }} key={key}>
      {children}
    </span>
  ),
  NOT_ITALIC: (children, { key }) => (
    <span style={{ fontStyle: 'normal' }} key={key}>
      {children}
    </span>
  ),
});

export const getViewerInlineStyleMappers = (contentState, config) => [
  staticInlineStyleMapper,
  fontSizeInlineStyleMapper({}, contentState),
  textColorInlineStyleMapper(config, contentState),
  textHighlightInlineStyleMapper(config, contentState),
];
