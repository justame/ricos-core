import createInsertButtons from './insert-buttons';
import type {
  CreatePluginToolbar,
  TranslationFunction,
  GetEditorState,
  SetEditorState,
} from 'wix-rich-content-common';
import type { EmojiPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  isMobile,
  getEditorState,
  setEditorState,
}: {
  t: TranslationFunction;
  settings: EmojiPluginEditorConfig;
  isMobile: boolean;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
}) => {
  return {
    InsertButtons: isMobile
      ? []
      : createInsertButtons({
          settings,
          t,
          isMobile,
          getEditorState,
          setEditorState,
        }),
    name: 'emoji',
  };
};

export default createToolbar;
