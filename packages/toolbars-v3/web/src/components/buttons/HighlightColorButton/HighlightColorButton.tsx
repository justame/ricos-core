/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { ClickOutside } from '../../Clickoutside/ClickOutside';
import styles from './HighlightColorButton.scss';
import { withToolbarContext } from 'ricos-context';
import { ColorPicker } from 'wix-rich-content-plugin-commons';
import { getLangDir } from 'wix-rich-content-common';
import { extractPalette, getBlockDocumentStyle } from './utils';
import { colorPicker } from '../TextColorButton/utils';
import { ToolbarButton } from '../ToolbarButton';
import { FocusManager } from 'wix-rich-content-ui-components';
import { onModalKeyDown } from '../modal-buttons-utils';

const onChange = (color, toolbarItem, setModalOpen) => {
  toolbarItem.commands?.setHighlightColor({ color });
  setModalOpen(false);
};

const onResetColor = (toolbarItem, setModalOpen) => {
  toolbarItem.commands?.resetHighlightColor();
  setModalOpen(false);
};

const HighlightColorButton = ({ toolbarItem, context, dataHook }) => {
  const { isMobile, t, theme, locale, getEditorCommands, colorPickerData, portal } = context || {};
  if (!context) return null;
  const [isModalOpen, setModalOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const onClickOutside = e => {
    const modalRef = popperElement;
    if (!modalRef || modalRef.contains(e.target as Node)) {
      return;
    }
    setModalOpen(false);
  };

  const settings = colorPickerData.TEXT_COLOR || {};
  const { colorScheme } = settings;
  const palette = extractPalette(colorScheme);
  const paletteColors = isMobile ? palette.slice(0, 5) : palette.slice(0, 6);

  const userColors = colorPickerData.TEXT_COLOR?.getUserColors?.() || [];

  const onColorAdded = ({ color }) => colorPickerData.TEXT_COLOR?.onColorAdded?.(color);

  const editorCommands = getEditorCommands?.();
  const documentStyles = getBlockDocumentStyle(editorCommands);
  const currentColor =
    toolbarItem.attributes.selectedHighlightColor || documentStyles?.['background-color'];

  const Icon = toolbarItem.presentation?.icon;

  const tooltip = t(toolbarItem.presentation?.tooltip);
  return (
    <ClickOutside onClickOutside={onClickOutside} wrapper="div">
      <div ref={setReferenceElement}>
        <ToolbarButton
          isMobile={isMobile}
          tooltip={tooltip}
          onClick={() => setModalOpen(!isModalOpen)}
          icon={() => (
            <Icon
              className={styles.highlightColorModalButtonIcon}
              style={{ color: currentColor }}
            />
          )}
          dataHook={dataHook}
        />
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            dir={getLangDir(locale)}
            ref={!isMobile ? setPopperElement : () => null}
            style={isMobile ? {} : { ...popperStyles.popper }}
            {...attributes.popper}
            className={isMobile ? '' : styles.popperContainer}
          >
            <FocusManager>
              <div
                data-id="toolbar-modal-button"
                tabIndex={-1}
                className={styles.modal}
                onKeyDown={e => onModalKeyDown(e, () => setModalOpen(false))}
              >
                <ColorPicker
                  color={currentColor}
                  palette={paletteColors}
                  userColors={userColors.slice(-12)}
                  onColorAdded={onColorAdded}
                  theme={theme}
                  isMobile={isMobile}
                  onChange={({ color }) => onChange(color, toolbarItem, setModalOpen)}
                  t={t}
                  onResetColor={() => onResetColor(toolbarItem, setModalOpen)}
                >
                  {colorPicker({ isMobile, header: t('Color_Picker_TextHighlightButton_Header') })}
                </ColorPicker>
              </div>
            </FocusManager>
          </div>,
          portal
        )}
    </ClickOutside>
  );
};

export default withToolbarContext(HighlightColorButton);
