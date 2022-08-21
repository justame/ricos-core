import type { VerticalEmbedPluginViewerConfig } from './types';
import { VERTICAL_EMBED_TYPE } from './types';
import { typeMapper } from './typeMapper';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as verticalEmbedTypeMapper, VERTICAL_EMBED_TYPE };

export const pluginVerticalEmbed: ViewerPluginCreator<VerticalEmbedPluginViewerConfig> = config => {
  return {
    config: { ...config },
    type: VERTICAL_EMBED_TYPE,
    typeMapper,
  };
};
