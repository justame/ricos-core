import React from 'react';
import type { ToolbarButton } from 'ricos-types';
import { PLUGIN_TOOLBAR_BUTTON_ID } from 'wix-rich-content-editor-common';
import { TABLE_BUTTONS, TABLE_BUTTONS_DATA_HOOKS, TABLE_BUTTONS_MODALS_ID } from './consts';
import {
  FormattingButton,
  BackgroundColorButton,
  BorderButton,
  ContextButton,
  HeaderButton,
  VerticalAlignmentButton,
} from './toolbar/buttons';
import { BorderPanel, ContextPanel, VerticalAlignmentPanel } from './toolbar/modals';
import { isColumnSelected, isRowSelected } from 'prosemirror-utils';
import { TIPTAP_TABLE_CELL_TYPE } from 'wix-rich-content-common';

export const getToolbarButtons = (config, services): ToolbarButton[] => {
  return [
    {
      id: TABLE_BUTTONS.FORMATTING,
      dataHook: TABLE_BUTTONS_DATA_HOOKS.FORMATTING,
      renderer: toolbarItem => <FormattingButton toolbarItem={toolbarItem} />,
    },
    {
      id: PLUGIN_TOOLBAR_BUTTON_ID.SEPARATOR,
    },
    {
      id: TABLE_BUTTONS.VERTICAL_ALIGNMENT,
      dataHook: TABLE_BUTTONS_DATA_HOOKS.VERTICAL_ALIGNMENT,
      attributes: {
        cellAlignment: getCellAlignmentResolver,
      },
      modal: {
        id: TABLE_BUTTONS_MODALS_ID.VERTICAL_ALIGNMENT,
        Component: VerticalAlignmentPanel,
      },
      command: ({ verticalAlignment, editorCommands }) => {
        editorCommands.chain().focus().setCellAttribute('cellStyle', { verticalAlignment }).run();
      },
      renderer: toolbarItem => <VerticalAlignmentButton toolbarItem={toolbarItem} />,
    },
    {
      id: PLUGIN_TOOLBAR_BUTTON_ID.SEPARATOR,
    },
    {
      id: TABLE_BUTTONS.BACKGROUND_COLOR,
      dataHook: TABLE_BUTTONS_DATA_HOOKS.BACKGROUND_COLOR,
      command: ({ backgroundColor, editorCommands }) => {
        editorCommands.chain().focus().setCellAttribute('cellStyle', { backgroundColor }).run();
      },
      renderer: toolbarItem => <BackgroundColorButton toolbarItem={toolbarItem} />,
    },
    {
      id: PLUGIN_TOOLBAR_BUTTON_ID.SEPARATOR,
    },
    {
      id: TABLE_BUTTONS.BORDER,
      dataHook: TABLE_BUTTONS_DATA_HOOKS.BORDER,
      command: ({ borders, outsideBorders, editorCommands }) => {
        borders
          ? editorCommands.chain().focus().setCellBorderColor(borders).run()
          : editorCommands.chain().focus().setOutsiderCellsBorderColor(outsideBorders).run();
      },
      modal: {
        id: TABLE_BUTTONS_MODALS_ID.BORDER,
        Component: BorderPanel,
      },
      renderer: toolbarItem => <BorderButton toolbarItem={toolbarItem} />,
    },
    {
      id: PLUGIN_TOOLBAR_BUTTON_ID.SEPARATOR,
    },
    {
      id: TABLE_BUTTONS.ROW_HEADER,
      dataHook: TABLE_BUTTONS_DATA_HOOKS.ROW_HEADER,
      attributes: {
        visible: isFirstRowSelectedResolver,
      },
      command: ({ editorCommands }) => {
        editorCommands.chain().focus().toggleHeaderRow().run();
      },
      renderer: toolbarItem => <HeaderButton type={'row'} toolbarItem={toolbarItem} />,
    },
    {
      id: TABLE_BUTTONS.COLUMN_HEADER,
      dataHook: TABLE_BUTTONS_DATA_HOOKS.COLUMN_HEADER,
      attributes: {
        visible: isFirstColumnSelectedResolver,
      },
      command: ({ editorCommands }) => {
        editorCommands.chain().focus().toggleHeaderColumn().run();
      },
      renderer: toolbarItem => <HeaderButton type={'column'} toolbarItem={toolbarItem} />,
    },
    {
      id: PLUGIN_TOOLBAR_BUTTON_ID.SEPARATOR,
      attributes: {
        visible: isFirstColumnOrRowSelectedResolver,
      },
    },
    {
      id: PLUGIN_TOOLBAR_BUTTON_ID.DELETE,
    },
    {
      id: PLUGIN_TOOLBAR_BUTTON_ID.SEPARATOR,
    },
    {
      id: TABLE_BUTTONS.CONTEXT,
      dataHook: TABLE_BUTTONS_DATA_HOOKS.CONTEXT,
      command: ({ commandKey, editorCommands }) => {
        editorCommands.chain().focus()[commandKey]().run();
      },
      modal: {
        id: TABLE_BUTTONS_MODALS_ID.CONTEXT,
        Component: ContextPanel,
      },
      renderer: toolbarItem => <ContextButton toolbarItem={toolbarItem} />,
    },
  ];
};

const isFirstColumnSelectedResolver = {
  id: 'isFirstColumnSelectedResolver',
  resolve: (_, __, editor) => {
    if (isColumnSelected(0)(editor.state.selection)) {
      return true;
    } else {
      return false;
    }
  },
};

const isFirstRowSelectedResolver = {
  id: 'isFirstRowSelectedResolver',
  resolve: (_, __, editor) => {
    if (isRowSelected(0)(editor.state.selection)) {
      return true;
    } else {
      return false;
    }
  },
};

const isFirstColumnOrRowSelectedResolver = {
  id: 'isFirstColumnSelectedResolver',
  resolve: (_, __, editor) => {
    if (isRowSelected(0)(editor.state.selection) || isColumnSelected(0)(editor.state.selection)) {
      return true;
    } else {
      return false;
    }
  },
};

const getCellAlignmentResolver = {
  id: 'isFirstColumnSelectedResolver',
  resolve: content => {
    if (Array.isArray(content) && content.length > 0) {
      return content.find(node => node.type.name === TIPTAP_TABLE_CELL_TYPE)?.attrs?.cellStyle
        ?.verticalAlignment;
    } else {
      return false;
    }
  },
};
