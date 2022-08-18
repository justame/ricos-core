/* eslint-disable */
import { Timestamp } from '../../../google/protobuf/timestamp';
import { ButtonData } from './plugin_button';
import { CodeBlockData } from './node_code_block';
import { DividerData } from './plugin_divider';
import { FileData } from './plugin_file';
import { GalleryData } from './plugin_gallery';
import { GIFData } from './plugin_gif';
import { HeadingData } from './node_heading';
import { HTMLData } from './plugin_html';
import { ImageData } from './plugin_image';
import { LinkPreviewData } from './plugin_link_preview';
import { MapData } from './plugin_map';
import { ParagraphData } from './node_paragraph';
import { PollData } from './plugin_poll';
import { AppEmbedData } from './plugin_app_embed';
import { VideoData } from './plugin_video';
import { EmbedData } from './plugin_embed';
import { CollapsibleListData } from './plugin_collapsible_list';
import { TableData } from './plugin_table';
import { TableCellData } from './plugin_table_cell';
import { Struct } from './struct';
import { AudioData } from './plugin_audio';
import { OrderedListData, BulletedListData } from './node_list';
import { BlockquoteData } from './node_blockquote';
import { AnchorData } from './decoration_anchor';
import { ColorData } from './decoration_color';
import { LinkData } from './decoration_link';
import { MentionData } from './decoration_mention';
import { FontSizeData } from './decoration_fontsize';

export interface RichContent {
  /** List of nodes */
  nodes: Node[];
  metadata?: Metadata;
  documentStyle?: DocumentStyle;
}

export interface Node {
  /** Node type */
  type: Node_Type;
  /** Node unique identifier */
  id: string;
  /** List of child nodes */
  nodes: Node[];
  style?: NodeStyle;
  buttonData?: ButtonData | undefined;
  codeBlockData?: CodeBlockData | undefined;
  dividerData?: DividerData | undefined;
  fileData?: FileData | undefined;
  galleryData?: GalleryData | undefined;
  gifData?: GIFData | undefined;
  headingData?: HeadingData | undefined;
  htmlData?: HTMLData | undefined;
  imageData?: ImageData | undefined;
  linkPreviewData?: LinkPreviewData | undefined;
  mapData?: MapData | undefined;
  paragraphData?: ParagraphData | undefined;
  pollData?: PollData | undefined;
  textData?: TextData | undefined;
  appEmbedData?: AppEmbedData | undefined;
  videoData?: VideoData | undefined;
  embedData?: EmbedData | undefined;
  collapsibleListData?: CollapsibleListData | undefined;
  tableData?: TableData | undefined;
  tableCellData?: TableCellData | undefined;
  externalData?: Struct | undefined;
  audioData?: AudioData | undefined;
  orderedListData?: OrderedListData | undefined;
  bulletedListData?: BulletedListData | undefined;
  blockquoteData?: BlockquoteData | undefined;
}

export const enum Node_Type {
  PARAGRAPH = 0,
  TEXT = 1,
  HEADING = 2,
  BULLETED_LIST = 3,
  ORDERED_LIST = 4,
  LIST_ITEM = 5,
  BLOCKQUOTE = 6,
  CODE_BLOCK = 7,
  VIDEO = 8,
  DIVIDER = 9,
  FILE = 10,
  GALLERY = 11,
  GIF = 12,
  HTML = 13,
  IMAGE = 14,
  LINK_PREVIEW = 15,
  MAP = 16,
  POLL = 17,
  APP_EMBED = 18,
  BUTTON = 19,
  COLLAPSIBLE_LIST = 20,
  TABLE = 21,
  EMBED = 22,
  COLLAPSIBLE_ITEM = 23,
  COLLAPSIBLE_ITEM_TITLE = 24,
  COLLAPSIBLE_ITEM_BODY = 25,
  TABLE_CELL = 26,
  TABLE_ROW = 27,
  EXTERNAL = 28,
  AUDIO = 29,
  UNRECOGNIZED = -1,
}

