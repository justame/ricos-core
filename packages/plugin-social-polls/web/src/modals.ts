import { SettingsModal } from './components/settings';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { POLL_TYPE } from './types';

const Modals = {
  POLL_SETTINGS: 'poll-settings',
};

const ModalsMap = {
  [Modals.POLL_SETTINGS]: decorateComponentWithProps(SettingsModal, { pluginId: POLL_TYPE }),
};

export { Modals, ModalsMap };
