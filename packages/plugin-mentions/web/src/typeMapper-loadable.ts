import { MENTION_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [MENTION_TYPE]: {
    component: loadable(() => import('./MentionViewer')),
    elementType: 'inline',
  },
});
