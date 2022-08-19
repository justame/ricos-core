import { Decoration_Type, Node_Type } from 'ricos-schema';
import { fromEntries } from 'ricos-content/libs/utils';

export const NODE_TYPES = [
  Node_Type.PARAGRAPH,
  Node_Type.TEXT,
  Node_Type.HEADING,
  Node_Type.BULLETED_LIST,
  Node_Type.ORDERED_LIST,
  Node_Type.LIST_ITEM,
  Node_Type.BLOCKQUOTE,
  Node_Type.CODE_BLOCK,
  Node_Type.VIDEO,
  Node_Type.DIVIDER,
  Node_Type.FILE,
  Node_Type.GALLERY,
  Node_Type.GIF,
  Node_Type.HTML,
  Node_Type.IMAGE,
  Node_Type.LINK_PREVIEW,
  Node_Type.MAP,
  Node_Type.POLL,
  Node_Type.APP_EMBED,
  Node_Type.BUTTON,
  Node_Type.COLLAPSIBLE_LIST,
  Node_Type.COLLAPSIBLE_ITEM,
  Node_Type.COLLAPSIBLE_ITEM_TITLE,
  Node_Type.COLLAPSIBLE_ITEM_BODY,
  Node_Type.TABLE,
  Node_Type.TABLE_ROW,
  Node_Type.TABLE_CELL,
  Node_Type.EMBED,
  Node_Type.AUDIO,
];

export const NODE_MAP = fromEntries(NODE_TYPES.map(v => [v, v]));

export const DECORATION_TYPES = [
  Decoration_Type.BOLD,
  Decoration_Type.ITALIC,
  Decoration_Type.UNDERLINE,
  Decoration_Type.SPOILER,
  Decoration_Type.ANCHOR,
  Decoration_Type.MENTION,
  Decoration_Type.LINK,
  Decoration_Type.COLOR,
  Decoration_Type.FONT_SIZE,
];
