import { PollViewer } from './PollViewer';
import { POLL_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [POLL_TYPE]: {
    component: PollViewer,
  },
});
