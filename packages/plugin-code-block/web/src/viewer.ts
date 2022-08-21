import { default as CodeBlockDecorator } from './PrismDecorator';

import type { CodeBlockPluginViewerConfig } from './types';
import { CODE_BLOCK_TYPE } from './types';
export { CodeBlockDecorator, CODE_BLOCK_TYPE, CodeBlockPluginViewerConfig };
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';

export const pluginCodeBlock: ViewerPluginCreator<CodeBlockPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: CODE_BLOCK_TYPE,
    decorator: theme => new CodeBlockDecorator(theme),
  };
};
