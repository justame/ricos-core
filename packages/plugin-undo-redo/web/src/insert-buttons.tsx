/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOOLBARS, INSERT_PLUGIN_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import type { CreateInsertButtons, TranslationFunction } from 'wix-rich-content-common';
import type { UndoRedoPluginEditorConfig } from './types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  onUndoClick,
  onRedoClick,
  isUndoDisabled,
  isRedoDisabled,
}: {
  t: TranslationFunction;
  settings: UndoRedoPluginEditorConfig;
  onUndoClick?: (e: any & { ref?: any; render?: any }) => void;
  onRedoClick?: (e: any & { ref?: any; render?: any }) => void;
  isUndoDisabled?: () => boolean;
  isRedoDisabled?: () => boolean;
}) => {
  const undoIcon = settings?.toolbar?.icons?.Undo || UndoIcon;
  const redoIcon = settings?.toolbar?.icons?.Redo || RedoIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.UNDO,
      tooltip: t('UndoButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.FOOTER],
      getIcon: () => undoIcon,
      componentData: {},
      onClick: onUndoClick,
      isDisabled: isUndoDisabled,
    },
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.REDO,
      tooltip: t('RedoButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.FOOTER],
      getIcon: () => redoIcon,
      componentData: {},
      onClick: onRedoClick,
      isDisabled: isRedoDisabled,
    },
  ];
};

export default createInsertButtons;
