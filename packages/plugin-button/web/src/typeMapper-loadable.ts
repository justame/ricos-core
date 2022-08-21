import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from './types';
import { alignmentClassName, sizeClassName } from './classNameStrategies';
import type { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

const buttonTypeObj = {
  component: loadable(() => import('./button-component')),
  classNameStrategies: { alignment: alignmentClassName, size: sizeClassName },
};

export const typeMapper: PluginTypeMapper = () => ({
  [LINK_BUTTON_TYPE]: { ...buttonTypeObj },
  [ACTION_BUTTON_TYPE]: { ...buttonTypeObj },
});
