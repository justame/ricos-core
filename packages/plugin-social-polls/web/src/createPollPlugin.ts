import { createBasePlugin } from 'wix-rich-content-plugin-commons';

import { createToolbar } from './toolbar/createToolbar';
import { PollEditor } from './components';
import type { PollPluginEditorConfig } from './types';
import { POLL_TYPE } from './types';
import type { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULT_COMPONENT_DATA } from './defaults';

const createPollPlugin: CreatePluginFunction<PollPluginEditorConfig> = config => {
  const { helpers, theme, t, [POLL_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: PollEditor,
    settings,
    theme,
    type: POLL_TYPE,
    toolbar: createToolbar({ isMobile, settings, t }),
    helpers,
    t,
    isMobile,
    defaultPluginData: DEFAULT_COMPONENT_DATA,
    ...rest,
  });
};

createPollPlugin.functionName = POLL_TYPE;

export { createPollPlugin };
