import React from 'react';
import type { InlineStyleMapperFunction, InlineStyleMapper } from 'ricos-types';
import { safeJsonParse } from './jsonUtils';
import type { DraftContent } from 'ricos-content';
import {
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_FONT_SIZE_TYPE,
  RICOS_BOLD_TYPE,
  RICOS_ITALIC_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  TEXT_COLOR_TYPE,
} from 'ricos-content';
import { isHexColor } from './colorUtils';
import { getBlocksFromContentState } from './innerRCEBlocksUtils';

export const INLINE_STYLE_TYPES = {
  [RICOS_TEXT_COLOR_TYPE]: 'FG',
  [RICOS_TEXT_HIGHLIGHT_TYPE]: 'BG',
  [RICOS_FONT_SIZE_TYPE]: 'font-size',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PluginConfig = Record<string, any>;

const RICOS_TO_DRAFT_TYPE = {
  [RICOS_TEXT_COLOR_TYPE]: TEXT_COLOR_TYPE,
  [RICOS_TEXT_HIGHLIGHT_TYPE]: TEXT_HIGHLIGHT_TYPE,
};

export type CustomInlineStyleType =
  | keyof typeof INLINE_STYLE_TYPES
  | typeof RICOS_BOLD_TYPE
  | typeof RICOS_ITALIC_TYPE;

export const parseStyleByType = (style: string, type: CustomInlineStyleType) => {
  const property = INLINE_STYLE_TYPES[type];
  const cssRule = safeJsonParse(style);
  return cssRule?.[property];
};

export const dynamicStyleParsers = {
  [RICOS_TEXT_COLOR_TYPE]: (
    style: string,
    styleSelectionPredicate?: (style: string) => boolean
  ) => {
    const color = parseStyleByType(style, RICOS_TEXT_COLOR_TYPE);
    if (styleSelectionPredicate) {
      const parsedStyle = color || style;
      return styleSelectionPredicate(parsedStyle) && parsedStyle;
    } else {
      return color || (isHexColor(style) && style);
    }
  },
  [RICOS_TEXT_HIGHLIGHT_TYPE]: (
    style: string,
    styleSelectionPredicate?: (style: string) => boolean
  ) => {
    const color = parseStyleByType(style, RICOS_TEXT_HIGHLIGHT_TYPE);
    return styleSelectionPredicate ? styleSelectionPredicate(color) && color : color;
  },
  [RICOS_FONT_SIZE_TYPE]: (style: string) => parseStyleByType(style, RICOS_FONT_SIZE_TYPE),
};

export const draftDecorationsToCss = {
  BOLD: { 'font-weight': 'bold' },
  ITALIC: { 'font-style': 'italic' },
  NOT_BOLD: { 'font-weight': 'normal' },
  NOT_ITALIC: { 'font-style': 'normal' },
};

export const defaultStyleFnMapper = {
  [RICOS_TEXT_COLOR_TYPE]: (style: string) => {
    const parsedStyle = dynamicStyleParsers[RICOS_TEXT_COLOR_TYPE](style, isHexColor);
    return parsedStyle ? { color: parsedStyle } : undefined;
  },
  [RICOS_TEXT_HIGHLIGHT_TYPE]: (style: string) => {
    const parsedStyle = dynamicStyleParsers[RICOS_TEXT_HIGHLIGHT_TYPE](style, isHexColor);
    return parsedStyle ? { backgroundColor: parsedStyle } : undefined;
  },
  [RICOS_FONT_SIZE_TYPE]: (style: string) => {
    const parsedStyle = dynamicStyleParsers[RICOS_FONT_SIZE_TYPE](style);
    return parsedStyle ? { fontSize: parsedStyle } : undefined;
  },
  [RICOS_BOLD_TYPE]: (style: string) =>
    style === 'NOT_BOLD' ? { fontWeight: 'normal' } : undefined,
  [RICOS_ITALIC_TYPE]: (style: string) =>
    style === 'NOT_ITALIC' ? { fontStyle: 'normal' } : undefined,
};

const defaultStyleSelectionPredicates = {
  [RICOS_TEXT_COLOR_TYPE]: isHexColor,
  [RICOS_TEXT_HIGHLIGHT_TYPE]: isHexColor,
};

export const getDynamicInlineStyleMapper = (
  type: CustomInlineStyleType
): InlineStyleMapperFunction<PluginConfig> => {
  return (config: PluginConfig, raw: DraftContent) => {
    const settings = config[RICOS_TO_DRAFT_TYPE[type] || ''] || {};
    const styleParser = dynamicStyleParsers[type];
    const styleSelectionPredicate = settings.styleSelectionPredicate
      ? (style: string) => !!styleParser(style, settings.styleSelectionPredicate)
      : (style: string) => !!styleParser(style, defaultStyleSelectionPredicates[type]);
    const customStyleFn = settings.customStyleFn
      ? (style: string) =>
          settings.customStyleFn(styleParser(style, settings.styleSelectionPredicate))
      : defaultStyleFnMapper[type];
    const rawBlocks = getBlocksFromContentState(raw);
    const mapper = rawBlocks.reduce<InlineStyleMapper>((map, block) => {
      if (block.inlineStyleRanges) {
        block.inlineStyleRanges
          .filter(range => styleSelectionPredicate(range.style))
          .forEach(range => {
            map[range.style] = (children, { key }) => (
              <span key={key} style={customStyleFn(range.style)}>
                {children}
              </span>
            );
          });
      }
      return map;
    }, {});
    return () => mapper;
  };
};