export function node_TypeFromJSON(object: any): Node_Type {
  switch (object) {
    case 0:
    case 'PARAGRAPH':
      return Node_Type.PARAGRAPH;
    case 1:
    case 'TEXT':
      return Node_Type.TEXT;
    case 2:
    case 'HEADING':
      return Node_Type.HEADING;
    case 3:
    case 'BULLETED_LIST':
      return Node_Type.BULLETED_LIST;
    case 4:
    case 'ORDERED_LIST':
      return Node_Type.ORDERED_LIST;
    case 5:
    case 'LIST_ITEM':
      return Node_Type.LIST_ITEM;
    case 6:
    case 'BLOCKQUOTE':
      return Node_Type.BLOCKQUOTE;
    case 7:
    case 'CODE_BLOCK':
      return Node_Type.CODE_BLOCK;
    case 8:
    case 'VIDEO':
      return Node_Type.VIDEO;
    case 9:
    case 'DIVIDER':
      return Node_Type.DIVIDER;
    case 10:
    case 'FILE':
      return Node_Type.FILE;
    case 11:
    case 'GALLERY':
      return Node_Type.GALLERY;
    case 12:
    case 'GIF':
      return Node_Type.GIF;
    case 13:
    case 'HTML':
      return Node_Type.HTML;
    case 14:
    case 'IMAGE':
      return Node_Type.IMAGE;
    case 15:
    case 'LINK_PREVIEW':
      return Node_Type.LINK_PREVIEW;
    case 16:
    case 'MAP':
      return Node_Type.MAP;
    case 17:
    case 'POLL':
      return Node_Type.POLL;
    case 18:
    case 'APP_EMBED':
      return Node_Type.APP_EMBED;
    case 19:
    case 'BUTTON':
      return Node_Type.BUTTON;
    case 20:
    case 'COLLAPSIBLE_LIST':
      return Node_Type.COLLAPSIBLE_LIST;
    case 21:
    case 'TABLE':
      return Node_Type.TABLE;
    case 22:
    case 'EMBED':
      return Node_Type.EMBED;
    case 23:
    case 'COLLAPSIBLE_ITEM':
      return Node_Type.COLLAPSIBLE_ITEM;
    case 24:
    case 'COLLAPSIBLE_ITEM_TITLE':
      return Node_Type.COLLAPSIBLE_ITEM_TITLE;
    case 25:
    case 'COLLAPSIBLE_ITEM_BODY':
      return Node_Type.COLLAPSIBLE_ITEM_BODY;
    case 26:
    case 'TABLE_CELL':
      return Node_Type.TABLE_CELL;
    case 27:
    case 'TABLE_ROW':
      return Node_Type.TABLE_ROW;
    case 28:
    case 'EXTERNAL':
      return Node_Type.EXTERNAL;
    case 29:
    case 'AUDIO':
      return Node_Type.AUDIO;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Node_Type.UNRECOGNIZED;
  }
}

export function node_TypeToJSON(object: Node_Type): string {
  switch (object) {
    case Node_Type.PARAGRAPH:
      return 'PARAGRAPH';
    case Node_Type.TEXT:
      return 'TEXT';
    case Node_Type.HEADING:
      return 'HEADING';
    case Node_Type.BULLETED_LIST:
      return 'BULLETED_LIST';
    case Node_Type.ORDERED_LIST:
      return 'ORDERED_LIST';
    case Node_Type.LIST_ITEM:
      return 'LIST_ITEM';
    case Node_Type.BLOCKQUOTE:
      return 'BLOCKQUOTE';
    case Node_Type.CODE_BLOCK:
      return 'CODE_BLOCK';
    case Node_Type.VIDEO:
      return 'VIDEO';
    case Node_Type.DIVIDER:
      return 'DIVIDER';
    case Node_Type.FILE:
      return 'FILE';
    case Node_Type.GALLERY:
      return 'GALLERY';
    case Node_Type.GIF:
      return 'GIF';
    case Node_Type.HTML:
      return 'HTML';
    case Node_Type.IMAGE:
      return 'IMAGE';
    case Node_Type.LINK_PREVIEW:
      return 'LINK_PREVIEW';
    case Node_Type.MAP:
      return 'MAP';
    case Node_Type.POLL:
      return 'POLL';
    case Node_Type.APP_EMBED:
      return 'APP_EMBED';
    case Node_Type.BUTTON:
      return 'BUTTON';
    case Node_Type.COLLAPSIBLE_LIST:
      return 'COLLAPSIBLE_LIST';
    case Node_Type.TABLE:
      return 'TABLE';
    case Node_Type.EMBED:
      return 'EMBED';
    case Node_Type.COLLAPSIBLE_ITEM:
      return 'COLLAPSIBLE_ITEM';
    case Node_Type.COLLAPSIBLE_ITEM_TITLE:
      return 'COLLAPSIBLE_ITEM_TITLE';
    case Node_Type.COLLAPSIBLE_ITEM_BODY:
      return 'COLLAPSIBLE_ITEM_BODY';
    case Node_Type.TABLE_CELL:
      return 'TABLE_CELL';
    case Node_Type.TABLE_ROW:
      return 'TABLE_ROW';
    case Node_Type.EXTERNAL:
      return 'EXTERNAL';
    case Node_Type.AUDIO:
      return 'AUDIO';
    default:
      return 'UNKNOWN';
  }
}

