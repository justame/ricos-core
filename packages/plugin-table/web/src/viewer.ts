import { typeMapper } from './typeMapper';
import { theme, DEFAULTS } from './defaults';
import type { TablePluginViewerConfig } from './types';
import { TABLE_TYPE } from './types';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { TABLE_TYPE, typeMapper as tableTypeMapper };

export const pluginTable: ViewerPluginCreator<TablePluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: TABLE_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
    theme,
  };
};
