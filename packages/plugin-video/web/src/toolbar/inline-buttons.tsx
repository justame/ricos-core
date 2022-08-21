import { BUTTONS, PluginSettingsIcon } from 'wix-rich-content-plugin-commons';
import { getModalStyles, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { MediaReplaceIcon } from '../icons';
import { Modals } from '../modals';
import VideoModal from './videoModal';
import {
  DesktopFlyOutModalStyles,
  MOBILE_FULL_SCREEN_CUSTOM_STYLE,
} from 'wix-rich-content-ui-components';
import {
  SelectionModalCustomStyle,
  ExtendedSelectionModalCustomStyle,
} from './selectionModalCustomStyles';
import type {
  CreateInlineButtons,
  TranslationFunction,
  AvailableExperiments,
} from 'wix-rich-content-common';
import type { VideoPluginEditorConfig } from '../types';
import { VIDEO_TYPE } from '../types';
import { videoModalContentStyles } from '../constants';

const createInlineButtons: CreateInlineButtons = ({
  t,
  settings,
  isMobile,
  experiments = {},
}: {
  t: TranslationFunction;
  settings: VideoPluginEditorConfig;
  isMobile: boolean;
  experiments: AvailableExperiments;
}) => {
  //apply the extended input modal styles if handleFileSelection is avilable in plugin config
  //& on mobile if enableCustomUploadOnMobile is set to true, otherwise the normal modal styles is applied
  const { spoilerInInlineToolbar, newVideoVerticalAndSocialModals } = experiments;
  const useNewModal = newVideoVerticalAndSocialModals?.enabled;
  const icon = settings?.toolbar?.icons?.replace || MediaReplaceIcon;

  const defaultCustomStyles =
    (!isMobile || settings.enableCustomUploadOnMobile) &&
    (settings.handleFileSelection || settings.handleFileUpload)
      ? ExtendedSelectionModalCustomStyle
      : SelectionModalCustomStyle;

  const newModalCustomStyles = isMobile
    ? MOBILE_FULL_SCREEN_CUSTOM_STYLE
    : { ...DesktopFlyOutModalStyles, content: videoModalContentStyles };
  const customStyles = useNewModal ? newModalCustomStyles : defaultCustomStyles;

  const modalsStyle = getModalStyles({
    customStyles,
    fullScreen: !!useNewModal,
    isMobile,
  });

  const newModalStyles = isMobile ? modalsStyle : undefined;

  const modalStyles = useNewModal ? newModalStyles : modalsStyle;

  const spoilerButton =
    settings.spoiler && spoilerInInlineToolbar?.enabled
      ? [
          {
            keyName: 'spoiler',
            type: BUTTONS.SPOILER,
            mobile: true,
          },
        ]
      : [];
  const settingsButton = !spoilerInInlineToolbar?.enabled
    ? [
        {
          keyName: 'settings',
          type: BUTTONS.VIDEO_SETTINGS,
          fullHeight: true,
          icon: PluginSettingsIcon,
          modalName: Modals.VIDEO_SETTINGS,
          modalStyles: getModalStyles({
            isMobile,
          }),
          t,
          mobile: true,
          tooltipTextKey: 'SettingsButton_Tooltip',
          settings,
          triggerSettingsBi: true,
          pluginId: VIDEO_TYPE,
        },
      ]
    : [];

  return [
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    ...spoilerButton,
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon,
      modalElement: decorateComponentWithProps(VideoModal, {
        ...settings,
      }),
      modalStylesFn: useNewModal
        ? ({ buttonRef }) => {
            const modalStyles = getModalStyles({
              customStyles,
              fullScreen: true,
              isMobile,
            });
            const { top, left } = buttonRef.getBoundingClientRect();
            const modalLeft = left - 15;
            const modalTop = top > 250 ? top - 250 : top + 38;
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
          }
        : undefined,
      modalStyles,
      mobile: true,
      tooltipTextKey: 'ReplaceVideoButton_Tooltip',
      t,
    },
    ...settingsButton,
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
