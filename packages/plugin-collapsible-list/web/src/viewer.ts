/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper';
import type { CollapsibleListPluginViewerConfig } from './types';
import { COLLAPSIBLE_LIST_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { COLLAPSIBLE_LIST_TYPE, typeMapper as collapsibleListTypeMapper };

export const pluginCollapsibleList: ViewerPluginCreator<
  CollapsibleListPluginViewerConfig
> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: COLLAPSIBLE_LIST_TYPE,
    typeMapper,
    // decorator: (theme, config) => ...
  };
};
