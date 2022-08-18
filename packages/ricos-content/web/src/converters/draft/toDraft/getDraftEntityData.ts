/* eslint-disable fp/no-delete */
import type { Node } from '@justame-ricos/ricos-schema';
import { Node_Type, ButtonData_Type } from '@justame-ricos/ricos-schema';
import {
  ENTITY_DECORATION_TO_MUTABILITY,
  FROM_RICOS_ENTITY_TYPE,
  TO_RICOS_DECORATION_TYPE,
} from '../consts';
import {
  ACTION_BUTTON_TYPE,
  LINK_BUTTON_TYPE,
  LINK_PREVIEW_TYPE,
  RICOS_NODE_TYPE_TO_DATA_FIELD,
} from '../../../consts';
import type { RicosEntity, RicosEntityMap } from '../../../types';
import type { DraftTypedDecoration } from './decorationParsers';
import { convertDecorationToDraftData, convertNodeToDraftData } from './convertDraftPluginData';

const getNodeEntityData = (node: Node) => {
  const { type } = node;
  let draftPluginType = FROM_RICOS_ENTITY_TYPE[type];
  if (type === Node_Type.BUTTON) {
    draftPluginType =
      node.buttonData?.type === ButtonData_Type.ACTION ? ACTION_BUTTON_TYPE : LINK_BUTTON_TYPE;
  } else if (type === Node_Type.EMBED) {
    draftPluginType = LINK_PREVIEW_TYPE;
  }
  const data = convertNodeToDraftData(node);
  if (data === undefined) {
    // eslint-disable-next-line no-console
    throw Error(`ERROR! Unknown entity type "${type}"!`);
  }
  return { type: draftPluginType, data };
};

export const createDecorationEntityData = (
  decoration: DraftTypedDecoration,
  entityKey: number
): RicosEntityMap => {
  const { type, emojiData } = decoration;

  const data =
    emojiData ||
    convertDecorationToDraftData({
      ...decoration,
      type: TO_RICOS_DECORATION_TYPE[type],
    });
  if (data === undefined) {
    // eslint-disable-next-line no-console
    throw Error(`ERROR! Unknown entity type "${type}"!`);
  }

  const mutability = ENTITY_DECORATION_TO_MUTABILITY[type];
  return createEntity(entityKey, { type, mutability, data });
};

export const createAtomicEntityData = (node: Node, entityKey: number): RicosEntityMap => {
  const { type, data } = getNodeEntityData(node);
  return createEntity(entityKey, { type, mutability: 'IMMUTABLE', data });
};

const getDynamicStyles = (node: Node) => {
  const { textStyle } = node[RICOS_NODE_TYPE_TO_DATA_FIELD[node.type]] || {};
  const { textAlignment, lineHeight } = textStyle || {};
  const { paddingTop, paddingBottom } = node.style || {};
  return {
    textAlignment,
    lineHeight,
    paddingTop,
    paddingBottom,
  };
};

export const createTextBlockData = (node: Node) => {
  const { indentation = 0 } = node[RICOS_NODE_TYPE_TO_DATA_FIELD[node.type]] || {};
  const { textAlignment, lineHeight, paddingTop, paddingBottom } = getDynamicStyles(node);
  return JSON.parse(
    JSON.stringify({
      textAlignment: textAlignment !== 'AUTO' ? textAlignment?.toLowerCase() : undefined,
      dynamicStyles: (paddingTop || paddingBottom || lineHeight) && {
        'padding-top': paddingTop,
        'padding-bottom': paddingBottom,
        'line-height': lineHeight,
      },
      depth: indentation,
    })
  );
};

const createEntity = (key: number, { type, mutability, data }: RicosEntity): RicosEntityMap => {
  return { [key.toString()]: { type, mutability, data } };
};
