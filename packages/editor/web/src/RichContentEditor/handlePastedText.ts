import type { BlockMap, EditorChangeType } from 'wix-rich-content-editor-common';
import {
  EditorState,
  Modifier,
  SelectionState,
  ContentState,
  createEntity,
} from 'wix-rich-content-editor-common';
import draftConvertFromHtml from './utils/draftConvertFromHtml';
import {
  pastedContentConfig,
  clearUnnecessaryInlineStyles,
} from './utils/pasting/pastedContentUtil';
import normalizeHTML from './utils/pasting/normalizeHTML';
import { convertFromRaw } from '../../lib/editorStateConversion';
import type { DraftContent, RicosContentBlock, RicosEntityMap } from 'ricos-content';
import { COLLAPSIBLE_LIST_TYPE, isListType } from 'ricos-content';

const clearAtomicBlockEntities = editorState => {
  let contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockKey = selectionState.getStartKey();
  const block = contentState.getBlockForKey(blockKey);

  if (block.getType() === 'atomic') {
    const blockSelection = SelectionState.createEmpty(blockKey);
    contentState = Modifier.removeRange(contentState, blockSelection, 'backward');
    contentState = Modifier.setBlockType(contentState, blockSelection, 'unstyled');
  }
  return contentState;
};

const FRAGMENT_ATTR = 'data-draftjs-conductor-fragment';

//Fix replaceWithFragment when fragment size == 1, https://github.com/facebook/draft-js/issues/1511
const replaceWithFragment = (
  contentState: ContentState,
  selection: SelectionState,
  fragment: BlockMap
) => {
  let contentWithFragment = Modifier.replaceWithFragment(contentState, selection, fragment);

  const startBlockKey = selection.getStartKey();
  const isEmptyBlock = contentState.getBlockMap().get(startBlockKey).getText() === '';

  const startBlockType = contentState.getBlockMap().get(startBlockKey).getType();

  const fragmentSize = fragment.size;
  if (fragmentSize === 1 && isEmptyBlock && !isListType(startBlockType)) {
    const pastedBlockType = fragment.values().next().value.getType();

    contentWithFragment = Modifier.setBlockType(
      contentWithFragment,
      contentWithFragment.getSelectionAfter(),
      pastedBlockType
    );
  }
  return contentWithFragment;
};

const applyPasteOnContentState = (editorState: EditorState, contentToPaste: ContentState) => {
  const contentState = clearAtomicBlockEntities(editorState);
  const contentWithPaste = replaceWithFragment(
    contentState,
    editorState.getSelection(),
    contentToPaste.getBlockMap()
  );

  return contentWithPaste;
};

// checks if text to paste exceeds maxTextLength (if any)
const exceedsMaxTextLimit = ({
  contentFragment,
  editorState,
  maxTextLength,
  getSelectedText,
}: {
  contentFragment: ContentState;
  editorState: EditorState;
  maxTextLength?: number;
  getSelectedText: (editorState: EditorState) => string;
}) => {
  if (!maxTextLength) {
    return false;
  }
  const fragmentTextLength = contentFragment.getPlainText('').length;
  const contentLength = editorState.getCurrentContent().getPlainText('').length;
  const selectedTextLength = getSelectedText(editorState).length;
  return contentLength - selectedTextLength + fragmentTextLength > maxTextLength;
};

export const removeUnsupportedPlugins = (
  rawContent: DraftContent,
  isPluginInstalled: (pluginType: string) => boolean
) => {
  const { blocks, entityMap } = rawContent;
  const newContent: DraftContent = { blocks: [], entityMap: {} };

  blocks.forEach(block => {
    let shouldAddBlock = false;
    const { entityRanges } = block;

    Object.entries(entityRanges).forEach(([, value]) => {
      const entity = entityMap[value.key];
      if (isPluginInstalled(entity.type)) {
        newContent.entityMap[value.key] = entity;
        shouldAddBlock = true;
      }
    });

    if (shouldAddBlock || block.type !== 'atomic') {
      newContent.blocks.push(block);
    }
  });
  return newContent;
};

