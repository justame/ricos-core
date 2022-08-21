import React from 'react';
import type { EditorState } from 'wix-rich-content-editor-common';
import {
  MODIFIERS,
  hasLinksInSelection,
  removeLinksInSelection,
  EditorModals,
  getModalStyles,
  insertLinkAtCurrentSelection,
  getEntityData,
  insertCustomLink,
  LinkIcon,
  BUTTON_TYPES,
  FORMATTING_BUTTONS,
  isAtomicBlockInSelection,
  COMMANDS,
} from 'wix-rich-content-editor-common';
import createInlineButtons from './inline-buttons';
import TextLinkButton from './TextLinkButton';
import type {
  CreatePluginToolbar,
  TranslationFunction,
  InnerModalType,
  Helpers,
  AnchorTarget,
  RelValue,
  RichContentTheme,
  UISettings,
  AvailableExperiments,
  OnKeyboardShortcutClick,
} from 'wix-rich-content-common';
import type { LinkPluginEditorConfig } from '../types';
import { LINK_TYPE } from '../types';
import type { GetEditorState, SetEditorState } from 'wix-rich-content-common/src';

const openLinkModal = ({
  helpers,
  isMobile,
  anchorTarget,
  relValue,
  t,
  theme,
  getEditorState,
  setEditorState,
  uiSettings,
  closeInlinePluginToolbar,
  settings,
}: {
  helpers: Helpers;
  isMobile: boolean;
  anchorTarget: AnchorTarget;
  relValue: RelValue;
  theme: RichContentTheme;
  setEditorState: SetEditorState;
  getEditorState: GetEditorState;
  uiSettings: UISettings;
  settings: LinkPluginEditorConfig;
  closeInlinePluginToolbar: () => void;
  t: TranslationFunction;
}) => {
  const modalStyles = getModalStyles({
    fullScreen: isMobile,
    isMobile,
    customStyles: isMobile
      ? { content: { position: 'fixed' } }
      : { content: { maxWidth: 'max-content', padding: 20 } },
  });
  if (helpers && helpers.openModal) {
    const modalProps = {
      helpers,
      modalStyles,
      isMobile,
      getEditorState,
      setEditorState,
      t,
      theme,
      anchorTarget,
      relValue,
      modalName: EditorModals.TEXT_LINK_MODAL,
      hidePopup: helpers.closeModal,
      uiSettings,
      insertLinkFn: insertLinkAtCurrentSelection,
      closeInlinePluginToolbar,
      linkTypes: settings?.linkTypes,
    };
    helpers.openModal(modalProps);
  } else {
    //eslint-disable-next-line no-console
    console.error(
      'Link plugin: failed to display Link modal dialog since helpers.openModal is not defined'
    );
  }
};

const createToolbar: CreatePluginToolbar = (config: {
  helpers: Helpers;
  isMobile: boolean;
  anchorTarget: AnchorTarget;
  relValue: RelValue;
  theme: RichContentTheme;
  setEditorState: SetEditorState;
  getEditorState: GetEditorState;
  uiSettings: UISettings;
  settings: LinkPluginEditorConfig;
  closeInlinePluginToolbar: () => void;
  t: TranslationFunction;
  innerModal: InnerModalType;
  onKeyboardShortcutClick: OnKeyboardShortcutClick;
  experiments?: AvailableExperiments;
}) => {
  const isDisabled = () => isAtomicBlockInSelection(config.getEditorState());
  const getTooltip = () =>
    config.t(
      isDisabled() ? 'TextLinkButton_DisableButtonForPlugins_Tooltip' : 'TextLinkButton_Tooltip'
    );
  return {
    TextButtonMapper: () => ({
      [FORMATTING_BUTTONS.LINK]: {
        component: props => (
          <TextLinkButton
            insertLinkFn={insertLinkAtCurrentSelection}
            getEntityData={getEntityData}
            insertCustomLink={insertCustomLink}
            isActive={hasLinksInSelection(config.getEditorState())}
            closeInlinePluginToolbar={config.closeInlinePluginToolbar}
            tooltipText={getTooltip()}
            innerModal={config.innerModal}
            disabled={isDisabled()}
            {...props}
          />
        ),
        keyBindings: [
          {
            keyCommand: {
              command: COMMANDS.LINK,
              modifiers: [MODIFIERS.COMMAND],
              key: 'k',
            },
            commandHandler: (editorState: EditorState) => {
              config.onKeyboardShortcutClick({ buttonName: COMMANDS.LINK, pluginId: LINK_TYPE });
              if (hasLinksInSelection(editorState)) {
                config.closeInlinePluginToolbar();
                return removeLinksInSelection(editorState);
              } else if (!isDisabled()) {
                openLinkModal(config);
              }
            },
          },
        ],
        externalizedButtonProps: {
          onClick: e => {
            e.preventDefault();
            openLinkModal(config);
          },
          isActive: () => hasLinksInSelection(config.getEditorState()),
          isDisabled,
          getIcon: () =>
            config[LINK_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon ||
            (() =>
              LinkIcon({
                newFormattingToolbar: config?.experiments?.newFormattingToolbar?.enabled,
              })),
          tooltip: getTooltip(),
          getLabel: () => '', // new key needed?
          type: BUTTON_TYPES.BUTTON,
        },
      },
    }),
    ...(config[LINK_TYPE]?.toolbar?.inlineToolbar === false
      ? {}
      : { InlinePluginToolbarButtons: createInlineButtons(config) }),
    name: 'link',
  };
};

export default createToolbar;
