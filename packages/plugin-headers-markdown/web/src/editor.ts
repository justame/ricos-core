import { createHeadersMarkdownPlugin } from './createHeadersMarkdownPlugin';
import type { HeadersMarkdownPluginEditorConfig } from './types';
import { HEADERS_MARKDOWN_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginHeadersMarkdown: EditorPluginCreator<
  HeadersMarkdownPluginEditorConfig
> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HEADERS_MARKDOWN_TYPE,
    createPlugin: createHeadersMarkdownPlugin,
    ModalsMap: {},
  };
};
