import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './collapsible-list-component';
import type { CollapsibleListPluginEditorConfig } from './types';
import { COLLAPSIBLE_LIST_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import type { CreatePluginFunction } from 'wix-rich-content-common';

const createCollapsibleListPlugin: CreatePluginFunction<
  CollapsibleListPluginEditorConfig
> = config => {
  const {
    localeContent,
    locale,
    helpers,
    t,
    [COLLAPSIBLE_LIST_TYPE]: settings = {},
    isMobile,
    disableKeyboardEvents,
    ...rest
  } = config;

  return createBasePlugin({
    component: Component,
    type: COLLAPSIBLE_LIST_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      settings,
      isMobile,
      locale: localeContent || locale,
      disableKeyboardEvents,
    }),
    helpers,
    settings,
    t,
    isMobile,
    defaultPluginData: DEFAULTS,
    noPluginBorder: true,
    noPointerEventsOnFocus: true,
    locale: localeContent || locale,
    disableKeyboardEvents,
    ...rest,
  });
};

createCollapsibleListPlugin.functionName = COLLAPSIBLE_LIST_TYPE;

export { createCollapsibleListPlugin };
