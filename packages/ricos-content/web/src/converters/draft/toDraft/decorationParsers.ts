/* eslint-disable no-console */
import type { Decoration, Node } from 'ricos-schema';
import { Node_Type, Decoration_Type } from 'ricos-schema';
import type { RicosInlineStyleRange, RicosEntityRange, RicosEntityMap } from '../../../types';
import { FROM_RICOS_DECORATION_TYPE, TO_RICOS_DECORATION_DATA_FIELD } from '../consts';
import { emojiRegex } from '../emojiRegex';
import { createDecorationEntityData } from './getDraftEntityData';
import { omit } from 'lodash';

export interface DraftTypedDecoration extends Omit<Decoration, 'type'> {
  type: string;
  emojiData?: { emojiUnicode: string };
}

export interface RangedDecoration extends DraftTypedDecoration {
  start: number;
  end: number;
}

interface RangedDecorationMap {
  [type: string]: RangedDecoration[];
}

const isInlineStyleDecoration = (decorationType: string) =>
  TO_RICOS_DECORATION_DATA_FIELD[decorationType] === undefined;

const pipe = (arg, ...fns: ((arg) => unknown)[]) => {
  return fns.reduce((v, fn) => fn(v), arg);
};

export const mergeTextNodes = (
  nodes: Node[]
): { text: string; decorationMap: RangedDecorationMap } => {
  let length = 0;
  return nodes.reduce<{
    text: string;
    decorationMap: RangedDecorationMap;
  }>(
    ({ text, decorationMap }, currNode) => {
      let accText = text;
      if (currNode.textData) {
        const { text: currText, decorations: currDecorations } = currNode.textData;
        const textLength = Array.from(currText).length; // required for properly reading emojis
        accText += currText;
        if (currDecorations) {
          convertDecorationTypes(currDecorations).forEach(decoration => {
            if (!decorationMap[decoration.type]) {
              decorationMap[decoration.type] = [];
            }
            decorationMap[decoration.type] = [
              ...decorationMap[decoration.type],
              {
                ...decoration,
                start: length,
                end: length + textLength,
              },
            ];
          });
        }
        length += textLength;
      }
      return { text: accText, decorationMap };
    },
    { text: '', decorationMap: {} }
  );
};

export const parseDecorations = (
  decorationMap: RangedDecorationMap,
  text: string
): { inlineStyleDecorations: RangedDecoration[]; entityDecorations: RangedDecoration[] } => {
  const decorations = Object.values(decorationMap)
    .sort(decorationComparator)
    .reduce((decorations: RangedDecoration[], currentDecorations) => {
      if (currentDecorations.length > 0) {
        const firstDecoration = currentDecorations.shift() as RangedDecoration;
        const mergedDecorations: RangedDecoration[] = [firstDecoration];
        currentDecorations.forEach(decoration => {
          const lastDecoration = mergedDecorations.pop() as RangedDecoration;
          if (decoration.start === lastDecoration.end) {
            mergedDecorations.push({ ...lastDecoration, end: decoration.end });
          } else {
            mergedDecorations.push(lastDecoration, decoration);
          }
        });
        return [...decorations, ...mergedDecorations.sort(decorationComparator)];
      }
      return decorations;
    }, []);
  const allDecorations = [...decorations, ...createEmojiDecorations(text)];
  const entityDecorations = allDecorations
    .filter(({ type }) => !isInlineStyleDecoration(type))
    .sort(decorationComparator);
  const inlineStyleDecorations = allDecorations.filter(({ type }) => isInlineStyleDecoration(type));
  return { inlineStyleDecorations, entityDecorations };
};

export const parseInlineStyleDecorations = (
  decorations: RangedDecoration[]
): RicosInlineStyleRange[] => {
  const inlineStyleRanges = decorations.reduce<RicosInlineStyleRange[]>(
    (inlineStyleRanges, decoration) => [
      ...inlineStyleRanges,
      {
        style: decoration.type,
        offset: decoration.start,
        length: decoration.end - decoration.start,
      },
    ],
    []
  );
  return inlineStyleRanges;
};

export const parseEntityDecorations = (
  decorations: RangedDecoration[],
  latestEntityKey: number
): {
  entityRanges: RicosEntityRange[];
  entityMap: RicosEntityMap;
  latestEntityKey: number;
} => {
  const {
    entityRanges,
    entityMap,
    latestEntityKey: newLatestEntityKey,
  } = decorations.reduce<{
    entityRanges: RicosEntityRange[];
    entityMap: RicosEntityMap;
    latestEntityKey: number;
  }>(
    ({ entityRanges, entityMap, latestEntityKey }, decoration) => {
      const newEntityKey = latestEntityKey + 1;
      const newEntityMap = createDecorationEntityData(decoration, newEntityKey);
      return {
        entityRanges: [
          ...entityRanges,
          {
            key: newEntityKey,
            offset: decoration.start,
            length: decoration.end - decoration.start,
          },
        ],
        entityMap: { ...entityMap, ...newEntityMap },
        latestEntityKey: newEntityKey,
      };
    },
    { entityRanges: [], entityMap: {}, latestEntityKey }
  );
  return {
    entityRanges,
    entityMap,
    latestEntityKey: newLatestEntityKey,
  };
};

