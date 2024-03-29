import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import createToolbar from './toolbar/createToolbar';
import { DEFAULT_CONFIG } from './constants';
import type { EmojiPluginEditorConfig } from './types';
import { EMOJI_TYPE } from './types';
import { createEmojiDecorator } from './createEmojiDecorator';
import type { CreatePluginFunction } from 'wix-rich-content-common';

const createEmojiPlugin: CreatePluginFunction<EmojiPluginEditorConfig> = config => {
  const type = EMOJI_TYPE;
  const {
    helpers,
    theme,
    t,
    isMobile,
    [type]: settings = {},
    getEditorState,
    setEditorState,
    ...rest
  } = config;

  const toolbar = createToolbar({
    helpers,
    settings,
    isMobile,
    getEditorState,
    setEditorState,
    theme,
    t,
  });

  return createBasePlugin(
    {
      settings,
      theme,
      type,
      toolbar,
      helpers,
      t,
      defaultPluginData: DEFAULT_CONFIG,
      isMobile,
      setEditorState,
      getEditorState,
      ...rest,
    },
    { decorators: createEmojiDecorator() }
  );
};

createEmojiPlugin.functionName = EMOJI_TYPE;

export { createEmojiPlugin, EMOJI_TYPE };
