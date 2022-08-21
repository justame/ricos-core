import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import type { VerticalEmbedPluginEditorConfig } from './types';
import { VERTICAL_EMBED_TYPE } from './types';
import VerticalEmbedComponent from './vertical-embed-component';
import createToolbar from './toolbar/createToolbar';
import type { CreatePluginFunction } from 'wix-rich-content-common';

const createVerticalEmbedPlugin: CreatePluginFunction<VerticalEmbedPluginEditorConfig> = config => {
  const type = VERTICAL_EMBED_TYPE;
  const {
    helpers,
    theme,
    t,
    [type]: settings = {},
    isMobile,
    locale,
    localeContent,
    experiments,
    ...rest
  } = config;

  return createBasePlugin({
    component: VerticalEmbedComponent,
    settings,
    theme,
    type,
    toolbar: createToolbar({
      settings,
      helpers,
      t,
      isMobile,
      locale: localeContent || locale,
      experiments,
    }),
    helpers,
    t,
    defaultPluginData: {},
    isMobile,
    locale: localeContent || locale,
    ...rest,
  });
};

createVerticalEmbedPlugin.functionName = VERTICAL_EMBED_TYPE;

export { createVerticalEmbedPlugin };
