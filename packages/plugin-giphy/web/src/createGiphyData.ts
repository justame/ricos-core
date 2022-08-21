import { merge } from 'lodash';
import { DEFAULTS } from './constants';
import type { CreatePluginsDataMap, RICOS_GIPHY_TYPE } from 'wix-rich-content-common';
import { Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createGiphyData: CreatePluginsDataMap[typeof RICOS_GIPHY_TYPE] | any = (
  pluginData = {},
  isRicosSchema = false
) => {
  const giphyData = isRicosSchema ? convertNodeDataToDraft(Node_Type.GIF, pluginData) : pluginData;
  return merge({}, DEFAULTS, giphyData);
};
