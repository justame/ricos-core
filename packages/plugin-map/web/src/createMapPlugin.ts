import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from './defaults';
import type { MapPluginEditorConfig } from './types';
import { MAP_TYPE } from './types';
import { MapViewer } from './MapViewer';
import createToolbar from './toolbar/createToolbar';
import type { CreatePluginFunction } from 'wix-rich-content-common';

const createMapPlugin: CreatePluginFunction<MapPluginEditorConfig> = config => {
  const type = MAP_TYPE;
  const { helpers, theme, t, [type]: settings = {}, getEditorBounds, isMobile, ...rest } = config;

  return createBasePlugin({
    component: MapViewer,
    type: MAP_TYPE,
    settings,
    theme,
    toolbar: createToolbar({
      getEditorBounds,
      settings,
      helpers,
      theme,
      t,
      isMobile,
    }),
    helpers,
    getEditorBounds,
    t,
    isMobile,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

createMapPlugin.functionName = MAP_TYPE;

export { createMapPlugin, MAP_TYPE };
