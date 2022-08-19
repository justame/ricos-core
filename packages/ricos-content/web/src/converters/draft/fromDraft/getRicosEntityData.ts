import { pickBy, identity } from 'lodash';
/* eslint-disable fp/no-delete */
import type { TextStyle, NodeStyle } from 'ricos-schema';
import type { RicosEntityMap, RicosContentBlock } from '../../../types';
import {
  LINK_PREVIEW_TYPE,
  EMBED_TYPE,
  COLLAPSIBLE_LIST_TYPE,
  TABLE_TYPE,
  DIVIDER_TYPE,
  NO_WRAP,
} from '../../../consts';
import { TO_RICOS_DATA_FIELD, TO_RICOS_PLUGIN_TYPE } from '../consts';
import { convertBlockDataToRicos } from './convertRicosPluginData';

const normalizeBlockData = (type, data) => {
  if (type === DIVIDER_TYPE) {
    data.config = data.config || { textWrap: NO_WRAP };
  }
};

export const getEntity = (key: string | number, entityMap: RicosEntityMap) => {
  if (!entityMap[key]) {
    console.error(`Invalid entity key '${key}' -- entry does not exist.`);
    return null;
  }
  const { type, data } = entityMap[key];
  const blockType = type === LINK_PREVIEW_TYPE && data.html ? EMBED_TYPE : type;
  const dataFieldName = TO_RICOS_DATA_FIELD[blockType];
  if (dataFieldName === undefined) {
    console.error(`Unknown entity type "${blockType}"!`);
    return null;
  }

  if (!data) {
    console.error(`no data for "${blockType}"!`);
    return null;
  }

  normalizeBlockData(type, data);

  const advancedPluginsAdditionalData = {
    [COLLAPSIBLE_LIST_TYPE]: { pairs: data?.pairs },
    [TABLE_TYPE]: { rows: data?.config?.rows },
  };

  return {
    type: TO_RICOS_PLUGIN_TYPE[blockType],
    [dataFieldName]: convertBlockDataToRicos(blockType, data),
    ...(advancedPluginsAdditionalData[blockType] || {}),
  };
};

export const getTextStyle = (blockData?: RicosContentBlock['data']): TextStyle => {
  const { textAlignment, dynamicStyles } = blockData || {};
  const { 'line-height': lineHeight } = dynamicStyles || {};
  return { textAlignment: textAlignment?.toUpperCase(), lineHeight };
};

export const getNodeStyle = (blockData?: RicosContentBlock['data']): NodeStyle | undefined => {
  const { dynamicStyles } = blockData || {};
  const {
    'padding-top': paddingTop,
    'padding-bottom': paddingBottom,
    backgroundColor,
  } = dynamicStyles || {};
  const style = pickBy({ paddingTop, paddingBottom, backgroundColor }, identity);
  const hasStyle = Object.values(style).length > 0;
  return hasStyle ? style : undefined;
};