export interface NodeStyle {
  paddingTop?: string;
  paddingBottom?: string;
  backgroundColor?: string;
}

export interface TextData {
  /** Textual data */
  text: string;
  /** List of decorations */
  decorations: Decoration[];
}

/** Adds appearence changes to text */
export interface Decoration {
  /** Decoration type */
  type: Decoration_Type;
  anchorData?: AnchorData | undefined;
  colorData?: ColorData | undefined;
  linkData?: LinkData | undefined;
  mentionData?: MentionData | undefined;
  fontSizeData?: FontSizeData | undefined;
  fontWeightValue?: number;
  italicData?: boolean;
  underlineData?: boolean;
}

export const enum Decoration_Type {
  BOLD = 0,
  ITALIC = 1,
  UNDERLINE = 2,
  SPOILER = 3,
  ANCHOR = 4,
  MENTION = 5,
  LINK = 6,
  COLOR = 7,
  FONT_SIZE = 8,
  EXTERNAL = 9,
  UNRECOGNIZED = -1,
}

export function decoration_TypeFromJSON(object: any): Decoration_Type {
  switch (object) {
    case 0:
    case 'BOLD':
      return Decoration_Type.BOLD;
    case 1:
    case 'ITALIC':
      return Decoration_Type.ITALIC;
    case 2:
    case 'UNDERLINE':
      return Decoration_Type.UNDERLINE;
    case 3:
    case 'SPOILER':
      return Decoration_Type.SPOILER;
    case 4:
    case 'ANCHOR':
      return Decoration_Type.ANCHOR;
    case 5:
    case 'MENTION':
      return Decoration_Type.MENTION;
    case 6:
    case 'LINK':
      return Decoration_Type.LINK;
    case 7:
    case 'COLOR':
      return Decoration_Type.COLOR;
    case 8:
    case 'FONT_SIZE':
      return Decoration_Type.FONT_SIZE;
    case 9:
    case 'EXTERNAL':
      return Decoration_Type.EXTERNAL;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Decoration_Type.UNRECOGNIZED;
  }
}

export function decoration_TypeToJSON(object: Decoration_Type): string {
  switch (object) {
    case Decoration_Type.BOLD:
      return 'BOLD';
    case Decoration_Type.ITALIC:
      return 'ITALIC';
    case Decoration_Type.UNDERLINE:
      return 'UNDERLINE';
    case Decoration_Type.SPOILER:
      return 'SPOILER';
    case Decoration_Type.ANCHOR:
      return 'ANCHOR';
    case Decoration_Type.MENTION:
      return 'MENTION';
    case Decoration_Type.LINK:
      return 'LINK';
    case Decoration_Type.COLOR:
      return 'COLOR';
    case Decoration_Type.FONT_SIZE:
      return 'FONT_SIZE';
    case Decoration_Type.EXTERNAL:
      return 'EXTERNAL';
    default:
      return 'UNKNOWN';
  }
}

export interface Metadata {
  /** Schema version */
  version: number;
  /** Time content was created */
  createdTimestamp?: Date;
  /** Time of latest edit */
  updatedTimestamp?: Date;
  id?: string;
}

export interface TextNodeStyle {
  decorations: Decoration[];
  nodeStyle?: NodeStyle;
  lineHeight?: string;
}

export interface DocumentStyle {
  headerOne?: TextNodeStyle;
  headerTwo?: TextNodeStyle;
  headerThree?: TextNodeStyle;
  headerFour?: TextNodeStyle;
  headerFive?: TextNodeStyle;
  headerSix?: TextNodeStyle;
  paragraph?: TextNodeStyle;
  blockquote?: TextNodeStyle;
  codeBlock?: TextNodeStyle;
}

