import React, { useState, useEffect } from 'react';
import { posToDOMRect } from '@tiptap/core';
import { debounce } from 'lodash';

const EditorSelectionToPosition = ({ children, editor }) => {
  const [position, setPosition] = useState({});

  const handleButtonPosition = debounce(() => {
    const { selection } = editor.state;
    const currentPosition = posToDOMRect(editor.view, selection.from, selection.to);
    setPosition(currentPosition);
  }, 70);

  useEffect(() => {
    editor.on('selectionUpdate', handleButtonPosition);
  }, [editor.selection]);

  return children(position);
};

export default EditorSelectionToPosition;
