import { typeMapper } from './typeMapper-loadable';
import { DEFAULTS } from './defaults';
import type { MapPluginViewerConfig } from './types';
import { MAP_TYPE } from './types';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as mapTypeMapper, MAP_TYPE, MapPluginViewerConfig };

export const pluginMap: ViewerPluginCreator<MapPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MAP_TYPE,
    typeMapper,
  };
};
