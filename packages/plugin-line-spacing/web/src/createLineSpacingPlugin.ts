import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import type { LineSpacingPluginEditorConfig } from './types';
import { LINE_SPACING_TYPE } from './types';
import createLineSpacingToolbar from './toolbar/createToolbar';
import type { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

const createLineSpacingPlugin: CreatePluginFunction<LineSpacingPluginEditorConfig> = config => {
  const type = LINE_SPACING_TYPE;
  const { theme, isMobile, t, [type]: settings = {}, ...rest } = config;

  const toolbar = createLineSpacingToolbar(config);

  return createBasePlugin({
    theme,
    toolbar,
    isMobile,
    t,
    settings,
    type,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

createLineSpacingPlugin.functionName = LINE_SPACING_TYPE;

export { createLineSpacingPlugin };