const handlePastedTextFromEditor = (
  isPluginInstalled: (pluginType: string) => boolean,
  html: string | undefined,
  editorState: EditorState,
  maxTextLength: number | undefined,
  getSelectedText: (editorState: EditorState) => string
) => {
  const rawContent = removeUnsupportedPlugins(getContent(html) as DraftContent, isPluginInstalled);
  const contentFragment = convertFromRaw(rawContent);
  if (exceedsMaxTextLimit({ contentFragment, editorState, maxTextLength, getSelectedText })) {
    // eslint-disable-next-line no-console
    console.debug(`paste canceled due to maxTextLength exceeded (${maxTextLength})`);
    return editorState;
  }
  const fragment = contentFragment.getBlockMap();
  const selection = editorState.getSelection();
  let currentContentState = editorState.getCurrentContent();
  Object.entries(rawContent.entityMap).forEach(([, value]) => {
    const oldContentState = currentContentState;
    const { type, data } = value;
    const entityKey = createEntity(editorState, { type, data });
    currentContentState = Modifier.applyEntity(oldContentState, selection, entityKey);
  });

  const content = replaceWithFragment(currentContentState, selection, fragment);
  return EditorState.push(editorState, content, 'insert-fragment');
};

const handlePastedTextFromOutsideEditor = ({
  text,
  html,
  editorState,
  customHeadings,
  maxTextLength,
  getSelectedText,
}: {
  text: string;
  html?: string;
  editorState: EditorState;
  customHeadings: string[];
  maxTextLength: number | undefined;
  getSelectedText: (editorState: EditorState) => string;
}) => {
  const contentFragment = html
    ? draftConvertFromHtml(pastedContentConfig(customHeadings))(html)
    : ContentState.createFromText(text);

  if (exceedsMaxTextLimit({ contentFragment, editorState, maxTextLength, getSelectedText })) {
    // eslint-disable-next-line no-console
    console.debug(`paste canceled due to maxTextLength exceeded (${maxTextLength})`);
    return editorState;
  }
  const contentWithPaste = applyPasteOnContentState(editorState, contentFragment);
  const newContentState = clearUnnecessaryInlineStyles(contentWithPaste);

  return EditorState.forceSelection(
    EditorState.push(editorState, newContentState, 'pasted-text' as EditorChangeType),
    contentWithPaste.getSelectionAfter()
  );
};

const getContent = (html?: string) => {
  try {
    const doc = new DOMParser().parseFromString(html as string, 'text/html');
    const fragmentElt = doc.querySelector(`[${FRAGMENT_ATTR}]`);
    if (fragmentElt) {
      const fragmentAttr = fragmentElt.getAttribute(FRAGMENT_ATTR);
      const rawContent = JSON.parse(fragmentAttr as string);
      return convertParsedEditorStateObjectToRawData(rawContent);
    }
  } catch (error) {
    return false;
  }
  return false;
};

const getCurrentContent = (editorState): DraftContent => {
  const blocks: RicosContentBlock[] = Object.values(editorState._immutable.currentContent.blockMap);
  const entityMap: RicosEntityMap = editorState._immutable.currentContent.entityMap;
  return {
    blocks,
    entityMap,
  };
};

export const convertParsedEditorStateObjectToRawData = (rawContent: DraftContent) => {
  Object.keys(rawContent.entityMap).forEach(entityKey => {
    const currentEntity = rawContent.entityMap[entityKey];
    if (currentEntity.type === COLLAPSIBLE_LIST_TYPE) {
      const { pairs } = currentEntity.data;
      currentEntity.data.pairs = pairs.map(pair => {
        return {
          key: pair.key,
          title: pair.title._immutable ? getCurrentContent(pair.title) : pair.title,
          content: pair.content._immutable ? getCurrentContent(pair.content) : pair.content,
        };
      });
    }
  });
  return rawContent;
};

const isCopyFromEditor = (html?: string) => html && !!getContent(html);

export default ({
  isPluginInstalled,
  text,
  html,
  editorState,
  pasteWithoutAtomic,
  customHeadings,
  maxTextLength,
  getSelectedText,
}: {
  isPluginInstalled: (pluginType: string) => boolean;
  text: string;
  html?: string;
  editorState: EditorState;
  pasteWithoutAtomic?: boolean;
  customHeadings: string[];
  maxTextLength?: number;
  getSelectedText: (editorState: EditorState) => string;
}) => {
  return isCopyFromEditor(html) && !pasteWithoutAtomic
    ? handlePastedTextFromEditor(
        isPluginInstalled,
        html,
        editorState,
        maxTextLength,
        getSelectedText
      )
    : handlePastedTextFromOutsideEditor({
        text,
        html: normalizeHTML(html),
        editorState,
        customHeadings,
        maxTextLength,
        getSelectedText,
      });
};
