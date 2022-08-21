import createToolbar from './toolbar/createToolbar';
import type { IndentPluginEditorConfig } from './types';
import { INDENT_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import type { CreatePluginFunction } from 'wix-rich-content-common';

const createIndentPlugin: CreatePluginFunction<IndentPluginEditorConfig> = config => {
  const { helpers, t, [INDENT_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    type: INDENT_TYPE,
    toolbar: createToolbar(config),
    helpers,
    settings,
    t,
    isMobile,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

createIndentPlugin.functionName = INDENT_TYPE;

export { createIndentPlugin };
