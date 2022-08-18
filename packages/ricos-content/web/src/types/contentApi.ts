import type {
  AppEmbedData,
  EmbedData,
  ButtonData,
  CodeBlockData,
  DividerData,
  FileData,
  GalleryData,
  GIFData,
  HeadingData,
  HTMLData,
  ImageData,
  LinkPreviewData,
  MapData,
  ParagraphData,
  RichContent,
  TableData,
  TextData,
  VideoData,
  AudioData,
  TableCellData,
  CollapsibleListData,
  PollData,
  Node,
} from '@justame-ricos/ricos-schema';
import type { AddImageParams } from '../velo-adapter/types';
import type { RichText } from './node-refined-types';
import type { PickRenameMulti } from './typeUtils';

export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? PartialDeep<U>[]
    : T[P] extends Record<string, unknown>
    ? PartialDeep<T[P]>
    : T[P];
};

type AddListMethod = ({
  items,
  data,
  index,
  before,
  after,
  content,
}: {
  items: string | TextData | ListItemData | (string | TextData | ListItemData)[];
  data?: ParagraphData;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
}) => RichContent;

type AddLists = {
  addOrderedList: AddListMethod;
  addBulletList: AddListMethod;
};

type AddMethod<T> = {
  [P in keyof T]: ({
    data,
    index,
    before,
    after,
    content,
  }: {
    data?: Partial<T[P]>;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }) => RichContent;
};

type AddTextMethod<T> = {
  [P in keyof T]: ({
    text,
    data,
    index,
    before,
    after,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: Partial<T[P]>;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }) => RichContent;
};

type AddMap = {
  addButton: ButtonData;
  addDivider: DividerData;
  addFile: FileData;
  addGallery: GalleryData;
  addGif: GIFData;
  addMap: MapData;
  addHtml: HTMLData;
  addImage: ImageData;
  addVideo: VideoData;
  addAudio: AudioData;
  addAppEmbed: AppEmbedData;
  addEmbed: EmbedData;
  addLinkPreview: LinkPreviewData;
  addPoll: PollData;
};

type AddTextMap = {
  addCode: CodeBlockData;
  addHeading: HeadingData;
  addParagraph: ParagraphData;
};

export type ListItemData = {
  text: TextData[];
  data: ParagraphData;
};

export type TableCell = {
  data?: TableCellData;
  content: RichContent;
};

export type CollapsibleListItem = {
  title: RichText;
  content: RichContent;
};

type ContentBuilderType = AddMethod<AddMap> &
  AddTextMethod<AddTextMap> &
  AddLists & {
    addTable: ({
      cells,
      data,
      index,
      before,
      after,
      content,
    }: {
      cells: TableCell[][];
      data?: TableData;
      index?: number;
      before?: string;
      after?: string;
      content: RichContent;
    }) => RichContent;
  } & {
    addCollapsibleList: ({
      items,
      data,
      index,
      before,
      after,
      content,
    }: {
      items: CollapsibleListItem[];
      data?: CollapsibleListData;
      index?: number;
      before?: string;
      after?: string;
      content: RichContent;
    }) => RichContent;
  };

export interface ContentBuilder extends ContentBuilderType {}

// type Creators = {
//   [key in keyof ContentBuilder]: string;
// };

// Rename all builder functions to plugin creators
// Can be done in a better way using typescript@^4.1.0
// https://dev.to/svehla/typescript-transform-case-strings-450b
// https://stackoverflow.com/a/59071783/6184356
type RenamedBuilderFunctions = PickRenameMulti<
  ContentBuilder,
  {
    addAppEmbed: 'appEmbed';
    addBulletList: 'bulletList';
    addButton: 'button';
    addCode: 'code';
    addCollapsibleList: 'collapsibleList';
    addDivider: 'divider';
    addEmbed: 'embed';
    addFile: 'file';
    addGallery: 'gallery';
    addGif: 'gif';
    addHeading: 'heading';
    addHtml: 'html';
    addImage: 'image';
    addLinkPreview: 'linkPreview';
    addMap: 'map';
    addOrderedList: 'orderedList';
    addParagraph: 'paragraph';
    addPoll: 'poll';
    addTable: 'table';
    addVideo: 'video';
    addAudio: 'audio';
  }
>;

export type BuilderFunctionsMetadata = 'content' | 'index' | 'before' | 'after';

type NodeCreators = {
  [key in keyof RenamedBuilderFunctions]: (
    args: Omit<Parameters<RenamedBuilderFunctions[key]>[0], BuilderFunctionsMetadata>
  ) => Node;
};

export interface NodeCreatorsCollection extends Omit<NodeCreators, 'image'> {
  // native elements' overwrites are here:
  image: (args: { data: AddImageParams['data'] }) => Node;
}
