import type { LinkPluginViewerConfig } from './types';
import { LINK_TYPE } from './types';
import { typeMapper } from './typeMapper-loadable';
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as linkTypeMapper, LINK_TYPE, LinkPluginViewerConfig };

export const pluginLink: ViewerPluginCreator<LinkPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_TYPE,
    typeMapper,
  };
};
