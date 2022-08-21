import type { IndentPluginViewerConfig } from './types';
import { INDENT_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { INDENT_TYPE, IndentPluginViewerConfig };

export const pluginIndent: ViewerPluginCreator<IndentPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: INDENT_TYPE,
  };
};
