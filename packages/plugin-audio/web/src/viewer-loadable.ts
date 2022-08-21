import { typeMapper } from './typeMapper-loadable';
import type { AudioPluginViewerConfig } from './types';
import { AUDIO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { AUDIO_TYPE, typeMapper as audioTypeMapper, AudioPluginViewerConfig };

export const pluginAudio: ViewerPluginCreator<AudioPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: AUDIO_TYPE,
    typeMapper,
  };
};
