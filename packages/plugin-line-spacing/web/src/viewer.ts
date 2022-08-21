import type { LineSpacingPluginViewerConfig } from './types';
import { LINE_SPACING_TYPE } from './types';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';
export { LineSpacingPluginViewerConfig };

export const pluginLineSpacing: ViewerPluginCreator<LineSpacingPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINE_SPACING_TYPE,
  };
};
