import { AUDIO_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [AUDIO_TYPE]: { component: loadable(() => import('./audio-viewer')) },
});
