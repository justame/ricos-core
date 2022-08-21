import { DEFAULTS } from '../audio-component';
import {
  TOOLBARS,
  BUTTON_TYPES,
  INSERT_PLUGIN_BUTTONS,
  decorateComponentWithProps,
  getModalStyles,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-editor-common';
import InsertPluginIcon from '../icons/InsertPluginIcon';
import type { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import {
  DesktopFlyOutModalStyles,
  MOBILE_FULL_SCREEN_CUSTOM_STYLE,
  SoundCloudIcon,
  SpotifyIcon,
} from 'wix-rich-content-ui-components';
import { audioButtonsTypes } from '../types';
import type { AudioPluginEditorConfig } from '../types';
import { audioModalContentStyles } from '../consts';
import AudioModal from '../modals/AudioModal';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  disableDownload = true,
  isMobile,
}: {
  t: TranslationFunction;
  settings: AudioPluginEditorConfig;
  isMobile: boolean;
  disableDownload: boolean;
}) => {
  const componentData = {
    ...DEFAULTS,
    disableDownload: settings?.disableDownload ?? disableDownload,
  };
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const { exposeButtons = [audioButtonsTypes.audio] } = settings || {};

  const customStyles = isMobile
    ? MOBILE_FULL_SCREEN_CUSTOM_STYLE
    : { ...DesktopFlyOutModalStyles, content: audioModalContentStyles };

  const modalStyles = isMobile
    ? getModalStyles({
        customStyles,
        fullScreen: true,
        isMobile,
      })
    : undefined;

  const embedModal = decorateComponentWithProps(AudioModal, {
    ...settings,
    embedType: true,
  });

  const buttonsMap = {
    [audioButtonsTypes.audio]: {
      name: INSERT_PLUGIN_BUTTONS.AUDIO,
      modalElement: decorateComponentWithProps(AudioModal, { ...settings, componentData }),
      tooltip: t('AudioPlugin_InsertButton_Tooltip'),
      getIcon: () => icon,
    },
    [audioButtonsTypes.soundCloud]: {
      name: INSERT_PLUGIN_BUTTONS.SOUND_CLOUD,
      modalElement: embedModal,
      tooltip: t('SoundCloudPlugin_InsertButton_Tooltip'),
      getIcon: () => SoundCloudIcon,
      section: 'BlockToolbar_Section_Embed_Anywhere',
    },
    [audioButtonsTypes.spotify]: {
      name: INSERT_PLUGIN_BUTTONS.SPOTIFY,
      modalElement: embedModal,
      tooltip: t('Spotify_InsertButton_Tooltip'),
      getIcon: () => SpotifyIcon,
      section: 'BlockToolbar_Section_Embed_Anywhere',
    },
  };
  const baseButtonProps = {
    type: BUTTON_TYPES.MODAL,
    toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
    componentData,
  };

  const audioButtons = exposeButtons.map(buttonType => ({
    ...buttonsMap[buttonType],
    modalStyles,
    modalStylesFn: ({ buttonRef, toolbarName }) => {
      return getBottomToolbarModalStyles(
        buttonRef,
        {
          customStyles,
        },
        toolbarName
      );
    },
    ...baseButtonProps,
  }));

  return audioButtons;
};
export default createInsertButtons;
