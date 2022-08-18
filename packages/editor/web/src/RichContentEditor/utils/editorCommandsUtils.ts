import type { EditorState, ContentState, ContentBlock } from 'wix-rich-content-editor-common';
import {
  DraftOffsetKey,
  getBlockType,
  RichUtils,
  getDraftInlineStyle,
  getSelectionStyles,
  hasOneStyleInSelection,
  getSelectedBlocks,
  removeCurrentInlineStyle,
  setInlineStyle,
  getAnchorBlockData,
  getBlockStyleRanges,
  getSelectionRange,
} from 'wix-rich-content-editor-common';
import { cloneDeep, uniq, pick } from 'lodash';
import type {
  RicosCustomStyles,
  DocumentStyle,
  InlineStyle,
  CustomInlineStyleType,
} from 'wix-rich-content-common';
import {
  INLINE_STYLE_TYPES,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_FONT_SIZE_TYPE,
  dynamicStyleParsers,
  safeJsonParse,
  draftDecorationsToCss,
  DRAFT_TO_DOC_TYPE,
  DRAFT_TO_DOC_TYPE_WITH_LISTS,
  defaultFontSizes,
  defaultMobileFontSizes,
} from 'wix-rich-content-common';

import { DRAFT_TO_RICOS_CUSTOM_STYLES } from './consts';

export const getWiredFontStyles = (
  documentStyle?: DocumentStyle,
  customStyles?: RicosCustomStyles,
  isMobile?: boolean
) => {
  const fontSizes = {};
  Object.entries(DRAFT_TO_DOC_TYPE).forEach(([draftHeader, ricosHeader]) => {
    fontSizes[ricosHeader] = {
      'font-size':
        documentStyle?.[ricosHeader]?.['font-size'] ||
        customStyles?.[DRAFT_TO_RICOS_CUSTOM_STYLES[draftHeader]]?.fontSize ||
        (isMobile ? defaultMobileFontSizes[ricosHeader] : defaultFontSizes[ricosHeader]),
      'font-family':
        customStyles?.[DRAFT_TO_RICOS_CUSTOM_STYLES[draftHeader]]?.fontFamily ||
        'HelveticaNeue, Helvetica, Arial',
    };
  });
  return fontSizes;
};

export const getDocumentStyle = (editorState: EditorState) => {
  const currentContent = editorState.getCurrentContent() as ContentState & {
    documentStyle: DocumentStyle;
  };
  return cloneDeep(currentContent.documentStyle || {});
};

export const updateDocumentStyle = (editorState: EditorState, documentStyle: DocumentStyle) => {
  const currentContent = editorState.getCurrentContent() as ContentState & {
    documentStyle: DocumentStyle;
  };
  currentContent.documentStyle = {
    ...currentContent.documentStyle,
    ...documentStyle,
  };
  return editorState;
};

const getInlineStylesByType = (editorState: EditorState, type: CustomInlineStyleType) => {
  const styleParser = dynamicStyleParsers[type];
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    const currentStyles = editorState.getCurrentInlineStyle();
    const currentStylesAsArray = currentStyles.toJS();
    let styleToReturn;
    currentStylesAsArray.forEach(style => {
      styleToReturn = styleParser?.(style) ? styleParser?.(style) : styleToReturn;
    });
    return [styleToReturn];
  }
  return getSelectionStyles(editorState, styleParser).map(style => styleParser(style));
};

const TYPE_TO_CSS_PROPERTY = {
  [RICOS_TEXT_COLOR_TYPE]: 'color',
  [RICOS_TEXT_HIGHLIGHT_TYPE]: 'background-color',
  [RICOS_FONT_SIZE_TYPE]: 'font-size',
};

const hasTextInSelection = (block: ContentBlock, editorState: EditorState) => {
  const blockSelectionRange = getSelectionRange(editorState, block);
  return (
    blockSelectionRange[0] !== blockSelectionRange[1] || editorState.getSelection().isCollapsed()
  );
};

