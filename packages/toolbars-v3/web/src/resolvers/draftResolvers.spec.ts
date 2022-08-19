import {
  alwaysVisibleResolver,
  isTextContainsBoldResolver,
  isTextContainsItalicResolver,
  isTextContainsUnderlineResolver,
  isTextContainsQuoteResolver,
  isTextContainsCodeblockResolver,
  isTextContainsOrderedListResolver,
  isTextContainsUnorderedListResolver,
  isTextContainsSpoilerResolver,
  getAlignmentInSelectionResolver,
  getHeadingInSelectionResolver,
  getLineSpacingInSelectionResolver,
  getLineSpacingBeforeSelectionResolver,
  getLineSpacingAfterSelectionResolver,
  getFontSizeInSelectionResolver,
  isTextContainsLinkResolver,
  getTextColorInSelectionResolver,
  getHighlightColorInSelectionResolver,
  isUndoStackEmptyResolver,
  isRedoStackEmptyResolver,
} from './draftResolvers';
import { EditorState } from '@wix/draft-js';

let editorState;

describe('draft resolvers', () => {
  beforeEach(() => {
    editorState = EditorState.createEmpty();
  });
  describe('alwaysVisible', () => {
    it('should always return true', () => {
      expect(alwaysVisibleResolver.resolve(editorState)).toBe(true);
    });
  });

  describe('isTextContainsBold', () => {
    it('should return true if selected text have bold in inlineStyle', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'BOLD') {
          return true;
        }
      });
      currentInlineStyle.has = hasMock;
      expect(isTextContainsBoldResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('BOLD');
    });

    it('should return true if selected text have bold in documentStyle', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'BOLD') {
          return false;
        }
      });
      currentInlineStyle.has = hasMock;

      const currentContentState = editorState.getCurrentContent();
      currentContentState.documentStyle = {
        paragraph: {
          'font-weight': 'bold',
        },
      };
      expect(isTextContainsBoldResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('BOLD');
    });
  });

  describe('isTextContainsItalicResolver', () => {
    it('should return true if selected text have italic in inlineStyle', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'ITALIC') {
          return true;
        }
      });
      currentInlineStyle.has = hasMock;
      expect(isTextContainsItalicResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('ITALIC');
    });

    it('should return true if selected text have italic in documentStyle', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'ITALIC') {
          return false;
        }
      });
      currentInlineStyle.has = hasMock;

      const currentContentState = editorState.getCurrentContent();
      currentContentState.documentStyle = {
        paragraph: {
          'font-style': 'italic',
        },
      };
      expect(isTextContainsItalicResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('ITALIC');
    });
  });

  describe('isTextContainsUnderlineResolver', () => {
    it('should return true if selected text have underline in inlineStyle', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'UNDERLINE') {
          return true;
        }
      });
      currentInlineStyle.has = hasMock;
      expect(isTextContainsUnderlineResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('UNDERLINE');
    });

    it('should return true if selected text have underline in documentStyle', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'UNDERLINE') {
          return false;
        }
      });
      currentInlineStyle.has = hasMock;

      const currentContentState = editorState.getCurrentContent();
      currentContentState.documentStyle = {
        paragraph: {
          'text-decoration': 'underline',
        },
      };
      expect(isTextContainsUnderlineResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('UNDERLINE');
    });
  });

  describe('isTextContainsQuoteResolver', () => {
    it('should return true if selected text is quote', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_blockKey => {
        const block = { getType: () => 'blockquote' };
        return block;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(isTextContainsQuoteResolver.resolve(editorState)).toBe(true);
    });
  });

  describe('isTextContainsCodeblockResolver', () => {
    it('should return true if selected text is code block', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_blockKey => {
        const block = { getType: () => 'code-block' };
        return block;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(isTextContainsCodeblockResolver.resolve(editorState)).toBe(true);
    });
  });

  describe('isTextContainsOrderedListResolver', () => {
    it('should return true if selected text is ordered list', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_blockKey => {
        const block = { getType: () => 'ordered-list-item' };
        return block;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(isTextContainsOrderedListResolver.resolve(editorState)).toBe(true);
    });
  });

  describe('isTextContainsUnorderedListResolver', () => {
    it('should return true if selected text is unordered list', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_blockKey => {
        const block = { getType: () => 'unordered-list-item' };
        return block;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(isTextContainsUnorderedListResolver.resolve(editorState)).toBe(true);
    });
  });

  describe('isTextContainsSpoilerResolver', () => {
    it('should return true if selected text is with spoiler', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'wix-rich-content-plugin-spoiler') {
          return true;
        }
      });
      currentInlineStyle.has = hasMock;
      expect(isTextContainsSpoilerResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('wix-rich-content-plugin-spoiler');
    });
  });

  describe('getAlignmentInSelectionResolver', () => {
    it('should return "left" as the selected text alignment', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: { textAlignment: 'left' } };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getAlignmentInSelectionResolver.resolve(editorState)).toBe('left');
    });
    it('should return "center" as the selected text alignment', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: { textAlignment: 'center' } };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getAlignmentInSelectionResolver.resolve(editorState)).toBe('center');
    });
    it('should return "undefined" as the selected text alignment', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: {} };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getAlignmentInSelectionResolver.resolve(editorState)).toBe(undefined);
    });
  });

  describe('getHeadingInSelectionResolver', () => {
    it('should return "header-two" as the selected text heading', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_blockKey => {
        const block = { getType: () => 'header-two' };
        return block;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getHeadingInSelectionResolver.resolve(editorState)).toBe('header-two');
    });
    it('should return "unstyled" as the selected text heading', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_blockKey => {
        const block = { getType: () => 'unstyled' };
        return block;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getHeadingInSelectionResolver.resolve(editorState)).toBe('unstyled');
    });
  });

  describe('getLineSpacingInSelectionResolver', () => {
    it('should return "2.5" as the selected text line spacing', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: { dynamicStyles: { 'line-height': '2.5' } } };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getLineSpacingInSelectionResolver.resolve(editorState)).toBe('2.5');
    });
    it('should return "1" as the selected text line spacing', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: { dynamicStyles: { 'line-height': '1' } } };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getLineSpacingInSelectionResolver.resolve(editorState)).toBe('1');
    });
    it('should return "undefined" as the selected text line spacing', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: {} };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getLineSpacingInSelectionResolver.resolve(editorState)).toBe(undefined);
    });
  });

  describe('getLineSpacingBeforeSelectionResolver', () => {
    it('should return "2.5" as the text line spacing before the selection', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: { dynamicStyles: { 'padding-top': '2.5' } } };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getLineSpacingBeforeSelectionResolver.resolve(editorState)).toBe('2.5');
    });
    it('should return "1" as the text line spacing before the selection', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: { dynamicStyles: { 'padding-top': '1' } } };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getLineSpacingBeforeSelectionResolver.resolve(editorState)).toBe('1');
    });
    it('should return "undefined" as the text line spacing before the selection', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: {} };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getLineSpacingBeforeSelectionResolver.resolve(editorState)).toBe(undefined);
    });
  });

  describe('getLineSpacingAfterSelectionResolver', () => {
    it('should return "2.5" as the text line spacing after the selection', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: { dynamicStyles: { 'padding-bottom': '2.5' } } };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getLineSpacingAfterSelectionResolver.resolve(editorState)).toBe('2.5');
    });
    it('should return "1" as the text line spacing after the selection', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: { dynamicStyles: { 'padding-bottom': '1' } } };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getLineSpacingAfterSelectionResolver.resolve(editorState)).toBe('1');
    });
    it('should return "undefined" as the text line spacing after the selection', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_selectionStartKey => {
        const contentBlock = {
          toJS: () => {
            return { data: {} };
          },
        };
        return contentBlock;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(getLineSpacingAfterSelectionResolver.resolve(editorState)).toBe(undefined);
    });
  });

  describe('getFontSizeInSelectionResolver', () => {
    const wixRichContentEditorExported = require('wix-rich-content-editor');
    it('should check if the function getFontSize from "wix-rich-content-editor" is called', () => {
      const spy = jest.spyOn(wixRichContentEditorExported, 'getFontSize');
      getFontSizeInSelectionResolver.resolve(editorState);
      expect(spy).toBeCalled();
      jest.resetModules();
    });
  });

  describe('isTextContainsLinkResolver', () => {
    const wixRichContentEditorCommonExported = require('wix-rich-content-editor-common');
    it('should check if the function hasLinksInSelection from "wix-rich-content-editor-common" is called', () => {
      const spy = jest.spyOn(wixRichContentEditorCommonExported, 'hasLinksInSelection');
      isTextContainsLinkResolver.resolve(editorState);
      expect(spy).toBeCalled();
      jest.resetModules();
    });
  });

  describe('getTextColorInSelectionResolver', () => {
    const wixRichContentEditorExported = require('wix-rich-content-editor');
    it('should check if the function getColor from "wix-rich-content-editor" is called', () => {
      const spy = jest.spyOn(wixRichContentEditorExported, 'getColor');
      getTextColorInSelectionResolver.resolve(editorState);
      expect(spy).toBeCalledWith(editorState, 'ricos-text-color');
      jest.resetModules();
    });
  });

  describe('getHighlightColorInSelectionResolver', () => {
    const wixRichContentEditorExported = require('wix-rich-content-editor');
    it('should check if the function getColor from "wix-rich-content-editor" is called', () => {
      const spy = jest.spyOn(wixRichContentEditorExported, 'getColor');
      getHighlightColorInSelectionResolver.resolve(editorState);
      expect(spy).toBeCalledWith(editorState, 'ricos-text-highlight');
      jest.resetModules();
    });
  });

  describe('isUndoStackEmptyResolver', () => {
    it('should return true if the undo stack is empty', () => {
      const getUndoStackMock = jest.fn(() => {
        return { size: 0 };
      });
      editorState.getUndoStack = getUndoStackMock;
      expect(isUndoStackEmptyResolver.resolve(editorState)).toBe(true);
      expect(getUndoStackMock).toBeCalled();
    });

    it('should return false if the undo stack is not empty', () => {
      const getUndoStackMock = jest.fn(() => {
        return { size: 1 };
      });
      editorState.getUndoStack = getUndoStackMock;
      expect(isUndoStackEmptyResolver.resolve(editorState)).toBe(false);
      expect(getUndoStackMock).toBeCalled();
    });
  });

  describe('isRedoStackEmptyResolver', () => {
    it('should return true if the redo stack is empty', () => {
      const getRedoStackMock = jest.fn(() => {
        return { size: 0 };
      });
      editorState.getRedoStack = getRedoStackMock;
      expect(isRedoStackEmptyResolver.resolve(editorState)).toBe(true);
      expect(getRedoStackMock).toBeCalled();
    });

    it('should return false if the redo stack is not empty', () => {
      const getRedoStackMock = jest.fn(() => {
        return { size: 1 };
      });
      editorState.getRedoStack = getRedoStackMock;
      expect(isRedoStackEmptyResolver.resolve(editorState)).toBe(false);
      expect(getRedoStackMock).toBeCalled();
    });
  });
});
