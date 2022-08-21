import type { TextColorPluginViewerConfig, TextHighlightPluginViewerConfig } from './types';
import { TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE } from './types';
import { DEFAULTS } from './constants';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export {
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  TextColorPluginViewerConfig,
  TextHighlightPluginViewerConfig,
};
import {
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  getDynamicInlineStyleMapper,
} from 'wix-rich-content-common';

export const pluginTextColor: ViewerPluginCreator<TextColorPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextColor.viewer, ...config },
    type: TEXT_COLOR_TYPE,
  };
};

export const pluginTextHighlight: ViewerPluginCreator<TextHighlightPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextHighlight.viewer, ...config },
    type: TEXT_HIGHLIGHT_TYPE,
  };
};

export const textColorInlineStyleMapper = getDynamicInlineStyleMapper(RICOS_TEXT_COLOR_TYPE);

export const textHighlightInlineStyleMapper =
  getDynamicInlineStyleMapper(RICOS_TEXT_HIGHLIGHT_TYPE);
