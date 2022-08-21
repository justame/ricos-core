import CollapsibleListViewer from './collapsible-list-viewer';
import { COLLAPSIBLE_LIST_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [COLLAPSIBLE_LIST_TYPE]: { component: CollapsibleListViewer },
});