const baseRichContent: object = {};

export const RichContent = {
  fromJSON(object: any): RichContent {
    const message = { ...baseRichContent } as RichContent;
    message.nodes = [];
    if (object.nodes !== undefined && object.nodes !== null) {
      for (const e of object.nodes) {
        message.nodes.push(Node.fromJSON(e));
      }
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.documentStyle !== undefined && object.documentStyle !== null) {
      message.documentStyle = DocumentStyle.fromJSON(object.documentStyle);
    } else {
      message.documentStyle = undefined;
    }
    return message;
  },

  toJSON(message: RichContent): unknown {
    const obj: any = {};
    if (message.nodes) {
      obj.nodes = message.nodes.map(e => (e ? Node.toJSON(e) : undefined));
    } else {
      obj.nodes = [];
    }
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? Metadata.toJSON(message.metadata) : undefined);
    message.documentStyle !== undefined &&
      (obj.documentStyle = message.documentStyle
        ? DocumentStyle.toJSON(message.documentStyle)
        : undefined);
    return obj;
  },
};

const baseNode: object = { type: 0, id: '' };

export const Node = {
  fromJSON(object: any): Node {
    const message = { ...baseNode } as Node;
    message.nodes = [];
    if (object.type !== undefined && object.type !== null) {
      message.type = node_TypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = '';
    }
    if (object.nodes !== undefined && object.nodes !== null) {
      for (const e of object.nodes) {
        message.nodes.push(Node.fromJSON(e));
      }
    }
    if (object.style !== undefined && object.style !== null) {
      message.style = NodeStyle.fromJSON(object.style);
    } else {
      message.style = undefined;
    }
    if (object.buttonData !== undefined && object.buttonData !== null) {
      message.buttonData = ButtonData.fromJSON(object.buttonData);
    } else {
      message.buttonData = undefined;
    }
    if (object.codeBlockData !== undefined && object.codeBlockData !== null) {
      message.codeBlockData = CodeBlockData.fromJSON(object.codeBlockData);
    } else {
      message.codeBlockData = undefined;
    }
    if (object.dividerData !== undefined && object.dividerData !== null) {
      message.dividerData = DividerData.fromJSON(object.dividerData);
    } else {
      message.dividerData = undefined;
    }
    if (object.fileData !== undefined && object.fileData !== null) {
      message.fileData = FileData.fromJSON(object.fileData);
    } else {
      message.fileData = undefined;
    }
    if (object.galleryData !== undefined && object.galleryData !== null) {
      message.galleryData = GalleryData.fromJSON(object.galleryData);
    } else {
      message.galleryData = undefined;
    }
    if (object.gifData !== undefined && object.gifData !== null) {
      message.gifData = GIFData.fromJSON(object.gifData);
    } else {
      message.gifData = undefined;
    }
    if (object.headingData !== undefined && object.headingData !== null) {
      message.headingData = HeadingData.fromJSON(object.headingData);
    } else {
      message.headingData = undefined;
    }
    if (object.htmlData !== undefined && object.htmlData !== null) {
      message.htmlData = HTMLData.fromJSON(object.htmlData);
    } else {
      message.htmlData = undefined;
    }
    if (object.imageData !== undefined && object.imageData !== null) {
      message.imageData = ImageData.fromJSON(object.imageData);
    } else {
      message.imageData = undefined;
    }
    if (object.linkPreviewData !== undefined && object.linkPreviewData !== null) {
      message.linkPreviewData = LinkPreviewData.fromJSON(object.linkPreviewData);
    } else {
      message.linkPreviewData = undefined;
    }
    if (object.mapData !== undefined && object.mapData !== null) {
      message.mapData = MapData.fromJSON(object.mapData);
    } else {
      message.mapData = undefined;
    }
    if (object.paragraphData !== undefined && object.paragraphData !== null) {
      message.paragraphData = ParagraphData.fromJSON(object.paragraphData);
    } else {
      message.paragraphData = undefined;
    }
    if (object.pollData !== undefined && object.pollData !== null) {
      message.pollData = PollData.fromJSON(object.pollData);
    } else {
      message.pollData = undefined;
    }
    if (object.textData !== undefined && object.textData !== null) {
      message.textData = TextData.fromJSON(object.textData);
    } else {
      message.textData = undefined;
    }
    if (object.appEmbedData !== undefined && object.appEmbedData !== null) {
      message.appEmbedData = AppEmbedData.fromJSON(object.appEmbedData);
    } else {
      message.appEmbedData = undefined;
    }
    if (object.videoData !== undefined && object.videoData !== null) {
      message.videoData = VideoData.fromJSON(object.videoData);
    } else {
      message.videoData = undefined;
    }
    if (object.embedData !== undefined && object.embedData !== null) {
      message.embedData = EmbedData.fromJSON(object.embedData);
    } else {
      message.embedData = undefined;
    }
    if (object.collapsibleListData !== undefined && object.collapsibleListData !== null) {
      message.collapsibleListData = CollapsibleListData.fromJSON(object.collapsibleListData);
    } else {
      message.collapsibleListData = undefined;
    }
    if (object.tableData !== undefined && object.tableData !== null) {
      message.tableData = TableData.fromJSON(object.tableData);
    } else {
      message.tableData = undefined;
    }
    if (object.tableCellData !== undefined && object.tableCellData !== null) {
      message.tableCellData = TableCellData.fromJSON(object.tableCellData);
    } else {
      message.tableCellData = undefined;
    }
    if (object.externalData !== undefined && object.externalData !== null) {
      message.externalData = Struct.fromJSON(object.externalData);
    } else {
      message.externalData = undefined;
    }
    if (object.audioData !== undefined && object.audioData !== null) {
      message.audioData = AudioData.fromJSON(object.audioData);
    } else {
      message.audioData = undefined;
    }
    if (object.orderedListData !== undefined && object.orderedListData !== null) {
      message.orderedListData = OrderedListData.fromJSON(object.orderedListData);
    } else {
      message.orderedListData = undefined;
    }
    if (object.bulletedListData !== undefined && object.bulletedListData !== null) {
      message.bulletedListData = BulletedListData.fromJSON(object.bulletedListData);
    } else {
      message.bulletedListData = undefined;
    }
    if (object.blockquoteData !== undefined && object.blockquoteData !== null) {
      message.blockquoteData = BlockquoteData.fromJSON(object.blockquoteData);
    } else {
      message.blockquoteData = undefined;
    }
    return message;
  },

  toJSON(message: Node): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = node_TypeToJSON(message.type));
    message.id !== undefined && (obj.id = message.id);
    if (message.nodes) {
      obj.nodes = message.nodes.map(e => (e ? Node.toJSON(e) : undefined));
    } else {
      obj.nodes = [];
    }
    message.style !== undefined &&
      (obj.style = message.style ? NodeStyle.toJSON(message.style) : undefined);
    message.buttonData !== undefined &&
      (obj.buttonData = message.buttonData ? ButtonData.toJSON(message.buttonData) : undefined);
    message.codeBlockData !== undefined &&
      (obj.codeBlockData = message.codeBlockData
        ? CodeBlockData.toJSON(message.codeBlockData)
        : undefined);
    message.dividerData !== undefined &&
      (obj.dividerData = message.dividerData ? DividerData.toJSON(message.dividerData) : undefined);
    message.fileData !== undefined &&
      (obj.fileData = message.fileData ? FileData.toJSON(message.fileData) : undefined);
    message.galleryData !== undefined &&
      (obj.galleryData = message.galleryData ? GalleryData.toJSON(message.galleryData) : undefined);
    message.gifData !== undefined &&
      (obj.gifData = message.gifData ? GIFData.toJSON(message.gifData) : undefined);
    message.headingData !== undefined &&
      (obj.headingData = message.headingData ? HeadingData.toJSON(message.headingData) : undefined);
    message.htmlData !== undefined &&
      (obj.htmlData = message.htmlData ? HTMLData.toJSON(message.htmlData) : undefined);
    message.imageData !== undefined &&
      (obj.imageData = message.imageData ? ImageData.toJSON(message.imageData) : undefined);
    message.linkPreviewData !== undefined &&
      (obj.linkPreviewData = message.linkPreviewData
        ? LinkPreviewData.toJSON(message.linkPreviewData)
        : undefined);
    message.mapData !== undefined &&
      (obj.mapData = message.mapData ? MapData.toJSON(message.mapData) : undefined);
    message.paragraphData !== undefined &&
      (obj.paragraphData = message.paragraphData
        ? ParagraphData.toJSON(message.paragraphData)
        : undefined);
    message.pollData !== undefined &&
      (obj.pollData = message.pollData ? PollData.toJSON(message.pollData) : undefined);
    message.textData !== undefined &&
      (obj.textData = message.textData ? TextData.toJSON(message.textData) : undefined);
    message.appEmbedData !== undefined &&
      (obj.appEmbedData = message.appEmbedData
        ? AppEmbedData.toJSON(message.appEmbedData)
        : undefined);
    message.videoData !== undefined &&
      (obj.videoData = message.videoData ? VideoData.toJSON(message.videoData) : undefined);
    message.embedData !== undefined &&
      (obj.embedData = message.embedData ? EmbedData.toJSON(message.embedData) : undefined);
    message.collapsibleListData !== undefined &&
      (obj.collapsibleListData = message.collapsibleListData
        ? CollapsibleListData.toJSON(message.collapsibleListData)
        : undefined);
    message.tableData !== undefined &&
      (obj.tableData = message.tableData ? TableData.toJSON(message.tableData) : undefined);
    message.tableCellData !== undefined &&
      (obj.tableCellData = message.tableCellData
        ? TableCellData.toJSON(message.tableCellData)
        : undefined);
    message.externalData !== undefined &&
      (obj.externalData = message.externalData ? Struct.toJSON(message.externalData) : undefined);
    message.audioData !== undefined &&
      (obj.audioData = message.audioData ? AudioData.toJSON(message.audioData) : undefined);
    message.orderedListData !== undefined &&
      (obj.orderedListData = message.orderedListData
        ? OrderedListData.toJSON(message.orderedListData)
        : undefined);
    message.bulletedListData !== undefined &&
      (obj.bulletedListData = message.bulletedListData
        ? BulletedListData.toJSON(message.bulletedListData)
        : undefined);
    message.blockquoteData !== undefined &&
      (obj.blockquoteData = message.blockquoteData
        ? BlockquoteData.toJSON(message.blockquoteData)
        : undefined);
    return obj;
  },
};

