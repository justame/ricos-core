export const getBiButtonName = (name: string) => {
  // eslint-disable-next-line fp/no-loops
  for (const [key, value] of Object.entries(buttonsNameMap)) {
    if (value.includes(name)) return key;
  }
  return undefined
};

const buttonsNameMap = {
  Bold: ['bold'],
  Italic: ['italic'],
  Underline: ['underline'],
  OrderedList: ['ordered-list-item'],
  UnorderedList: ['unordered-list-item'],
  Blockquote: ['blockquote'],
  CODE_BLOCK: ['code-block'],
  LINK: ['link'],
  DECREASE_INDENT: ['decrease-indent'],
  INCREASE_INDENT: ['increase-indent'],
  undo: ['ricosUndo'],
  redo: ['ricosRedo'],
};
