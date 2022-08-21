import {
  TIPTAP_COLLAPSIBLE_LIST_TYPE,
  TIPTAP_COLLAPSIBLE_ITEM_TYPE,
  TIPTAP_COLLAPSIBLE_ITEM_TITLE_TYPE,
  TIPTAP_COLLAPSIBLE_ITEM_BODY_TYPE,
} from 'ricos-content';
import { findParentNodeClosestToPos } from './utils';

const jumpToCollapsibleBody = ({ editor }) => {
  const titleNode = getCollapsibleItemTitle(editor);
  if (!titleNode) {
    return false;
  }
  editor
    .chain()
    .setTextSelection(titleNode.start + titleNode.node.nodeSize)
    .focus()
    .run();
  return true;
};

const jumpToCollapsibleTitle = (editor, collapsibleItemBody) => {
  if (!collapsibleItemBody) return false;
  editor
    .chain()
    .setTextSelection(collapsibleItemBody.pos - 2)
    .focus()
    .run();
  return true;
};

const deleteListItem = editor => {
  const itemNode = getCollapsibleItem(editor);
  editor
    .chain()
    .deleteRange({
      from: itemNode?.pos,
      to: itemNode?.pos + itemNode?.node.nodeSize,
    })
    .setTextSelection(itemNode?.pos - 2)
    .run();
};

const getCollapsibleItemBody = editor =>
  findParentNodeClosestToPos(
    editor.state.selection.$from,
    node => node.type.name === TIPTAP_COLLAPSIBLE_ITEM_BODY_TYPE
  );

const getCollapsibleItemTitle = editor =>
  findParentNodeClosestToPos(
    editor.state.selection.$from,
    node => node.type.name === TIPTAP_COLLAPSIBLE_ITEM_TITLE_TYPE
  );

const getCollapsibleItem = editor =>
  findParentNodeClosestToPos(
    editor.state.selection.$from,
    node => node.type.name === TIPTAP_COLLAPSIBLE_ITEM_TYPE
  );

const getCollapsibleList = editor =>
  findParentNodeClosestToPos(
    editor.state.selection.$from,
    node => node.type.name === TIPTAP_COLLAPSIBLE_LIST_TYPE
  );

export const keyboardShortcuts = {
  Enter: jumpToCollapsibleBody,
  Tab: jumpToCollapsibleBody,
  Backspace: ({ editor }) => {
    const {
      state: { selection },
    } = editor;
    if (!selection.empty) return false;
    const collapsibleItemBody = getCollapsibleItemBody(editor);
    //jump to collapsible-title if backspace pressed at the start of collapsible-body
    const isAtBodyStart = selection.from - 1 === collapsibleItemBody?.start;
    if (isAtBodyStart) {
      jumpToCollapsibleTitle(editor, collapsibleItemBody);
    } else {
      const titleNode = getCollapsibleItemTitle(editor);
      const isAtTitleStart = selection.from - 1 === titleNode?.start;
      if (isAtTitleStart) {
        const collapsibleNode = getCollapsibleList(editor);
        const isFirstListItem = collapsibleNode?.node.firstChild === getCollapsibleItem(editor);
        // collapsibleNode?.node.firstChild.firstChild.attrs.id === titleNode.node.attrs.id;
        if (isFirstListItem) return true;

        //backspace pressed at collapsible-title start with list-item above, remove current list-item and jump to above list-item
        deleteListItem(editor);
      }
    }
    return false;
  },
  'Shift-Tab': ({ editor }) => jumpToCollapsibleTitle(editor, getCollapsibleItemBody(editor)),
};
