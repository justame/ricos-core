import createInsertButtons from './insert-buttons';
import createInlineButtons from './inline-buttons';
import type {
  CreatePluginToolbar,
  TranslationFunction,
  AvailableExperiments,
} from 'wix-rich-content-common';
import type { FilePluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  isMobile,
  experiments,
}: {
  t: TranslationFunction;
  settings: FilePluginEditorConfig;
  isMobile?: boolean;
  experiments?: AvailableExperiments;
}) => {
  return {
    InlineButtons: createInlineButtons({
      settings,
      t,
      isMobile,
      experiments,
    }),
    InsertButtons: createInsertButtons({ settings, t, experiments }),
    name: 'FileUpload',
  };
};

export default createToolbar;
