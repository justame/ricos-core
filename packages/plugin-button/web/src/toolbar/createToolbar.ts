import createInlineButtons from './inline-buttons';
import createInsertButtons from './insert-buttons';
import type {
  AnchorTarget,
  CreatePluginToolbar,
  RelValue,
  TranslationFunction,
} from 'wix-rich-content-common';
import type { ButtonPluginEditorConfig, LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  t,
  isMobile,
  customTooltip,
  relValue,
  anchorTarget,
  type,
}: {
  t: TranslationFunction;
  settings: ButtonPluginEditorConfig;
  isMobile: boolean;
  customTooltip: string;
  relValue: RelValue;
  anchorTarget: AnchorTarget;
  type: typeof LINK_BUTTON_TYPE | typeof ACTION_BUTTON_TYPE;
}) => {
  return {
    InlineButtons: createInlineButtons({ settings, isMobile, relValue, anchorTarget, type }),
    InsertButtons: createInsertButtons({ t, settings, customTooltip, relValue, anchorTarget }),
    name: 'button',
  };
};

export default createToolbar;
