import React from 'react';
import addEmoji from '../modifiers/addEmoji';
import { EMOJI_TYPE } from '../types';
import EmojiPreviewModal from './emojiPreviewModal';
import type { FC } from 'react';
import type { RichContentTheme, SetEditorState, GetEditorState } from 'wix-rich-content-common';
import type { TranslationFunction, Helpers } from 'ricos-types';

interface Props {
  theme: RichContentTheme;
  t: TranslationFunction;
  helpers: Helpers;
  setEditorState: SetEditorState;
  getEditorState: GetEditorState;
}

const EmojiInsertModal: FC<Props> = ({ theme, t, helpers, setEditorState, getEditorState }) => {
  return (
    <EmojiPreviewModal
      onAdd={emoji => {
        const newEditorState = addEmoji(getEditorState(), emoji);
        setEditorState(newEditorState);
        helpers.onPluginAddSuccess?.(EMOJI_TYPE, '', {});
        helpers.closeModal?.();
      }}
      theme={theme}
      t={t}
    />
  );
};

export default EmojiInsertModal;
