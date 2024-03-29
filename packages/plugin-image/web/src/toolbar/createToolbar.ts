import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import type {
  CreatePluginToolbar,
  TranslationFunction,
  AnchorTarget,
  RelValue,
  UISettings,
  AvailableExperiments,
} from 'wix-rich-content-common';
import type { ImagePluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  t,
  anchorTarget,
  relValue,
  uiSettings,
  isMobile,
  settings,
  experiments,
}: {
  t: TranslationFunction;
  settings: ImagePluginEditorConfig;
  isMobile: boolean;
  anchorTarget: AnchorTarget;
  relValue: RelValue;
  uiSettings: UISettings;
  experiments: AvailableExperiments;
}) => {
  const disableDownload = uiSettings?.disableDownload;
  const disableExpand = settings?.disableExpand;

  return {
    InlineButtons: createInlineButtons({
      t,
      anchorTarget,
      relValue,
      uiSettings,
      isMobile,
      settings,
      experiments,
    }),
    InsertButtons: createInsertButtons({
      t,
      settings,
      disableDownload,
      disableExpand,
      experiments,
    }),
    name: 'image',
  };
};

export default createToolbar;
