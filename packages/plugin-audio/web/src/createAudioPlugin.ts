import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './audio-component';
import type { AudioPluginEditorConfig } from './types';
import { AUDIO_TYPE } from './types';
import { createBaseMediaPlugin, createBasePlugin } from 'wix-rich-content-plugin-commons';
import type { CreatePluginFunction } from 'wix-rich-content-common';

const createAudioPlugin: CreatePluginFunction<AudioPluginEditorConfig> = config => {
  const { helpers, t, [AUDIO_TYPE]: settings = {}, isMobile, commonPubsub, ...rest } = config;
  const disableDownload = config?.uiSettings?.disableDownload;
  const type = AUDIO_TYPE;
  return createBasePlugin({
    component: createBaseMediaPlugin(Component),
    type,
    toolbar: createToolbar({
      t,
      settings: { ...settings, type, commonPubsub },
      isMobile,
      disableDownload,
    }),
    helpers,
    settings,
    t,
    isMobile,
    defaultPluginData: DEFAULTS,
    commonPubsub,
    ...rest,
  });
};

createAudioPlugin.functionName = AUDIO_TYPE;

export { createAudioPlugin };
