import type { ViewerPluginCreator } from 'wix-rich-content-common';
import { getLinkRangesInBlock } from 'wix-rich-content-common';
import { default as createHashtagDecorator } from './HashtagDecorator';
import type { HashtagPluginViewerConfig } from './types';
import { HASHTAG_TYPE } from './types';
import { DEFAULTS } from './defaults';
const HashtagDecorator = createHashtagDecorator(getLinkRangesInBlock);
export { HashtagDecorator, HashtagPluginViewerConfig };

export const pluginHashtag: ViewerPluginCreator<HashtagPluginViewerConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: HASHTAG_TYPE,
    decorator: theme => new HashtagDecorator({ theme, ...pluginConfig }),
  };
};
