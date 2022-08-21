import AudioViewer from './audio-viewer';
import { AUDIO_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [AUDIO_TYPE]: { component: AudioViewer },
});