const baseNodeStyle: object = {};

export const NodeStyle = {
  fromJSON(object: any): NodeStyle {
    const message = { ...baseNodeStyle } as NodeStyle;
    if (object.paddingTop !== undefined && object.paddingTop !== null) {
      message.paddingTop = String(object.paddingTop);
    } else {
      message.paddingTop = undefined;
    }
    if (object.paddingBottom !== undefined && object.paddingBottom !== null) {
      message.paddingBottom = String(object.paddingBottom);
    } else {
      message.paddingBottom = undefined;
    }
    if (object.backgroundColor !== undefined && object.backgroundColor !== null) {
      message.backgroundColor = String(object.backgroundColor);
    } else {
      message.backgroundColor = undefined;
    }
    return message;
  },

  toJSON(message: NodeStyle): unknown {
    const obj: any = {};
    message.paddingTop !== undefined && (obj.paddingTop = message.paddingTop);
    message.paddingBottom !== undefined && (obj.paddingBottom = message.paddingBottom);
    message.backgroundColor !== undefined && (obj.backgroundColor = message.backgroundColor);
    return obj;
  },
};

const baseTextData: object = { text: '' };

export const TextData = {
  fromJSON(object: any): TextData {
    const message = { ...baseTextData } as TextData;
    message.decorations = [];
    if (object.text !== undefined && object.text !== null) {
      message.text = String(object.text);
    } else {
      message.text = '';
    }
    if (object.decorations !== undefined && object.decorations !== null) {
      for (const e of object.decorations) {
        message.decorations.push(Decoration.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: TextData): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    if (message.decorations) {
      obj.decorations = message.decorations.map(e => (e ? Decoration.toJSON(e) : undefined));
    } else {
      obj.decorations = [];
    }
    return obj;
  },
};

const baseDecoration: object = { type: 0 };

export const Decoration = {
  fromJSON(object: any): Decoration {
    const message = { ...baseDecoration } as Decoration;
    if (object.type !== undefined && object.type !== null) {
      message.type = decoration_TypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.anchorData !== undefined && object.anchorData !== null) {
      message.anchorData = AnchorData.fromJSON(object.anchorData);
    } else {
      message.anchorData = undefined;
    }
    if (object.colorData !== undefined && object.colorData !== null) {
      message.colorData = ColorData.fromJSON(object.colorData);
    } else {
      message.colorData = undefined;
    }
    if (object.linkData !== undefined && object.linkData !== null) {
      message.linkData = LinkData.fromJSON(object.linkData);
    } else {
      message.linkData = undefined;
    }
    if (object.mentionData !== undefined && object.mentionData !== null) {
      message.mentionData = MentionData.fromJSON(object.mentionData);
    } else {
      message.mentionData = undefined;
    }
    if (object.fontSizeData !== undefined && object.fontSizeData !== null) {
      message.fontSizeData = FontSizeData.fromJSON(object.fontSizeData);
    } else {
      message.fontSizeData = undefined;
    }
    if (object.fontWeightValue !== undefined && object.fontWeightValue !== null) {
      message.fontWeightValue = Number(object.fontWeightValue);
    } else {
      message.fontWeightValue = undefined;
    }
    if (object.italicData !== undefined && object.italicData !== null) {
      message.italicData = Boolean(object.italicData);
    } else {
      message.italicData = undefined;
    }
    if (object.underlineData !== undefined && object.underlineData !== null) {
      message.underlineData = Boolean(object.underlineData);
    } else {
      message.underlineData = undefined;
    }
    return message;
  },

  toJSON(message: Decoration): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = decoration_TypeToJSON(message.type));
    message.anchorData !== undefined &&
      (obj.anchorData = message.anchorData ? AnchorData.toJSON(message.anchorData) : undefined);
    message.colorData !== undefined &&
      (obj.colorData = message.colorData ? ColorData.toJSON(message.colorData) : undefined);
    message.linkData !== undefined &&
      (obj.linkData = message.linkData ? LinkData.toJSON(message.linkData) : undefined);
    message.mentionData !== undefined &&
      (obj.mentionData = message.mentionData ? MentionData.toJSON(message.mentionData) : undefined);
    message.fontSizeData !== undefined &&
      (obj.fontSizeData = message.fontSizeData
        ? FontSizeData.toJSON(message.fontSizeData)
        : undefined);
    message.fontWeightValue !== undefined && (obj.fontWeightValue = message.fontWeightValue);
    message.italicData !== undefined && (obj.italicData = message.italicData);
    message.underlineData !== undefined && (obj.underlineData = message.underlineData);
    return obj;
  },
};

