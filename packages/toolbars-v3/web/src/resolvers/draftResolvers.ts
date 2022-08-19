import { getFontSize, getColor } from 'wix-rich-content-editor';
import { HEADER_BLOCK, DRAFT_TO_DOC_TYPE_WITH_LISTS } from 'wix-rich-content-common';
import { hasLinksInSelection } from 'wix-rich-content-editor-common';
import { DraftContentResolver } from '../ContentResolver';
import { RESOLVERS_IDS } from './resolvers-ids';
import type { ContentState, EditorState } from 'wix-rich-content-editor-common';
import type { DocumentStyle } from 'wix-rich-content-common';
import { cloneDeep } from 'lodash';

const getDocumentStyle = (editorState: EditorState) => {
  const currentContent = editorState.getCurrentContent() as ContentState & {
    documentStyle: DocumentStyle;
  };
  return cloneDeep(currentContent.documentStyle || {});
};

const getBlockType = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const blockKey = editorState.getSelection().getAnchorKey();
  const block = contentState.getBlockForKey(blockKey);
  return block.getType();
};

const getBlockStyleFromDocumentStyle = (editorState: EditorState) => {
  const blockType = getBlockType(editorState);
  const documentStyle = getDocumentStyle(editorState);
  return documentStyle?.[DRAFT_TO_DOC_TYPE_WITH_LISTS[blockType]];
};

export const isTextContainsBoldResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_BOLD,
  content => {
    const isBoldInInlineStyle = content.getCurrentInlineStyle().has('BOLD');
    if (isBoldInInlineStyle) return true;

    const blockStyleFromDocumentStyle = getBlockStyleFromDocumentStyle(content);
    const documentStyleProperty = 'font-weight';
    const isBoldInDocumentStyle =
      blockStyleFromDocumentStyle?.[documentStyleProperty] &&
      blockStyleFromDocumentStyle[documentStyleProperty] === 'bold';
    const isNotBoldInInlineStyle = content.getCurrentInlineStyle().has('NOT_BOLD');

    return isBoldInDocumentStyle && !isNotBoldInInlineStyle;
  }
);

export const isTextContainsItalicResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_ITALIC,
  content => {
    const isItalicInInlineStyle = content.getCurrentInlineStyle().has('ITALIC');
    if (isItalicInInlineStyle) return true;

    const blockStyleFromDocumentStyle = getBlockStyleFromDocumentStyle(content);
    const documentStyleProperty = 'font-style';
    const isItalicInDocumentStyle =
      blockStyleFromDocumentStyle?.[documentStyleProperty] &&
      blockStyleFromDocumentStyle[documentStyleProperty] === 'italic';
    const isNotItalicInInlineStyle = content.getCurrentInlineStyle().has('NOT_ITALIC');

    return isItalicInDocumentStyle && !isNotItalicInInlineStyle;
  }
);

export const isTextContainsUnderlineResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_UNDERLINE,
  content => {
    const isUnderlineInInlineStyle = content.getCurrentInlineStyle().has('UNDERLINE');
    if (isUnderlineInInlineStyle) return true;

    const blockStyleFromDocumentStyle = getBlockStyleFromDocumentStyle(content);
    const documentStyleProperty = 'text-decoration';
    const isUnderlineInDocumentStyle =
      blockStyleFromDocumentStyle?.[documentStyleProperty] &&
      blockStyleFromDocumentStyle[documentStyleProperty] === 'underline';
    const isNotUnderlineInInlineStyle = content.getCurrentInlineStyle().has('NOT_UNDERLINE');

    return isUnderlineInDocumentStyle && !isNotUnderlineInInlineStyle;
  }
);

export const isTextContainsQuoteResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_QUOTE,
  content => {
    return getBlockType(content) === 'blockquote';
  }
);

export const isTextContainsCodeblockResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_CODE_BLOCK,
  content => {
    return getBlockType(content) === 'code-block';
  }
);

export const isTextContainsOrderedListResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_ORDERED_LIST,
  content => {
    return getBlockType(content) === 'ordered-list-item';
  }
);

export const isTextContainsUnorderedListResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_UNORDERED_LIST,
  content => {
    return getBlockType(content) === 'unordered-list-item';
  }
);

export const getAlignmentInSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_ALIGNMENT_IN_SELECTION,
  content => {
    const selection = content.getSelection();
    const contentState = content.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const {
      data: { textAlignment },
    } = block.toJS();
    return textAlignment;
  }
);

export const getHeadingInSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_HEADING_IN_SELECTION,
  content => {
    const contentState = content.getCurrentContent();
    const blockKey = content.getSelection().getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);
    const blockType = block.getType();
    const headings = Object.values(HEADER_BLOCK);
    return headings.find(headingType => blockType === headingType);
  }
);

export const getLineSpacingInSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_LINE_SPACING_IN_SELECTION,
  content => {
    const anchorKey = content.getSelection().getAnchorKey();
    const block = content.getCurrentContent().getBlockForKey(anchorKey);
    const {
      data: { dynamicStyles = {} },
    } = block.toJS();
    return dynamicStyles['line-height'];
  }
);

export const getLineSpacingBeforeSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_LINE_SPACING_BEFORE_SELECTION,
  content => {
    const anchorKey = content.getSelection().getAnchorKey();
    const block = content.getCurrentContent().getBlockForKey(anchorKey);
    const {
      data: { dynamicStyles = {} },
    } = block.toJS();
    return dynamicStyles['padding-top'];
  }
);

export const getLineSpacingAfterSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_LINE_SPACING_AFTER_SELECTION,
  content => {
    const anchorKey = content.getSelection().getAnchorKey();
    const block = content.getCurrentContent().getBlockForKey(anchorKey);
    const {
      data: { dynamicStyles = {} },
    } = block.toJS();
    return dynamicStyles['padding-bottom'];
  }
);

export const getFontSizeInSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_FONT_SIZE_IN_SELECTION,
  content => {
    const fontSize = getFontSize(content) || '';
    const pxRegex = new RegExp('[0-9]+[px]');
    const fontSizeNumber = pxRegex.exec(fontSize) ? fontSize.split('p')[0] : '';
    return fontSizeNumber;
  }
);

export const isTextContainsLinkResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_LINK,
  content => {
    return hasLinksInSelection(content);
  }
);

export const isTextContainsSpoilerResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_SPOILER,
  content => {
    return content.getCurrentInlineStyle().has('wix-rich-content-plugin-spoiler');
  }
);

export const getTextColorInSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_TEXT_COLOR_IN_SELECTION,
  content => {
    const textColor = getColor(content, 'ricos-text-color');
    return textColor;
  }
);

export const getHighlightColorInSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_HIGHLIGHT_COLOR_IN_SELECTION,
  content => {
    const highlightColor = getColor(content, 'ricos-text-highlight');
    return highlightColor;
  }
);

export const isUndoStackEmptyResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_UNDO_STACK_EMPTY,
  content => {
    return content.getUndoStack().size === 0;
  }
);

export const isRedoStackEmptyResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_REDO_STACK_EMPTY,
  content => {
    return content.getRedoStack().size === 0;
  }
);

export const alwaysVisibleResolver = DraftContentResolver.create(
  RESOLVERS_IDS.ALWAYS_VISIBLE,
  () => {
    return true;
  }
);
