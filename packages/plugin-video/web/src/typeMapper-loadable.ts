import loadable from '@loadable/component';
import { VIDEO_TYPE_LEGACY, VIDEO_TYPE } from './types';
import { containerClassName } from './classNameStrategies';
import type { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [VIDEO_TYPE_LEGACY]: {
    component: loadable(() => import('./video-viewer')),
    classNameStrategies: { container: containerClassName },
  },
  [VIDEO_TYPE]: {
    component: loadable(() => import('./video-viewer')),
    classNameStrategies: { container: containerClassName },
  },
});