const baseMetadata: object = { version: 0 };

export const Metadata = {
  fromJSON(object: any): Metadata {
    const message = { ...baseMetadata } as Metadata;
    if (object.version !== undefined && object.version !== null) {
      message.version = Number(object.version);
    } else {
      message.version = 0;
    }
    if (object.createdTimestamp !== undefined && object.createdTimestamp !== null) {
      message.createdTimestamp = fromJsonTimestamp(object.createdTimestamp);
    } else {
      message.createdTimestamp = undefined;
    }
    if (object.updatedTimestamp !== undefined && object.updatedTimestamp !== null) {
      message.updatedTimestamp = fromJsonTimestamp(object.updatedTimestamp);
    } else {
      message.updatedTimestamp = undefined;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = undefined;
    }
    return message;
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.createdTimestamp !== undefined &&
      (obj.createdTimestamp =
        message.createdTimestamp !== undefined ? message.createdTimestamp.toISOString() : null);
    message.updatedTimestamp !== undefined &&
      (obj.updatedTimestamp =
        message.updatedTimestamp !== undefined ? message.updatedTimestamp.toISOString() : null);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },
};

const baseTextNodeStyle: object = {};

export const TextNodeStyle = {
  fromJSON(object: any): TextNodeStyle {
    const message = { ...baseTextNodeStyle } as TextNodeStyle;
    message.decorations = [];
    if (object.decorations !== undefined && object.decorations !== null) {
      for (const e of object.decorations) {
        message.decorations.push(Decoration.fromJSON(e));
      }
    }
    if (object.nodeStyle !== undefined && object.nodeStyle !== null) {
      message.nodeStyle = NodeStyle.fromJSON(object.nodeStyle);
    } else {
      message.nodeStyle = undefined;
    }
    if (object.lineHeight !== undefined && object.lineHeight !== null) {
      message.lineHeight = String(object.lineHeight);
    } else {
      message.lineHeight = undefined;
    }
    return message;
  },

  toJSON(message: TextNodeStyle): unknown {
    const obj: any = {};
    if (message.decorations) {
      obj.decorations = message.decorations.map(e => (e ? Decoration.toJSON(e) : undefined));
    } else {
      obj.decorations = [];
    }
    message.nodeStyle !== undefined &&
      (obj.nodeStyle = message.nodeStyle ? NodeStyle.toJSON(message.nodeStyle) : undefined);
    message.lineHeight !== undefined && (obj.lineHeight = message.lineHeight);
    return obj;
  },
};

