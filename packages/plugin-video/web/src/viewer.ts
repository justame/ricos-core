import type { VideoPluginViewerConfig } from './types';
import { VIDEO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { typeMapper } from './typeMapper';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { VIDEO_TYPE, typeMapper as videoTypeMapper };

export const pluginVideo: ViewerPluginCreator<VideoPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: VIDEO_TYPE,
    typeMapper,
  };
};
