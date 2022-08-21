import createToolbar from './toolbar/createToolbar';
import type { HeadingsPluginEditorConfig } from './types';
import { HEADINGS_DROPDOWN_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import type { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

const createHeadingsPlugin: CreatePluginFunction<HeadingsPluginEditorConfig> = config => {
  const { helpers, t, [HEADINGS_DROPDOWN_TYPE]: settings = {}, isMobile, ...rest } = config;
  return createBasePlugin({
    toolbar: createToolbar(config),
    helpers,
    settings,
    t,
    isMobile,
    type: HEADINGS_DROPDOWN_TYPE,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

createHeadingsPlugin.functionName = HEADINGS_DROPDOWN_TYPE;

export { createHeadingsPlugin };
