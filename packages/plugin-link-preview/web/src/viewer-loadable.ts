import type { LinkPreviewPluginViewerConfig } from './types';
import { LINK_PREVIEW_TYPE } from './types';
import { typeMapper } from './typeMapper-loadable';
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';

export { typeMapper as linkPreviewTypeMapper, LINK_PREVIEW_TYPE, LinkPreviewPluginViewerConfig };

export const pluginLinkPreview: ViewerPluginCreator<LinkPreviewPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_PREVIEW_TYPE,
    typeMapper,
  };
};
