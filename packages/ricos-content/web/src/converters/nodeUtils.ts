import * as S from 'fp-ts/string';
import { v4 as uuid } from 'uuid';
import { pipe } from 'fp-ts/function';
import { merge } from 'lodash';
import type {
  NodeStyle,
  ParagraphData,
  CodeBlockData,
  DividerData,
  FileData,
  GalleryData,
  GIFData,
  HTMLData,
  ImageData,
  ButtonData,
  LinkPreviewData,
  MapData,
  Node,
  Decoration,
  Metadata,
  HeadingData,
  PollData,
  TextData,
  VideoData,
  AudioData,
  Link,
  Link_Target,
  AppEmbedData,
  EmbedData,
  TableData,
  TableCellData,
  CollapsibleListData,
} from 'ricos-schema';
import { TextStyle_TextAlignment, Node_Type, Decoration_Type, LATEST_VERSION } from 'ricos-schema';
import { generateId } from './generateRandomId';
import { fromEntries } from '../utils';

export const createNode = <TData>(
  type: Node_Type,
  {
    nodes,
    data,
    style,
    id,
  }: {
    nodes: Node[];
    data: TData;
    style?: NodeStyle;
    id?: string;
  }
): Node => ({
  type,
  id: id ?? generateId(),
  nodes,
  ...dataByNodeType(type, data),
  style,
});

export const dataByNodeType = (type: Node_Type, data: unknown) =>
  ({
    [Node_Type.CODE_BLOCK]: { codeBlockData: data as CodeBlockData },
    [Node_Type.DIVIDER]: { dividerData: data as DividerData },
    [Node_Type.HEADING]: { headingData: data as HeadingData },
    [Node_Type.FILE]: { fileData: data as FileData },
    [Node_Type.GALLERY]: { galleryData: data as GalleryData },
    [Node_Type.GIF]: { gifData: data as GIFData },
    [Node_Type.HTML]: { htmlData: data as HTMLData },
    [Node_Type.IMAGE]: { imageData: data as ImageData },
    [Node_Type.BUTTON]: { buttonData: data as ButtonData },
    [Node_Type.MAP]: { mapData: data as MapData },
    [Node_Type.PARAGRAPH]: { paragraphData: data as ParagraphData },
    [Node_Type.POLL]: { pollData: data as PollData },
    [Node_Type.TEXT]: { textData: data as TextData },
    [Node_Type.VIDEO]: { videoData: data as VideoData },
    [Node_Type.AUDIO]: { audioData: data as AudioData },
    [Node_Type.EMBED]: { embedData: data as EmbedData },
    [Node_Type.APP_EMBED]: { appEmbedData: data as AppEmbedData },
    [Node_Type.LINK_PREVIEW]: { linkPreviewData: data as LinkPreviewData },
    [Node_Type.TABLE]: { tableData: data as TableData },
    [Node_Type.TABLE_CELL]: { tableCellData: data as TableCellData },
    [Node_Type.COLLAPSIBLE_LIST]: { collapsibleListData: data as CollapsibleListData },
  }[type]);

export const createParagraphNode = (
  nodes: Node[] = [],
  data?: ParagraphData,
  style?: NodeStyle
): Node =>
  createNode(Node_Type.PARAGRAPH, {
    nodes,
    data: {
      textStyle: { textAlignment: TextStyle_TextAlignment.AUTO },
      ...data,
    },
    style,
  });

export const createTextNode = (text: string, decorations: Decoration[] = []): Node =>
  createNode(Node_Type.TEXT, { nodes: [], id: '', data: { text, decorations } });

export const createHeadingNode = (nodes: Node[] = [], data: HeadingData): Node =>
  createNode(Node_Type.HEADING, {
    nodes,
    data: {
      textStyle: { textAlignment: TextStyle_TextAlignment.AUTO },
      ...data,
    },
  });

export const createDecoration = (
  type: Decoration_Type,
  data: Omit<Decoration, 'type'> = {}
): Decoration => ({ type, ...data });

export const initializeMetadata = ({
  version,
  id = uuid(),
  createdTimestamp,
  updatedTimestamp,
}: {
  version?: number;
  id?: string;
  createdTimestamp?: Date;
  updatedTimestamp?: Date;
} = {}): Metadata => ({
  version: version || LATEST_VERSION,
  createdTimestamp: createdTimestamp || new Date(),
  updatedTimestamp: updatedTimestamp || new Date(),
  id,
});

type DecorationMap = Record<Decoration_Type, Decoration>;

export const reduceDecorations = (decorations: Decoration[]): Decoration[] => {
  const reducedDecorationsMap: DecorationMap = decorations.reduce(
    (decorationMap, { type, ...data }) => {
      const currentDecoration: Decoration = decorationMap[type] || { type };
      const nextDecoration: Decoration = { type, ...data };
      return {
        ...decorationMap,
        [type]: merge(currentDecoration, nextDecoration),
      };
    },
    {} as DecorationMap
  );
  const reducedDecorations = Object.values(reducedDecorationsMap);
  return reducedDecorations;
};

export const toLinkTarget = (target = 'SELF') => pipe(target, S.toUpperCase, S.replace('_', ''));

export const createLink = ({
  url,
  rel,
  target,
  anchor,
}: {
  url?: string;
  rel?: string;
  target?: string;
  anchor?: string;
}): Link => {
  const relValues: [string, boolean][] =
    (rel || '')
      .split(' ')
      .filter(key => ['nofollow', 'sponsored', 'ugc'].includes(key))
      .map(key => [key, true]) || [];

  return {
    anchor,
    url,
    rel: relValues.length > 0 ? fromEntries(relValues) : undefined,
    target: toLinkTarget(typeof target === 'string' ? target : undefined) as Link_Target,
  };
};

export const parseLink = ({
  url,
  rel,
  target,
  anchor,
  customData,
}: Link): {
  url?: string;
  rel?: string;
  target?: string;
  anchor?: string;
  customData?: string;
} => ({
  anchor,
  url,
  rel:
    rel &&
    Object.entries(rel)
      .flatMap(([key, value]) => (value ? key : []))
      .join(' '),
  target: target && '_' + target.toLowerCase(),
  customData,
});

export const createLinkDecoration = (data: { url?: string; rel?: string; target?: string }) =>
  createDecoration(Decoration_Type.LINK, { linkData: { link: createLink(data) } });

export const last = arr => (arr.length > 0 ? arr[arr.length - 1] : null);

export const partitionBy =
  <T>(
    isSeparator: (node: T) => boolean,
    isPartition: (node: T) => boolean,
    Separator: (node: T) => T,
    Partition: (node: T) => T,
    addToPartition: (partition: T, node: T) => void
  ) =>
  (nodes: T[]): T[] =>
    nodes.reduce((partitions: T[], node: T) => {
      if (isSeparator(node)) {
        partitions.push(Separator(node));
      } else {
        let lastPartition = last(partitions);
        if (!lastPartition || !isPartition(lastPartition)) {
          const partition = Partition(node);
          partitions.push(partition);
          lastPartition = last(partitions);
        }
        addToPartition(lastPartition, node);
      }
      return partitions;
    }, []);
