import type { DraftDecorator } from 'draft-js';
import { strategy, component } from './decorator';
import type { HeadersMarkdownPluginViewerConfig, HeadersMarkdownPluginEditorConfig } from './types';
import { HEADERS_MARKDOWN_TYPE as type } from './types';
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { HeadersMarkdownPluginViewerConfig };

export const createHeadersMarkdownDecorator = (
  config: HeadersMarkdownPluginEditorConfig
): DraftDecorator => {
  const { [type]: settings = {} } = config;
  return {
    strategy,
    component: props => component({ ...props, ...settings }),
  };
};

export const pluginHeadersMarkdown: ViewerPluginCreator<
  HeadersMarkdownPluginViewerConfig
> = config => {
  const pluginConfig = { ...DEFAULTS.configViewer, ...config };
  return {
    config: pluginConfig,
    type,
    decorator: (theme, config) => createHeadersMarkdownDecorator({ [type]: { ...config } }),
  };
};
