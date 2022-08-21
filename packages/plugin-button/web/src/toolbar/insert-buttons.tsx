import { INSERT_PLUGIN_BUTTONS, TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import { DEFAULTS } from '../defaults';
import type {
  CreateInsertButtons,
  TranslationFunction,
  RelValue,
  AnchorTarget,
} from 'wix-rich-content-common';
import type { ButtonPluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  customTooltip,
}: {
  t: TranslationFunction;
  settings: ButtonPluginEditorConfig;
  customTooltip: string;
  relValue: RelValue;
  anchorTarget: AnchorTarget;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.BUTTON,
      tooltip: customTooltip || t('ButtonPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      componentData: DEFAULTS,
      section: 'BlockToolbar_Section_Advanced',
    },
  ];
};

export default createInsertButtons;
