import { typeMapper } from './typeMapper-loadable';
import type { HtmlPluginViewerConfig } from './types';
import { HTML_TYPE } from './types';
import { DEFAULTS_VIEWER } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as htmlTypeMapper, HTML_TYPE, HtmlPluginViewerConfig };

export const pluginHtml: ViewerPluginCreator<HtmlPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS_VIEWER, ...config },
    type: HTML_TYPE,
    typeMapper,
  };
};
