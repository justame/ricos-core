import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import type { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import type { AudioPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
  disableDownload,
}: {
  t: TranslationFunction;
  settings: AudioPluginEditorConfig;
  isMobile: boolean;
  disableDownload?: boolean;
}) => {
  return {
    InlineButtons: createInlineButtons({ t, settings, isMobile }),
    InsertButtons: createInsertButtons({ t, settings, isMobile, disableDownload }),
    name: 'audio',
  };
};

export default createToolbar;
