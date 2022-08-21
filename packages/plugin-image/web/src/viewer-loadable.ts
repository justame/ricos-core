import { typeMapper } from './typeMapper-loadable';
import type { ImagePluginViewerConfig } from './types';
import { IMAGE_TYPE } from './types';
import { DEFAULTS } from './consts';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as imageTypeMapper, IMAGE_TYPE, ImagePluginViewerConfig };

export const pluginImage: ViewerPluginCreator<ImagePluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: IMAGE_TYPE,
    typeMapper,
  };
};
