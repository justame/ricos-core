import React from 'react';
import {
  RichUtils,
  BUTTON_TYPES,
  FORMATTING_BUTTONS,
  isAtomicBlockInSelection,
} from 'wix-rich-content-editor-common';
import TextSpoilerButton from './TextSpoilerButton';
import { SPOILER_TYPE } from '../types';
import { SpoilerButtonIcon } from 'wix-rich-content-plugin-commons';
import type {
  CreatePluginToolbar,
  TranslationFunction,
  GetEditorState,
  SetEditorState,
  AvailableExperiments,
} from 'wix-rich-content-common';

const createToolbar: CreatePluginToolbar = ({
  t,
  getEditorState,
  setEditorState,
  experiments,
}: {
  t: TranslationFunction;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  experiments?: AvailableExperiments;
}) => {
  const isDisabled = () => isAtomicBlockInSelection(getEditorState());

  return {
    //TODO: isMobile: true?
    TextButtonMapper: () => ({
      [FORMATTING_BUTTONS.SPOILER]: {
        component: props => <TextSpoilerButton disabled={isDisabled()} {...props} />,
        externalizedButtonProps: {
          dataHook: 'spoilerButton',
          type: BUTTON_TYPES.BUTTON,
          tooltip: t('Spoiler_Insert_Tooltip'),
          getLabel: () => t('Spoiler_Insert_Tooltip'), // TODO: need another key?
          getIcon: () => () =>
            SpoilerButtonIcon({
              newFormattingToolbar: experiments?.newFormattingToolbar?.enabled,
            }),
          onClick: () =>
            setEditorState(RichUtils.toggleInlineStyle(getEditorState(), SPOILER_TYPE)),
          isActive: () => getEditorState().getCurrentInlineStyle().has(SPOILER_TYPE),
          isDisabled: () => getEditorState().getSelection().isCollapsed(),
        },
      },
    }),
    name: SPOILER_TYPE,
  };
};
export default createToolbar;
