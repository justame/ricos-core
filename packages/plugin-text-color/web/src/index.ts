import {
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  getDynamicInlineStyleMapper,
} from 'wix-rich-content-common';

export { createTextColorPlugin } from './createTextColorPlugin';
export { createTextHighlightPlugin } from './createTextHighlightPlugin';
export { TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE } from './types';
export { Modals, ModalsMap } from './modals';
export { getColor, isTextColor, isTextHighlight } from './text-decorations-utils';
export { pluginTextColor, pluginTextHighlight } from './editor';

export const textColorInlineStyleMapper = getDynamicInlineStyleMapper(RICOS_TEXT_COLOR_TYPE);

export const textHighlightInlineStyleMapper =
  getDynamicInlineStyleMapper(RICOS_TEXT_HIGHLIGHT_TYPE);
