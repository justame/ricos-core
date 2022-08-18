import type { Overwrite } from 'utility-types';
import { isArray, isObject } from 'lodash';
import type { Node, RichContent } from '@justame-ricos/ricos-schema';
import type {
  RawDraftInlineStyleRange,
  RawDraftContentBlock,
  RawDraftEntity,
  RawDraftContentState,
  RawDraftEntityRange,
} from 'draft-js';

export interface TextBlockStyle {
  'font-size'?: string;
  color?: string;
  'background-color'?: string;
  'font-weight'?: string;
  'font-style'?: string;
  'text-decoration'?: string;
  'line-height'?: string;
  'padding-top'?: string;
  'padding-bottom'?: string;
}
export interface DocumentStyle {
  headerOne?: TextBlockStyle;
  headerTwo?: TextBlockStyle;
  headerThree?: TextBlockStyle;
  headerFour?: TextBlockStyle;
  headerFive?: TextBlockStyle;
  headerSix?: TextBlockStyle;
  paragraph?: TextBlockStyle;
}

export type RicosInlineStyleRange = Overwrite<RawDraftInlineStyleRange, { style: string }>;

export type RicosEntityRange = Overwrite<RawDraftEntityRange, { key: string | number }>;

export type RicosContentBlock = Overwrite<
  RawDraftContentBlock,
  { inlineStyleRanges: RicosInlineStyleRange[]; entityRanges: RicosEntityRange[] }
>;

export type RicosEntity = Overwrite<RawDraftEntity, { mutability: string }>;

export type RicosEntityMap = { [key: string]: RicosEntity };

// Kept for backwards compatibility, use DraftContent instead
export interface RicosContent
  extends Overwrite<
    RawDraftContentState,
    {
      blocks: RicosContentBlock[];
      entityMap: RicosEntityMap;
    }
  > {
  documentStyle?: DocumentStyle;
  VERSION?: string;
  ID?: string;
}

export interface DraftContent extends RicosContent {}

type RawNode = Overwrite<Node, { type: string; nodes: RawNode[] }>;
export type RawRichContent = Overwrite<RichContent, { nodes: RawNode[] }>;

export function isDraftContent(content): content is DraftContent {
  return isArray(content.blocks) && isObject(content.entityMap);
}

export function isRichContent(content): content is RichContent {
  return isArray(content.nodes);
}
