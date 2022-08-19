import type { EditorCommands } from 'wix-rich-content-common';
import type { RichContentEditor } from 'wix-rich-content-editor';

export const isLinkToolbarOpen = (activeEditor: RichContentEditor | null) => {
  const editorCommands: EditorCommands | undefined = activeEditor?.getEditorCommands();
  return editorCommands?.getSelection().isCollapsed && editorCommands?.hasLinkInSelection();
};

const getPluginsKey = (activeEditor: RichContentEditor | null) => {
  const rawPlugins = activeEditor?.getPlugins?.() || [];
  return rawPlugins.map(plugin => plugin.blockType || plugin.type).filter(x => x);
};

export const filterButtons = (buttonsList, activeEditor) => {
  const buttonsFilteredFromUninstalledPlugins = filterButtonsByImportedPlugins(
    buttonsList,
    activeEditor
  );
  const filteredButtonsList = filterButtonsByProduct(buttonsFilteredFromUninstalledPlugins);
  return filteredButtonsList;
};

const filterButtonsByProduct = buttonsList => {
  if (
    buttonsList.some(button => button === 'HEADINGS') &&
    buttonsList.some(button => button === 'Title')
  ) {
    return buttonsList.filter(button => button !== 'Title');
  } else {
    return buttonsList;
  }
};

const filterButtonsByImportedPlugins = (buttonsList, activeEditor) => {
  const importedPlugins = getPluginsKey(activeEditor);
  return buttonsList.filter(button => {
    if (buttonByPluginMapper[button]) {
      return importedPlugins.includes(buttonByPluginMapper[button]);
    } else {
      return true;
    }
  });
};

const buttonByPluginMapper = {
  HEADINGS: 'wix-rich-content-plugin-headings',
  TEXT_COLOR: 'wix-rich-content-text-color',
  TEXT_HIGHLIGHT: 'wix-rich-content-text-highlight',
  DECREASE_INDENT: 'wix-rich-content-plugin-indent',
  INCREASE_INDENT: 'wix-rich-content-plugin-indent',
  SPOILER: 'wix-rich-content-plugin-spoiler',
  LINE_SPACING: 'line-spacing',
  LINK: 'LINK',
  CODE_BLOCK: 'code-block',
};

export const addConfigButtons = (buttonsList, configButtonsMap) => {
  return buttonsList.map(button =>
    configButtonsMap[button]
      ? { name: button, type: 'component', Component: configButtonsMap[button].component }
      : button
  );
};
