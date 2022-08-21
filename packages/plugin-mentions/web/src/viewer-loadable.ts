import { typeMapper } from './typeMapper-loadable';
import type { MentionsPluginViewerConfig } from './types';
import { MENTION_TYPE } from './types';
import { DEFAULTS } from './defaultSettings';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { MENTION_TYPE, typeMapper as mentionsTypeMapper, MentionsPluginViewerConfig };

export const pluginMentions: ViewerPluginCreator<MentionsPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MENTION_TYPE,
    typeMapper,
  };
};
