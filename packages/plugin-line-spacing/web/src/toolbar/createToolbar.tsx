import React from 'react';
import { pick } from 'lodash';
import LineSpacingButton from './LineSpacingButton';
import { LINE_SPACING_TYPE } from '../types';
import LineSpacingIcon from '../icons/LineSpacingIcon';
import Panel from './LineSpacingPanel';
import {
  getAnchorBlockData,
  mergeBlockData,
  BUTTON_TYPES,
  FORMATTING_BUTTONS,
  decorateComponentWithProps,
  getModalStyles,
  isAtomicBlockFocused,
} from 'wix-rich-content-editor-common';
import type { CreatePluginToolbar, ModalStyles } from 'wix-rich-content-common';

const lineHeight = 'line-height';
const spaceBefore = 'padding-top';
const spaceAfter = 'padding-bottom';

//TODO: refactor code duplication here and in the LineSpacingButton
const createToolbar: CreatePluginToolbar = config => {
  const { getEditorState, setEditorState, helpers, isMobile, theme } = config;

  let oldEditorState;

  let spacing;

  const updateSpacing = spacing => {
    const dynamicStyles = spacing;
    const newEditorState = mergeBlockData(oldEditorState || getEditorState(), { dynamicStyles });
    setEditorState(newEditorState);
  };

  const getBlockSpacing = editorState => {
    const { dynamicStyles = {} } = getAnchorBlockData(editorState);
    return pick(dynamicStyles, [lineHeight, spaceBefore, spaceAfter]);
  };

  const save = spacing => {
    helpers?.closeModal?.();
    if (spacing) {
      updateSpacing(spacing);
    } else {
      setEditorState(oldEditorState);
    }
  };

  const cancel = () => {
    helpers?.closeModal?.();
    setEditorState(oldEditorState);
  };

  const LineSpacingPanel = ({ closeCustomModal, onSelect }) => {
    oldEditorState = getEditorState();
    spacing = getBlockSpacing(oldEditorState);
    return (
      <Panel
        onChange={args => {
          updateSpacing(args);
          onSelect && onSelect(args);
        }}
        onSave={args => {
          save(args);
          onSelect && onSelect(args);
          closeCustomModal && closeCustomModal();
        }}
        onCancel={() => {
          cancel();
          closeCustomModal && closeCustomModal();
        }}
        spacing={spacing}
        {...config}
      />
    );
  };

  const modalStylesFn = (ref: HTMLElement): ModalStyles => {
    const { bottom, left } = ref.getBoundingClientRect();
    return isMobile
      ? {
          content: {
            position: 'absolute',
            left: '0px',
            right: '0px',
            bottom: '0',
            border: 'none',
            background: 'white',
            overflow: 'auto',
            outline: 'none',
            padding: '0px',
            width: '100%',
            zIndex: 6,
            top: 'auto',
            transform: 'translateY(0)',
            margin: 0,
          },
        }
      : {
          content: {
            display: 'inline-table',
            transform: 'translateY(0)',
            minHeight: '116px',
            height: 'auto',
            position: 'absolute',
            minWidth: '216px',
            maxWidth: '360px',
            width: 'auto',
            top: bottom,
            left: left - 15,
            borderRadius: '6px',
            border: '1px solid #ededed',
            margin: '0',
            background: '#fff',
          },
          overlay: {
            background: 'transparent',
          },
        };
  };

  const openLineSpacingModal = ({ ref, render }) => {
    if (render) {
      render(LineSpacingPanel);
    } else {
      const modalStyles = getModalStyles({
        customStyles: modalStylesFn(ref),
        fullScreen: false,
        isMobile,
      });
      helpers?.openModal?.({
        modalStyles,
        helpers,
        isMobile,
        modalElement: LineSpacingPanel,
        theme,
      });
    }
  };

  return {
    TextButtonMapper: () => ({
      [FORMATTING_BUTTONS.LINE_SPACING]: {
        component: decorateComponentWithProps(LineSpacingButton, config[LINE_SPACING_TYPE]),
        externalizedButtonProps: {
          onClick: ({ ref, render }) => openLineSpacingModal({ ref, render }),
          isActive: () => false,
          isDisabled: () => isAtomicBlockFocused(config.getEditorState()),
          getIcon: () =>
            config[LINE_SPACING_TYPE]?.toolbar?.icons?.InsertPluginButtonIcon ||
            (() =>
              LineSpacingIcon({
                newFormattingToolbar: config?.experiments?.newFormattingToolbar?.enabled,
              })),
          tooltip: config.t('LineSpacingButton_Tooltip'),
          getLabel: () => '',
          type: BUTTON_TYPES.DROPDOWN,
          modal: LineSpacingPanel,
          onSelect: updateSpacing,
        },
      },
    }),
    name: 'line-spacing',
  };
};

export default createToolbar;
