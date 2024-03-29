import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from './types';
import { alignmentClassName, sizeClassName } from './classNameStrategies';
import ButtonViewer from './button-component';
import type { PluginTypeMapper } from 'wix-rich-content-common';

const buttonTypeObj = {
  component: ButtonViewer,
  classNameStrategies: { alignment: alignmentClassName, size: sizeClassName },
};

export const typeMapper: PluginTypeMapper = () => ({
  [LINK_BUTTON_TYPE]: { ...buttonTypeObj },
  [ACTION_BUTTON_TYPE]: { ...buttonTypeObj },
});
