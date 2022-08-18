/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import type {
  RicosContentBlock,
  RicosEntityMap,
  RicosEntityRange,
  RicosInlineStyleRange,
} from '../../../types';
import { EMOJI_TYPE } from '../../../consts';
import type { Decoration, Node } from 'ricos-schema';
import { Decoration_Type, Node_Type } from 'ricos-schema';
import { TO_RICOS_DECORATION_TYPE, TO_RICOS_INLINE_STYLE_TYPE } from '../consts';

import { isEmpty, merge } from 'lodash';
import { getEntity } from './getRicosEntityData';
import { createTextNode } from '../../nodeUtils';
import type { FromDraftOptions } from './fromDraft';

type KeyType = string | number;
type StyleType = string;

const isEmptyTextNode = node => node.type === Node_Type.TEXT && node.textData?.text === '';

const removeEmojiEntities = (
  entityRanges: RicosEntityRange[],
  entityMap: RicosEntityMap
): RicosEntityRange[] =>
  entityRanges.filter(range => !['EMOJI_TYPE', EMOJI_TYPE].includes(entityMap[range.key].type));

const removeUnsupportedDecorations = (
  inlineStyleRanges: RicosInlineStyleRange[]
): RicosInlineStyleRange[] => inlineStyleRanges.filter(range => isDecorationType(range.style));

const mergeColorDecorations = (decorations: Decoration[]): Decoration[] => {
  const colorDecorations = decorations.filter(
    decoration => decoration.type === Decoration_Type.COLOR
  );
  const otherDecorations = decorations.filter(
    decoration => decoration.type !== Decoration_Type.COLOR
  );
  return colorDecorations.length > 0
    ? otherDecorations.concat([merge({}, ...colorDecorations)])
    : otherDecorations;
};

const isDecorationType = (decorationType: string) =>
  TO_RICOS_DECORATION_TYPE[decorationType] !== undefined ||
  TO_RICOS_INLINE_STYLE_TYPE[decorationType] !== undefined ||
  Object.keys(dynamicDecorationGetters).some(dynamicType => decorationType.includes(dynamicType));

const dynamicDecorationGetters = {
  FG: (style: string) => {
    return {
      type: Decoration_Type.COLOR,
      colorData: { foreground: style },
    };
  },
  BG: (style: string) => {
    return {
      type: Decoration_Type.COLOR,
      colorData: { background: style },
    };
  },
  'font-size': (style: string) => {
    const [value, unit] = style.split(/(px|em)/gi);
    return {
      type: Decoration_Type.FONT_SIZE,
      fontSizeData: {
        unit: unit.toUpperCase(),
        value: parseInt(value),
      },
    };
  },
};

export const getTextNodes = (
  block: RicosContentBlock,
  entityMap: RicosEntityMap,
  { ignoreUnsupportedValues }: FromDraftOptions = {}
): Node[] => {
  const createTextNodeWithDecorations = ({
    text,
    styles = [],
    keys = [],
  }: {
    text: string;
    styles: StyleType[];
    keys: KeyType[];
  }): Node => {
    const textNode: Node = createTextNode(text);

    let decorations: Decoration[] = [];

    const keysDecorations = keys
      .map(key => getEntity(key, entityMap))
      .filter(x => x) as Decoration[];
    const stylesDecorations = mergeColorDecorations(styles.map(style => getDecoration(style)));
    decorations = [...decorations, ...keysDecorations, ...stylesDecorations];

    if (!isEmpty(decorations) && textNode.textData) {
      textNode.textData.decorations = decorations;
    }

    return textNode;
  };

  const getDecoration = (style: StyleType): Decoration => {
    let decoration: Decoration;
    try {
      const styleObj = JSON.parse(style);
      const type = Object.keys(styleObj)[0];
      const value = Object.values<string>(styleObj)[0];
      decoration = dynamicDecorationGetters[type](value);
    } catch {
      if (!isDecorationType(style) && !ignoreUnsupportedValues) {
        throw Error(`Unknown decoration type "${style}"!`);
      }
      decoration = TO_RICOS_INLINE_STYLE_TYPE[style] || {
        type: TO_RICOS_DECORATION_TYPE[style],
      };
    }
    return decoration;
  };

  const { text, inlineStyleRanges, entityRanges } = block;
  if (text.length === 0) {
    return [];
  }
  const supportedInlineStyleRanges = ignoreUnsupportedValues
    ? removeUnsupportedDecorations(inlineStyleRanges)
    : inlineStyleRanges;
  const rangeMap = {};
  [...supportedInlineStyleRanges, ...removeEmojiEntities(entityRanges, entityMap)].forEach(
    ({ offset, length, ...props }) => {
      rangeMap[offset] = [...(rangeMap[offset] || []), { action: 'start', ...props }];
      rangeMap[offset + length] = [
        ...(rangeMap[offset + length] || []),
        { action: 'end', ...props },
      ];
    }
  );

  const textNodes: Node[] = [];

  let styles: StyleType[] = [];
  let keys: KeyType[] = [];
  if (!rangeMap[0]) {
    rangeMap[0] = [];
  }

  const numbers = Object.keys(rangeMap).map(Number);

  numbers.forEach((point, i) => {
    if (numbers[i] < text.length) {
      rangeMap[point].forEach(({ action, key, style }) => {
        if (action === 'start') {
          if (style) {
            styles.push(style);
          } else {
            keys.push(key);
          }
        } else if (style) {
          styles = styles.filter(s => s !== style);
        } else {
          keys = keys.filter(s => s !== key);
        }
      });

      textNodes.push(
        createTextNodeWithDecorations({
          text: Array.from(text)
            .slice(numbers[i], numbers[i + 1])
            .join(''),
          styles,
          keys,
        })
      );
    }
  });

  return textNodes.filter(node => !isEmptyTextNode(node));
};
