import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from './types';

/* eslint-disable camelcase */
export const ALIGN_CENTER = 'center';
export const settingsTabValue = 'settings';
export const designTabValue = 'design';
export const BUTTON_TYPES = ['primary', 'secondary'];
export const DEFAULT_COLOR = '#000000';
export const DEFAULT_SELECTION_COLOR = '#000000';
export const COLOR_PICKER_TYPE = Object.freeze({
  TEXT_COLOR: 'textColor',
  BORDER_COLOR: 'borderColor',
  BACKGROUND_COLOR: 'backgroundColor',
});

export const DEFAULT_CONFIG = {
  alignment: ALIGN_CENTER,
  size: 'small',
  width: 'fit-content',
};

export const BUTTON_BUTTONS = {
  alignment: 'buttonAlignment',
};

export const buttonsModals = {
  [ACTION_BUTTON_TYPE]: 'actionButtonSettingsModal',
  [LINK_BUTTON_TYPE]: 'linkButtonSettingsModal',
};