export const getParagraphNode = (node: Node) => {
  if (node.nodes[0].type === Node_Type.PARAGRAPH) {
    return node.nodes[0];
  } else {
    throw Error(`Expected a paragraph node but found ${node.nodes[0].type}`);
  }
};

const convertDecorationTypes = (decorations: Decoration[]): DraftTypedDecoration[] =>
  decorations.flatMap(decoration =>
    pipe(
      decoration,
      toDraftDecorationType,
      convertFontSize,
      convertFontWeight,
      convertItalic,
      convertUnderline,
      splitColorDecoration
    )
  );

export const convertDocumentStyleDecorationTypes = (decorations: Decoration[]) => {
  let draftBlockStyles = {};
  decorations.forEach(decoration => {
    decoration &&
      (draftBlockStyles = {
        ...draftBlockStyles,
        ...ricosDecorationToCss[decoration.type](decoration),
      });
  });
  return draftBlockStyles;
};

const ricosDecorationToCss = {
  [Decoration_Type.BOLD]: ({ fontWeightValue }) => {
    return fontWeightValue ? { 'font-weight': fontWeightValue >= 700 ? 'bold' : 'normal' } : {};
  },
  [Decoration_Type.ITALIC]: ({ italicData }) => {
    return typeof italicData !== 'undefined'
      ? { 'font-style': italicData ? 'italic' : 'normal' }
      : {};
  },
  [Decoration_Type.UNDERLINE]: ({ underlineData }) => {
    return typeof underlineData !== 'undefined'
      ? {
          'text-decoration': underlineData ? 'underline' : 'none',
        }
      : {};
  },
  [Decoration_Type.FONT_SIZE]: ({ fontSizeData }) => {
    return fontSizeData
      ? { 'font-size': fontSizeData.value + (fontSizeData.unit.toLowerCase() || 'px') }
      : {};
  },
  [Decoration_Type.COLOR]: ({ colorData }) => {
    const { foreground, background } = colorData;
    const colors = {};
    // eslint-disable-next-line dot-notation
    foreground && (colors['color'] = foreground);
    background && (colors['background-color'] = background);
    return colors;
  },
};

const createEmojiDecorations = (text: string) => {
  const result: RangedDecoration[] = [];
  let match;
  // eslint-disable-next-line fp/no-loops
  while ((match = emojiRegex.exec(text)) !== null) {
    const { 0: emojiUnicode, index: start } = match;
    const decoration: RangedDecoration = {
      type: 'EMOJI_TYPE',
      emojiData: { emojiUnicode },
      start,
      end: start + Array.from(emojiUnicode).length,
    };
    result.push(decoration);
  }
  return result;
};

const toDraftDecorationType = (decoration: Decoration): DraftTypedDecoration => {
  const type = omit(FROM_RICOS_DECORATION_TYPE, [
    Decoration_Type.BOLD,
    Decoration_Type.ITALIC,
    Decoration_Type.UNDERLINE,
  ])[decoration?.type];
  return type ? { ...decoration, type } : decoration;
};

const splitColorDecoration = ({
  colorData,
  ...decoration
}: DraftTypedDecoration): DraftTypedDecoration | DraftTypedDecoration[] => {
  if (!colorData) {
    return decoration;
  }
  const { foreground, background } = colorData;
  return [foreground && { FG: foreground }, background && { BG: background }]
    .filter(x => x)
    .map(type => ({ ...decoration, type: JSON.stringify(type) }));
};

const convertFontSize = ({
  fontSizeData,
  ...decoration
}: DraftTypedDecoration): DraftTypedDecoration =>
  fontSizeData
    ? {
        ...decoration,
        type: JSON.stringify({
          'font-size': fontSizeData.value?.toString() + (fontSizeData.unit?.toLowerCase() || 'px'),
        }),
      }
    : decoration;

const convertFontWeight = ({
  fontWeightValue,
  ...decoration
}: DraftTypedDecoration): DraftTypedDecoration =>
  decoration.type === Decoration_Type.BOLD
    ? {
        ...decoration,
        type: !fontWeightValue || fontWeightValue >= 700 ? 'BOLD' : 'NOT_BOLD',
      }
    : decoration;

const convertItalic = ({
  italicData,
  ...decoration
}: DraftTypedDecoration): DraftTypedDecoration => {
  const isItalicDataUndefined = typeof italicData === 'undefined';
  return decoration.type === Decoration_Type.ITALIC
    ? {
        ...decoration,
        type: isItalicDataUndefined || italicData ? 'ITALIC' : 'NOT_ITALIC',
      }
    : decoration;
};

const convertUnderline = ({
  underlineData,
  ...decoration
}: DraftTypedDecoration): DraftTypedDecoration => {
  const isUnerlineDataUndefined = typeof underlineData === 'undefined';
  return decoration.type === Decoration_Type.UNDERLINE
    ? {
        ...decoration,
        type: isUnerlineDataUndefined || underlineData ? 'UNDERLINE' : 'NOT_UNDERLINE',
      }
    : decoration;
};

const decorationComparator = (
  a: RangedDecoration | RangedDecoration[],
  b: RangedDecoration | RangedDecoration[]
) => ('start' in a && 'start' in b ? a.start - b.start : a[0].start - b[0].start);
