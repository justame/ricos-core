import { typeMapper } from './typeMapper-loadable';
import { DEFAULTS } from './defaults';
import type { DividerPluginViewerConfig } from './types';
import { DIVIDER_TYPE } from './types';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as dividerTypeMapper, DIVIDER_TYPE, DividerPluginViewerConfig };

export const pluginDivider: ViewerPluginCreator<DividerPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: DIVIDER_TYPE,
    typeMapper,
  };
};
