import { BUTTONS } from 'wix-rich-content-plugin-commons';
import { getModalStyles, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { MediaReplaceIcon } from '../icons';
import GiphyInsertModal from './giphyInsertModal';
import { MOBILE_FULL_SCREEN_CUSTOM_STYLE, DESKTOP_FLY_OUT_MODAL_STYLES } from '../constants';
import type { CreateInlineButtons, TranslationFunction } from 'wix-rich-content-common';
import type { GiphyPluginEditorConfig } from '../types';

const createInlineButtons: CreateInlineButtons = ({
  t,
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: GiphyPluginEditorConfig;
  isMobile: boolean;
}) => {
  const icon = settings?.toolbar?.icons?.replace || MediaReplaceIcon;
  const modalStyles = isMobile
    ? getModalStyles({ customStyles: MOBILE_FULL_SCREEN_CUSTOM_STYLE, fullScreen: true, isMobile })
    : undefined;
  return [
    { keyName: 'sizeOriginal', type: BUTTONS.SIZE_ORIGINAL, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon,
      modalElement: decorateComponentWithProps(GiphyInsertModal, settings),
      modalStyles,
      modalStylesFn: ({ buttonRef }) => {
        const modalStyles = getModalStyles({
          customStyles: DESKTOP_FLY_OUT_MODAL_STYLES,
          fullScreen: true,
          isMobile,
        });
        const { top, left } = buttonRef.getBoundingClientRect();
        const modalLeft = left - 15;
        const modalTop = top > 357 ? top - 365 : top + 30;
        return {
          ...modalStyles,
          content: {
            ...modalStyles.content,
            top: modalTop,
            left: modalLeft,
            margin: 0,
            position: 'absolute',
          },
        };
      },
      mobile: true,
      tooltipTextKey: 'ReplaceGiphyButton_Tooltip',
      t,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
