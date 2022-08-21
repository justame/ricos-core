import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import type {
  CreatePluginToolbar,
  TranslationFunction,
  AvailableExperiments,
} from 'wix-rich-content-common';
import type { SetEditorState, GetEditorState } from 'wix-rich-content-common/src';
import type { LinkPreviewPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  setEditorState,
  getEditorState,
  isMobile,
  t,
  experiments,
}: {
  t: TranslationFunction;
  settings: LinkPreviewPluginEditorConfig;
  isMobile: boolean;
  setEditorState: SetEditorState;
  getEditorState: GetEditorState;
  experiments: AvailableExperiments;
}) => {
  return {
    InlineButtons: createInlineButtons({ setEditorState, getEditorState }),
    InsertButtons: createInsertButtons({ settings, isMobile, t, experiments }),
    name: 'link-preview',
  };
};

export default createToolbar;
