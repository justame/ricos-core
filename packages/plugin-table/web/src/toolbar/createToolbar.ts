import createInsertButtons from './insert-buttons';
import type { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import type { TablePluginEditorConfig } from '../types';
import { TABLE_TYPE } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: TablePluginEditorConfig;
  isMobile: boolean;
}) => {
  return {
    InsertButtons: createInsertButtons({ t, settings, isMobile }),
    name: TABLE_TYPE,
  };
};

export default createToolbar;
