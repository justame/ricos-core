import { typeMapper } from './typeMapper-loadable';
import { DEFAULT_COMPONENT_DATA } from './defaults';
import type { PollPluginViewerConfig } from './types';
import { POLL_TYPE } from './types';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as pollTypeMapper, POLL_TYPE, PollPluginViewerConfig };

export const pluginPoll: ViewerPluginCreator<PollPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULT_COMPONENT_DATA.config, ...config },
    type: POLL_TYPE,
    typeMapper,
  };
};
