import { createHashtagPlugin } from './createHashtagPlugin';
import type { HashtagPluginEditorConfig } from './types';
import { HASHTAG_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { tiptapExtensions } from './tiptap/tiptap';
import type { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginHashtag: EditorPluginCreator<HashtagPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: HASHTAG_TYPE,
    createPlugin: createHashtagPlugin,
    ModalsMap: {},
    tiptapExtensions,
  };
};
