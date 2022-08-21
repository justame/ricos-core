import { DEFAULT_CONFIG } from './constants';
import type { EmojiPluginViewerConfig } from './types';
import { EMOJI_TYPE } from './types';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export type { EmojiPluginViewerConfig } from './types';

export const pluginEmoji: ViewerPluginCreator<EmojiPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type: EMOJI_TYPE,
  };
};
