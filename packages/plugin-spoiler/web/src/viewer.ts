import type { SpoilerPluginViewerConfig } from './types';
import { SPOILER_TYPE } from './types';
import { spoilerInlineStyleMapper } from './spoilerInlineStyleMapper';
import { initSpoilersContentState } from './utils/spoilerUtilsFn';
import SpoilerViewerWrapper from './Components/Wrappers/SpoilerViewerWrapper';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export {
  spoilerInlineStyleMapper,
  initSpoilersContentState,
  SPOILER_TYPE,
  SpoilerViewerWrapper,
  SpoilerPluginViewerConfig,
};
export { default as SpoilerViewer } from './spoiler-viewer';

export const pluginSpoiler: ViewerPluginCreator<SpoilerPluginViewerConfig> = config => {
  return {
    config: { initSpoilersContentState, SpoilerViewerWrapper, ...config },
    type: SPOILER_TYPE,
    inlineStyleMapper: spoilerInlineStyleMapper,
  };
};