const getSelectionStylesFromDOM = (editorState: EditorState, type: CustomInlineStyleType) => {
  let currentStyles: (string | null)[] = [];
  const styleParser = dynamicStyleParsers[type];
  getSelectedBlocks(editorState)
    .filter(block => hasTextInSelection(block, editorState))
    .filter(block => !hasOneStyleInSelection(block, editorState, styleParser))
    .forEach(block => {
      const offsetKey = DraftOffsetKey.encode(block.getKey(), 0, 0);
      const nodes = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`);
      currentStyles = [
        ...currentStyles,
        ...Array.from(nodes)
          .filter(node => node.tagName === 'SPAN')
          .map(node => window.getComputedStyle(node).getPropertyValue(TYPE_TO_CSS_PROPERTY[type])),
      ];
    });
  return currentStyles;
};

const setInlineStyleByType = (
  editorState: EditorState,
  type: CustomInlineStyleType,
  style?: string
) => {
  const styleParser = dynamicStyleParsers[type];
  let newEditorState = removeCurrentInlineStyle(editorState, styleParser);
  if (style) {
    const inlineStyle = JSON.stringify({
      [INLINE_STYLE_TYPES[type]]: style,
    });
    newEditorState = setInlineStyle(newEditorState, inlineStyle);
  }
  return newEditorState;
};

export const getFontSize = (editorState: EditorState) => {
  const inlineFontSizes = getInlineStylesByType(editorState, RICOS_FONT_SIZE_TYPE);
  const shouldGetStylesFromDOM = !editorState.getSelection().isCollapsed() || !inlineFontSizes?.[0];
  const currentFontSizes = uniq(
    [
      ...inlineFontSizes,
      ...(shouldGetStylesFromDOM
        ? getSelectionStylesFromDOM(editorState, RICOS_FONT_SIZE_TYPE)
        : []),
    ].filter(fontSize => fontSize)
  );
  return currentFontSizes.length === 1 ? currentFontSizes[0] : '';
};

const getBlockStyle = (editorState: EditorState, getDocumentStyle) => {
  const blockType = getBlockType(editorState);
  const documentStyle = getDocumentStyle?.();
  return documentStyle?.[DRAFT_TO_DOC_TYPE_WITH_LISTS[blockType]];
};

export const setFontSize = (
  editorState: EditorState,
  data?: { fontSize?: string },
  getDocumentStyle?: unknown
) => {
  const blockStyles = getBlockStyle(editorState, getDocumentStyle);
  const style = data?.fontSize ? data.fontSize + 'px' : undefined;
  return getFontSize(editorState) === style
    ? editorState
    : blockStyles?.['font-size'] === style
    ? setInlineStyleByType(editorState, RICOS_FONT_SIZE_TYPE)
    : setInlineStyleByType(editorState, RICOS_FONT_SIZE_TYPE, style);
};

export const getColor = (editorState: EditorState, type: CustomInlineStyleType) => {
  const currentColors = getInlineStylesByType(editorState, type);
  return currentColors[0];
};

export const setTextColor = (editorState: EditorState, data?: { color?: string }) =>
  setInlineStyleByType(editorState, RICOS_TEXT_COLOR_TYPE, data?.color);

export const setHighlightColor = (editorState: EditorState, data?: { color?: string }) =>
  setInlineStyleByType(editorState, RICOS_TEXT_HIGHLIGHT_TYPE, data?.color);

const INLINE_STYLE_TO_OPPOSITE = {
  bold: 'NOT_BOLD',
  italic: 'NOT_ITALIC',
};

const INLINE_STYLE_TO_PROPERTY = {
  bold: 'font-weight',
  italic: 'font-style',
};

export const toggleInlineStyle = (
  editorState: EditorState,
  inlineStyle: InlineStyle,
  getDocumentStyle
) => {
  const blockStyles = getBlockStyle(editorState, getDocumentStyle);
  if (['bold', 'italic'].includes(inlineStyle)) {
    if (blockStyles?.[INLINE_STYLE_TO_PROPERTY[inlineStyle]] === inlineStyle) {
      const shouldSetStyle =
        getSelectionStyles(editorState, style => style === INLINE_STYLE_TO_OPPOSITE[inlineStyle])
          .length === 0;
      const newEditorState = removeCurrentInlineStyle(
        editorState,
        style =>
          style === getDraftInlineStyle(inlineStyle) ||
          style === INLINE_STYLE_TO_OPPOSITE[inlineStyle]
      );
      return shouldSetStyle
        ? setInlineStyle(newEditorState, INLINE_STYLE_TO_OPPOSITE[inlineStyle])
        : newEditorState;
    }
  }
  return RichUtils.toggleInlineStyle(editorState, getDraftInlineStyle(inlineStyle));
};

const dynamicDecorationGetters = {
  FG: (value: string) => {
    return {
      color: value,
    };
  },
  BG: (value: string) => {
    return {
      'background-color': value,
    };
  },
  'font-size': (value: string) => {
    return {
      'font-size': value,
    };
  },
};

export const getAnchorBlockInlineStyles = (editorState: EditorState) => {
  const { dynamicStyles = {} } = getAnchorBlockData(editorState);
  let inlineStyles = pick(dynamicStyles, ['line-height', 'padding-top', 'padding-bottom']);
  const anchorKey = editorState.getSelection().getAnchorKey();
  const block = editorState.getCurrentContent().getBlockForKey(anchorKey);
  getBlockStyleRanges(block).forEach(range => {
    const [key, value] = Object.entries(safeJsonParse(range.style) || { key: '' })[0];
    inlineStyles = {
      ...inlineStyles,
      ...draftDecorationsToCss[range.style],
      ...dynamicDecorationGetters[key]?.(value),
    };
  });
  return inlineStyles;
};

export const getInlineStylesInSelection = (editorState: EditorState) => {
  const { dynamicStyles = {} } = getAnchorBlockData(editorState);
  let inlineStyles = pick(dynamicStyles, ['line-height', 'padding-top', 'padding-bottom']);
  const anchorKey = editorState.getSelection().getAnchorKey();
  const block = editorState.getCurrentContent().getBlockForKey(anchorKey);
  const selectionStartIndex = editorState.getSelection().getStartOffset();
  getBlockStyleRanges(block).forEach(range => {
    if (selectionStartIndex >= range.start && selectionStartIndex < range.end) {
      const [key, value] = Object.entries(safeJsonParse(range.style) || { key: '' })[0];
      inlineStyles = {
        ...inlineStyles,
        ...draftDecorationsToCss[range.style],
        ...dynamicDecorationGetters[key]?.(value),
      };
    }
  });
  return inlineStyles;
};
