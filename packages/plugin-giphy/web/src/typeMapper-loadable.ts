import loadable from '@loadable/component';
import { GIPHY_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [GIPHY_TYPE]: { component: loadable(() => import('./giphy-viewer')) },
});
