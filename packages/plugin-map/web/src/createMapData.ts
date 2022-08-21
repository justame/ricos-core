import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import type { CreatePluginsDataMap, RICOS_MAP_TYPE } from 'wix-rich-content-common';
import { Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMapData: CreatePluginsDataMap[typeof RICOS_MAP_TYPE] | any = (
  pluginData = {},
  isRicosSchema = false
) => {
  const mapData = isRicosSchema ? convertNodeDataToDraft(Node_Type.MAP, pluginData) : pluginData;
  return merge({}, DEFAULTS, mapData);
};
