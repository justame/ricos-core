import type { UndoRedoPluginViewerConfig } from './types';
import { UNDO_REDO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';

export const pluginUndoRedo: ViewerPluginCreator<UndoRedoPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: UNDO_REDO_TYPE,
  };
};
