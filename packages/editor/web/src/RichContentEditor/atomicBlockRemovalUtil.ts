import type { ContentState } from 'wix-rich-content-editor-common';
import {
  EditorState,
  SelectionState,
  setNativeSelectionToBlock,
  Modifier,
} from 'wix-rich-content-editor-common';

function getNewBlockMap(content: ContentState, startKey: string, edgeBlockKey: string) {
  let newBlockMap = content.getBlockMap();
  if (startKey !== edgeBlockKey) {
    newBlockMap = newBlockMap.delete(startKey);
  } else {
    const currentBlock = content.getBlockForKey(edgeBlockKey);
    if (currentBlock.getType() === 'blockquote' && currentBlock.getText() === '') {
      const blockSelection = SelectionState.createEmpty(startKey);
      newBlockMap = Modifier.setBlockType(content, blockSelection, 'unstyled').getBlockMap();
    }
  }
  return newBlockMap;
}

function removeBlockAdjacentToAtomic(editorState: EditorState, isAbove: boolean) {
  const content = editorState.getCurrentContent();
  const startKey = editorState.getSelection().getStartKey();
  const adjacentBlock = isAbove
    ? content.getBlockAfter(startKey)
    : content.getBlockBefore(startKey);
  const edgeBlockKey = isAbove ? content.getFirstBlock().getKey() : content.getLastBlock().getKey();

  const blockMap = getNewBlockMap(content, startKey, edgeBlockKey);
  if (adjacentBlock) {
    const newSelection = SelectionState.createEmpty(adjacentBlock.getKey());

    const withoutCurrentBlock = content.merge({
      blockMap,
      selectionAfter: newSelection,
    }) as ContentState;
    if (withoutCurrentBlock !== content) {
      setNativeSelectionToBlock(adjacentBlock);

      return EditorState.forceSelection(
        EditorState.push(editorState, withoutCurrentBlock, 'remove-range'),
        newSelection
      );
    }
  }

  return null;
}

export default removeBlockAdjacentToAtomic;
