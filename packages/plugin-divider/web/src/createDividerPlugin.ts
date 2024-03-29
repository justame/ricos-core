import type { CreatePluginFunction } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';

import { DEFAULTS } from './defaults';
import type { DividerPluginEditorConfig } from './types';
import { DIVIDER_TYPE } from './types';
import DividerComponent from './divider-component';
import createToolbar from './toolbar/createToolbar';
import Styles from '../statics/styles/default-styles.scss';

const createDividerPlugin: CreatePluginFunction<DividerPluginEditorConfig> = config => {
  const type = DIVIDER_TYPE;
  const { helpers, theme, t, [type]: settings = {}, ...rest } = config;

  const styles = mergeStyles({ styles: Styles, theme });

  return createBasePlugin({
    component: DividerComponent,
    settings,
    theme,
    type,
    toolbar: createToolbar({
      settings,
      helpers,
      styles,
      theme,
      t,
    }),
    helpers,
    t,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

createDividerPlugin.functionName = DIVIDER_TYPE;

export { createDividerPlugin, DIVIDER_TYPE };
