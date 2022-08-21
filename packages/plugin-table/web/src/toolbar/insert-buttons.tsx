import { getDefaultsSettings } from '../tableUtil';
import {
  TOOLBARS,
  BUTTON_TYPES,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import type { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import tableInsertModal from './tableInsertModal';
import {
  DesktopFlyOutModalStyles,
  externalPopupStyles,
  MOBILE_FULL_SCREEN_CUSTOM_STYLE,
} from '../consts';
import type { TablePluginEditorConfig } from '../types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: TablePluginEditorConfig;
  isMobile: boolean;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const buttonProps = {
    type: BUTTON_TYPES.MODAL,
    name: 'TablePlugin_InsertButton',
    getLabel: () => t('TablePlugin_InsertButton'),
    tooltip: t('TablePlugin_InsertButton_Tooltip'),
    getIcon: () => icon,
    isActive: () => false,
    isDisabled: () => false,
    componentData: getDefaultsSettings(),
    modalElement: decorateComponentWithProps(tableInsertModal, { ...settings, isMobile }),
  };
  return [
    {
      ...buttonProps,
      toolbars: [TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
      modalStylesFn: ({ buttonRef, toolbarName }) => {
        return getBottomToolbarModalStyles(
          buttonRef,
          {
            customStyles: DesktopFlyOutModalStyles,
            isMobile,
          },
          toolbarName
        );
      },
      modalStyles: isMobile
        ? getModalStyles({
            customStyles: MOBILE_FULL_SCREEN_CUSTOM_STYLE,
            fullScreen: true,
            isMobile,
          })
        : undefined,
      section: 'BlockToolbar_Section_Advanced',
    },
    {
      ...buttonProps,
      modalStyles: getModalStyles({
        customStyles: isMobile ? {} : externalPopupStyles,
        fullScreen: false,
        isMobile,
      }),
      toolbars: [TOOLBARS.INSERT_PLUGIN],
    },
  ];
};

export default createInsertButtons;
