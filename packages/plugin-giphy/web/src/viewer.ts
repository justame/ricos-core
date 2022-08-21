import { typeMapper } from './typeMapper';
import { DEFAULTS } from './constants';
import type { GiphyPluginViewerConfig } from './types';
import { GIPHY_TYPE } from './types';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as giphyTypeMapper, GIPHY_TYPE };

export const pluginGiphy: ViewerPluginCreator<GiphyPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: GIPHY_TYPE,
    typeMapper,
  };
};
