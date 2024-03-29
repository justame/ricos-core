import TableViewer from './table-viewer';
import { TABLE_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [TABLE_TYPE]: { component: TableViewer, withHorizontalScroll: true },
});
