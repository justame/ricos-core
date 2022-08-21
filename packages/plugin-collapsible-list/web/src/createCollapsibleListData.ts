import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import type { CreatePluginsDataMap, RICOS_COLLAPSIBLE_LIST_TYPE } from 'wix-rich-content-common';
import { Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createCollapsibleListData:
  | CreatePluginsDataMap[typeof RICOS_COLLAPSIBLE_LIST_TYPE]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | any = (pluginData = {}, isRicosSchema = false) => {
  const collapsibleListData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.COLLAPSIBLE_LIST, pluginData)
    : pluginData;
  return merge({}, DEFAULTS, collapsibleListData);
};
