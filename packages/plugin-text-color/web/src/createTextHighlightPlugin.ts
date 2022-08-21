import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import type { TextHighlightPluginEditorConfig } from './types';
import { TEXT_HIGHLIGHT_TYPE } from './types';
import { createTextHighlightToolbar } from './toolbar/createToolbar';
import { DEFAULTS } from './constants';
import type { CreatePluginFunction } from 'wix-rich-content-common';

const createTextHighlightPlugin: CreatePluginFunction<TextHighlightPluginEditorConfig> = config => {
  const type = TEXT_HIGHLIGHT_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;
  const toolbar = createTextHighlightToolbar(config);
  return createBasePlugin({
    theme,
    toolbar,
    type,
    settings,
    defaultPluginData: DEFAULTS.configTextHighlight.editor,
    ...rest,
  });
};

createTextHighlightPlugin.functionName = TEXT_HIGHLIGHT_TYPE;

export { createTextHighlightPlugin };
