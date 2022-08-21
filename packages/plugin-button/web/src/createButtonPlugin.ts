import createToolbar from './toolbar/createToolbar';
import type { CreatePluginFunction, CreatePluginConfig } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import {
  createBasePlugin,
  PLUGIN_DECORATION_PROPS,
  PLUGIN_DECORATIONS,
} from 'wix-rich-content-plugin-commons';

import type {
  LinkButtonPluginEditorConfig,
  ActionButtonPluginEditorConfig,
  ButtonPluginEditorConfig,
} from './types';
import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from './types';
import { DEFAULTS } from './defaults';

import Styles from '../statics/styles/default-styles.scss';
import ButtonComponent from './button-component';
import { isNumber } from 'lodash';

const createLinkButtonPlugin: CreatePluginFunction<LinkButtonPluginEditorConfig> = config => {
  return createButtonPlugin(LINK_BUTTON_TYPE, config);
};

const createActionButtonPlugin: CreatePluginFunction<ActionButtonPluginEditorConfig> = config => {
  return createButtonPlugin(ACTION_BUTTON_TYPE, config);
};

const createButtonPlugin = (
  type: typeof LINK_BUTTON_TYPE | typeof ACTION_BUTTON_TYPE,
  config: CreatePluginConfig<ButtonPluginEditorConfig>
) => {
  const {
    helpers,
    theme,
    themeData,
    t,
    anchorTarget,
    relValue,
    isMobile,
    [type]: settings = {},
    ...rest
  } = config;
  const isLinkButton = type === LINK_BUTTON_TYPE;
  settings.isActionButton = !isLinkButton;
  settings.themeData = themeData;
  const styles = mergeStyles({ styles: Styles, theme });
  const customTooltip = settings.insertButtonTooltip;
  return createBasePlugin({
    component: ButtonComponent,
    settings,
    theme,
    themeData,
    type,
    anchorTarget,
    relValue,
    toolbar: createToolbar({
      settings,
      helpers,
      styles,
      t,
      isMobile,
      customTooltip,
      relValue,
      anchorTarget,
      type,
    }),
    helpers,
    t,
    defaultPluginData: DEFAULTS,
    isMobile,
    pluginDecorationProps: (props, componentData) => {
      const width = componentData.config?.width;
      let calulatedProps = props;
      if (!isNumber(width)) {
        calulatedProps = {
          ...props,
          width,
          style: {
            ...props.style,
            width,
          },
        };
      }
      return PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](calulatedProps);
    },
    componentWillReceiveDecorationProps: (props, nextProps, onPropsChange) => {
      const { width } = PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](props);
      const { width: nextWidth } =
        PLUGIN_DECORATION_PROPS[PLUGIN_DECORATIONS.RESIZEABLE](nextProps);
      if (width !== nextWidth) {
        onPropsChange({ width: nextWidth, size: 'inline' });
      }
    },
    ...rest,
  });
};

createButtonPlugin.functionName = 'wix-rich-content-plugin-button';

export { createLinkButtonPlugin, createActionButtonPlugin, LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE };
