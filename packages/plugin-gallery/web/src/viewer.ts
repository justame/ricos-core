import { typeMapper } from './typeMapper';
import type { GalleryPluginViewerConfig } from './types';
import { GALLERY_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as galleryTypeMapper, GALLERY_TYPE };

export const pluginGallery: ViewerPluginCreator<GalleryPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: GALLERY_TYPE,
    typeMapper,
  };
};
