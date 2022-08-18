import {
  getSelectedBlocks,
  getSelectionRange,
  isInSelectionRange,
  EditorState,
  Modifier,
} from '../index';
import { uniq } from 'lodash';
import type { CustomInlineStyleType } from 'wix-rich-content-common';
import {
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_FONT_SIZE_TYPE,
  RICOS_BOLD_TYPE,
  RICOS_ITALIC_TYPE,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  defaultStyleFnMapper,
  dynamicStyleParsers,
} from 'wix-rich-content-common';

export const getBlockStyleRanges = (
  block,
  styleSelectionPredicate?: (style: string) => unknown
) => {
  const styleRanges: { start: number; end: number; style: string }[] = [];

  block.findStyleRanges(
    character => {
      const styles = character.getStyle();
      return styles
        .toArray()
        .filter(style => (styleSelectionPredicate ? styleSelectionPredicate(style) : style));
    },
    (start, end) => {
      const styles = block
        .getInlineStyleAt(start)
        .filter(style => (styleSelectionPredicate ? styleSelectionPredicate(style) : style));
      styles.toArray().forEach(style => styleRanges.push({ start, end, style }));
    }
  );
  return styleRanges;
};

const flatStyleRanges = (
  blockStyleRanges: { start: number; end: number; style: string }[] = []
) => {
  const ranges = [blockStyleRanges[0]];
  blockStyleRanges.slice(1).forEach(range => {
    const index = ranges.length - 1;
    if (ranges[index].end === range?.start && ranges[index].style === range.style) {
      ranges[index].end = range.end;
    } else {
      ranges.push(range);
    }
  });
  return ranges;
};

export const hasOneStyleInSelection = (block, editorState, styleSelectionPredicate) => {
  const blockSelectionRange = getSelectionRange(editorState, block);
  const blockStyleRanges = flatStyleRanges(
    getBlockStyleRanges(block, styleSelectionPredicate).filter(range =>
      isInSelectionRange(blockSelectionRange, [range.start, range.end])
    )
  );
  return (
    blockStyleRanges.length === 1 &&
    blockStyleRanges[0]?.start <= blockSelectionRange[0] &&
    blockStyleRanges[0]?.end >= blockSelectionRange[1]
  );
};

export const getSelectionStyles = (
  editorState: EditorState,
  styleSelectionPredicate?: (style: string) => unknown
) => {
  const selectedBlocks = getSelectedBlocks(editorState);
  return uniq(
    selectedBlocks.reduce((selectedStyles, block) => {
      const blockSelectionRange = getSelectionRange(editorState, block);

      // for each selected block, get its style ranges (only for styles that meet the styleSelectionPredicate criteria)
      const blockStyleRanges = getBlockStyleRanges(block, styleSelectionPredicate); // { start, end, style }

      // if style range is in selection, add this style to result set
      return [
        ...selectedStyles,
        ...blockStyleRanges
          .filter(range => isInSelectionRange(blockSelectionRange, [range.start, range.end]))
          .map(range => range.style),
      ];
    }, [])
  );
};

export const removeCurrentInlineStyle = (
  editorState: EditorState,
  styleSelectionPredicate?: (style: string) => unknown
) => {
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    const currentStyles = editorState.getCurrentInlineStyle();
    const currentStylesAsArray = currentStyles.toJS();
    let newCurrentStyles = currentStyles;
    currentStylesAsArray.forEach(style => {
      if (styleSelectionPredicate?.(style)) {
        newCurrentStyles = newCurrentStyles.remove(style);
      }
    });
    return EditorState.setInlineStyleOverride(editorState, newCurrentStyles);
  }
  const currentStyles = getSelectionStyles(editorState, styleSelectionPredicate);
  return currentStyles.reduce((nextEditorState, style) => {
    const contentState = nextEditorState.getCurrentContent();
    const nextContentState = Modifier.removeInlineStyle(contentState, selection, style);
    return EditorState.push(nextEditorState, nextContentState, 'change-inline-style');
  }, editorState);
};

export const setInlineStyle = (editorState: EditorState, inlineStyle: string) => {
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    const currentStyle = editorState.getCurrentInlineStyle();
    return EditorState.setInlineStyleOverride(editorState, currentStyle.add(inlineStyle));
  }
  const contentState = Modifier.applyInlineStyle(
    editorState.getCurrentContent(),
    selection,
    inlineStyle
  );
  return EditorState.push(editorState, contentState, 'change-inline-style');
};

export const getDefaultStyleFn = (type: CustomInlineStyleType) => styles =>
  styles.toArray().reduce((cssStyle, style) => {
    return {
      ...cssStyle,
      ...defaultStyleFnMapper[type](style),
    };
  }, {});

export const getCustomStyleFn = (
  customStyleFn,
  styleSelectionPredicate,
  type: CustomInlineStyleType
) => {
  const styleParser = dynamicStyleParsers[type];
  return styles => {
    const filteredStyles = styles
      .filter((style: string) => styleParser(style, styleSelectionPredicate))
      .map((style: string) => styleParser(style, styleSelectionPredicate));
    return customStyleFn(filteredStyles);
  };
};

export const getCustomStyleFns = config => {
  const { [TEXT_COLOR_TYPE]: colorSetting = {}, [TEXT_HIGHLIGHT_TYPE]: highlightSettings = {} } =
    config;
  const colorTypes = [
    { type: RICOS_TEXT_COLOR_TYPE, setting: colorSetting },
    { type: RICOS_TEXT_HIGHLIGHT_TYPE, setting: highlightSettings },
  ];
  const inlineStyleTypes: CustomInlineStyleType[] = [
    RICOS_FONT_SIZE_TYPE,
    RICOS_ITALIC_TYPE,
    RICOS_BOLD_TYPE,
  ];
  return [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...colorTypes.map((style: { type: CustomInlineStyleType; setting: any }) => {
      const {
        type,
        setting: { customStyleFn, styleSelectionPredicate },
      } = style;
      return customStyleFn
        ? getCustomStyleFn(customStyleFn, styleSelectionPredicate, type)
        : getDefaultStyleFn(type);
    }),
    ...inlineStyleTypes.map(type => getDefaultStyleFn(type)),
  ];
};
