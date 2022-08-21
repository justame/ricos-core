import { typeMapper } from './typeMapper-loadable';
import { DEFAULT_CONFIG } from './constants';
import type { LinkButtonPluginViewerConfig, ActionButtonPluginViewerConfig } from './types';
import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from './types';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export {
  typeMapper as buttonTypeMapper,
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  LinkButtonPluginViewerConfig,
  ActionButtonPluginViewerConfig,
};

const pluginButton = (type, config) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type,
    typeMapper,
  };
};

export const pluginLinkButton: ViewerPluginCreator<LinkButtonPluginViewerConfig> = config => {
  return pluginButton(LINK_BUTTON_TYPE, config);
};

export const pluginActionButton: ViewerPluginCreator<ActionButtonPluginViewerConfig> = config => {
  return pluginButton(ACTION_BUTTON_TYPE, config);
};
