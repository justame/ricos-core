/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BUTTON_TYPES, FORMATTING_BUTTONS, undo, redo } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import createInsertButtons from './insert-buttons';
import type {
  CreatePluginToolbar,
  TranslationFunction,
  GetEditorState,
  SetEditorState,
  Helpers,
} from 'wix-rich-content-common';
import type { UndoRedoPluginEditorConfig } from './types';
import { UNDO_REDO_TYPE } from './types';

const createToolbar: CreatePluginToolbar = ({
  t,
  getEditorState,
  setEditorState,
  settings,
  helpers,
}: {
  t: TranslationFunction;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  settings: UndoRedoPluginEditorConfig;
  helpers: Helpers;
}) => {
  const onUndoClick = (e: any & { ref?: any; render?: any }) => {
    e.preventDefault();
    setEditorState(undo(getEditorState()));
    helpers?.onPluginAddSuccess?.(UNDO_REDO_TYPE, 'UNDO', {});
  };

  const onRedoClick = (e: any & { ref?: any; render?: any }) => {
    e.preventDefault();
    setEditorState(redo(getEditorState()));
    helpers?.onPluginAddSuccess?.(UNDO_REDO_TYPE, 'REDO', {});
  };

  const isUndoDisabled = () => !!getEditorState()?.getUndoStack().isEmpty();

  const isRedoDisabled = () => !!getEditorState()?.getRedoStack().isEmpty();

  return {
    TextButtonMapper: () => ({
      [FORMATTING_BUTTONS.UNDO]: {
        component: props => (
          <UndoButton t={t} onClick={onUndoClick} isDisabled={isUndoDisabled} {...props} />
        ),
        externalizedButtonProps: {
          type: BUTTON_TYPES.BUTTON,
          getLabel: () => '',
          isActive: () => false,
          isDisabled: isUndoDisabled,
          tooltip: t('UndoButton_Tooltip'),
          getIcon: () => settings?.toolbars?.icons?.Undo || UndoIcon,
          onClick: onUndoClick,
        },
      },
      [FORMATTING_BUTTONS.REDO]: {
        component: props => (
          <RedoButton t={t} onClick={onRedoClick} isDisabled={isRedoDisabled} {...props} />
        ),
        externalizedButtonProps: {
          getLabel: () => '',
          type: BUTTON_TYPES.BUTTON,
          isActive: () => false,
          isDisabled: isRedoDisabled,
          tooltip: t('RedoButton_Tooltip'),
          getIcon: () => settings?.toolbars?.icons?.Redo || RedoIcon,
          onClick: onRedoClick,
        },
      },
    }),
    InsertButtons: createInsertButtons({
      t,
      settings,
      onUndoClick,
      onRedoClick,
      isUndoDisabled,
      isRedoDisabled,
    }),
    name: 'undo-redo',
  };
};

export default createToolbar;