const baseDocumentStyle: object = {};

export const DocumentStyle = {
  fromJSON(object: any): DocumentStyle {
    const message = { ...baseDocumentStyle } as DocumentStyle;
    if (object.headerOne !== undefined && object.headerOne !== null) {
      message.headerOne = TextNodeStyle.fromJSON(object.headerOne);
    } else {
      message.headerOne = undefined;
    }
    if (object.headerTwo !== undefined && object.headerTwo !== null) {
      message.headerTwo = TextNodeStyle.fromJSON(object.headerTwo);
    } else {
      message.headerTwo = undefined;
    }
    if (object.headerThree !== undefined && object.headerThree !== null) {
      message.headerThree = TextNodeStyle.fromJSON(object.headerThree);
    } else {
      message.headerThree = undefined;
    }
    if (object.headerFour !== undefined && object.headerFour !== null) {
      message.headerFour = TextNodeStyle.fromJSON(object.headerFour);
    } else {
      message.headerFour = undefined;
    }
    if (object.headerFive !== undefined && object.headerFive !== null) {
      message.headerFive = TextNodeStyle.fromJSON(object.headerFive);
    } else {
      message.headerFive = undefined;
    }
    if (object.headerSix !== undefined && object.headerSix !== null) {
      message.headerSix = TextNodeStyle.fromJSON(object.headerSix);
    } else {
      message.headerSix = undefined;
    }
    if (object.paragraph !== undefined && object.paragraph !== null) {
      message.paragraph = TextNodeStyle.fromJSON(object.paragraph);
    } else {
      message.paragraph = undefined;
    }
    if (object.blockquote !== undefined && object.blockquote !== null) {
      message.blockquote = TextNodeStyle.fromJSON(object.blockquote);
    } else {
      message.blockquote = undefined;
    }
    if (object.codeBlock !== undefined && object.codeBlock !== null) {
      message.codeBlock = TextNodeStyle.fromJSON(object.codeBlock);
    } else {
      message.codeBlock = undefined;
    }
    return message;
  },

  toJSON(message: DocumentStyle): unknown {
    const obj: any = {};
    message.headerOne !== undefined &&
      (obj.headerOne = message.headerOne ? TextNodeStyle.toJSON(message.headerOne) : undefined);
    message.headerTwo !== undefined &&
      (obj.headerTwo = message.headerTwo ? TextNodeStyle.toJSON(message.headerTwo) : undefined);
    message.headerThree !== undefined &&
      (obj.headerThree = message.headerThree
        ? TextNodeStyle.toJSON(message.headerThree)
        : undefined);
    message.headerFour !== undefined &&
      (obj.headerFour = message.headerFour ? TextNodeStyle.toJSON(message.headerFour) : undefined);
    message.headerFive !== undefined &&
      (obj.headerFive = message.headerFive ? TextNodeStyle.toJSON(message.headerFive) : undefined);
    message.headerSix !== undefined &&
      (obj.headerSix = message.headerSix ? TextNodeStyle.toJSON(message.headerSix) : undefined);
    message.paragraph !== undefined &&
      (obj.paragraph = message.paragraph ? TextNodeStyle.toJSON(message.paragraph) : undefined);
    message.blockquote !== undefined &&
      (obj.blockquote = message.blockquote ? TextNodeStyle.toJSON(message.blockquote) : undefined);
    message.codeBlock !== undefined &&
      (obj.codeBlock = message.codeBlock ? TextNodeStyle.toJSON(message.codeBlock) : undefined);
    return obj;
  },
};

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
