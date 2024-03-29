import GalleryViewer from './gallery-viewer';
import { GALLERY_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [GALLERY_TYPE]: { component: GalleryViewer },
});
