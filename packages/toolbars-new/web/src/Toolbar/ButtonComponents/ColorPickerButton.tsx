/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../ToolbarNew.scss';
import ToolbarButton from '../ToolbarButton';
import { ColorPicker } from 'wix-rich-content-plugin-commons';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { KEYS_CHARCODE, ClickOutside } from 'wix-rich-content-editor-common';

type dropDownPropsType = {
  tooltip: string;
  isActive: () => boolean;
  getIcon: () => any;
  name: string;
  isDisabled: () => boolean;
  loadSelection?: () => void;
  saveSelection?: () => void;
  colorPickerHeaderKey: string;
  withColoredIcon?: boolean;
};

interface ColorPickerButtonProps {
  onToolbarButtonClick?: () => void;
  theme?: RichContentTheme;
  t: TranslationFunction;
  dropDownProps: dropDownPropsType;
  isMobile?: boolean;
  getCurrentColor: () => string;
  onColorAdded: (string) => void;
  onChange: (string) => void;
  settings: any;
  defaultPalette: string[];
  getUserColors: () => string[];
  onResetColor: () => void;
  nestedMenu?: boolean;
  afterClick?: () => void;
  getDefaultColors: () => string;
  setKeepOpen?: (boolean) => void;
}

interface State {
  isModalOpen: boolean;
  currentColor: string;
  userColors: string[];
  lastFocusedButton: HTMLElement | null;
}

class ColorPickerButton extends Component<ColorPickerButtonProps, State> {
  modalRef?: HTMLDivElement | null;

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      currentColor: props.getCurrentColor() || 'unset',
      userColors: props?.getUserColors?.() || [],
      lastFocusedButton: null,
    };
  }

  setModalRef = ref => (this.modalRef = ref);

  componentWillReceiveProps = nextProps => {
    const currentColor = this.state.currentColor;
    const nextCurrentColor = nextProps.getCurrentColor() || 'unset';
    if (nextCurrentColor !== currentColor) {
      this.setState({ currentColor: nextCurrentColor });
    }
  };

  toggleModal = e => {
    const { isModalOpen } = this.state;
    const {
      dropDownProps: { saveSelection },
      setKeepOpen,
      isMobile,
    } = this.props;
    this.setState({ isModalOpen: !isModalOpen }, () => {
      if (this.state.isModalOpen && this.modalRef) {
        isMobile && this.modalRef.focus();
      }
    });

    if (!isModalOpen) {
      saveSelection?.();
      setKeepOpen?.(true);
      const lastFocusedButton = document.activeElement as HTMLElement;
      this.setState({ lastFocusedButton });
    } else {
      const {
        dropDownProps: { loadSelection },
      } = this.props;
      setKeepOpen?.(false);
      e.detail && loadSelection?.(); //do not load selection on shortcuts
      !e.detail && setTimeout(() => this.state.lastFocusedButton?.focus());
    }
  };

  closeModal = ({ loadSelectionOnClose = true, clickFromKeyboard = false } = {}) => {
    if (this.state.isModalOpen) {
      const {
        setKeepOpen,
        dropDownProps: { loadSelection },
      } = this.props;
      setKeepOpen?.(false);
      loadSelectionOnClose && loadSelection?.();
      clickFromKeyboard && setTimeout(() => this.state.lastFocusedButton?.focus());
      this.setState({ isModalOpen: false });
    }
  };

  onColorAdded = ({ color }) => {
    this.props.onColorAdded(color);
    const userColors = this.props?.getUserColors?.() || [...this.state.userColors, color];
    this.setState({ userColors });
  };

  onChange = ({ color, event }) => {
    this.props.onChange(color);
    this.setState({ currentColor: color });
    this.closeModal({ clickFromKeyboard: !event?.detail });
    this.props.afterClick && this.props.afterClick();
  };

  onResetColor = ({ event }) => {
    const { getDefaultColors, onResetColor } = this.props;
    if (onResetColor) {
      onResetColor();
    } else {
      const defaultColors = getDefaultColors?.();
      this.onChange({ color: defaultColors, event: null });
    }
    this.closeModal({ clickFromKeyboard: !event?.detail });
    this.props.afterClick && this.props.afterClick();
  };

  extractPalette = colorScheme => {
    if (!colorScheme) {
      return this.props.defaultPalette;
    }
    return Object.values(colorScheme)
      .sort((entry1: any, entry2: any) => (entry1.index > entry2.index ? 1 : -1))
      .map((entry: any) => entry.color);
  };

  onClickOutside = e => {
    this.closeModal({
      loadSelectionOnClose: e.target.closest('[data-hook=ricos-editor-toolbars]'),
    });
  };

  render() {
    const { settings, t, isMobile, dropDownProps, theme, nestedMenu } = this.props;
    const { isActive, getIcon, tooltip, colorPickerHeaderKey, withColoredIcon, name, isDisabled } =
      dropDownProps;
    const { currentColor, userColors } = this.state;
    const { isModalOpen } = this.state;
    const { colorScheme } = settings;
    const palette = this.extractPalette(colorScheme);
    const paletteColors = isMobile ? palette.slice(0, 5) : palette.slice(0, 6);
    let icon;
    if (withColoredIcon) {
      const Icon = getIcon();
      let color;
      if (currentColor[0] === '#') {
        color = currentColor;
      } else if (currentColor === 'unset') {
        color = name === 'TEXT_HIGHLIGHT' ? '#fff' : currentColor;
      } else {
        color = colorScheme[currentColor].color;
      }
      icon = <Icon style={{ color }} />;
    } else {
      const Icon = getIcon();
      icon = <Icon />;
    }
    const onKeyDown = e => {
      if (e.keyCode === KEYS_CHARCODE.ESCAPE) {
        this.closeModal({ clickFromKeyboard: true });
        e.stopPropagation();
      }
    };
    return (
      <ClickOutside onClickOutside={this.onClickOutside}>
        <ToolbarButton
          {...dropDownProps}
          disabled={isDisabled()}
          isActive={withColoredIcon ? false : isActive()}
          onClick={this.toggleModal}
          tooltipText={tooltip}
          isMobile={isMobile}
          icon={() => icon}
          theme={theme}
          onToolbarButtonClick={this.props.onToolbarButtonClick}
        />
        {isModalOpen && (
          <div
            className={classNames(
              styles.modal,
              nestedMenu && styles.withoutTop,
              isMobile && styles.colorPickerMobile
            )}
            data-hook="color-picker-modal"
            ref={this.setModalRef}
            tabIndex={-1}
            onKeyDown={onKeyDown}
          >
            <ColorPicker
              color={currentColor}
              palette={paletteColors}
              userColors={userColors.slice(-12)}
              onColorAdded={this.onColorAdded}
              theme={theme}
              isMobile={isMobile}
              onChange={this.onChange}
              t={t}
              onResetColor={this.onResetColor}
            >
              {({
                renderPalette,
                renderUserColors,
                renderAddColorButton,
                renderResetColorButton,
                mergedStyles,
              }) => (
                <>
                  {isMobile && (
                    <>
                      <div className={mergedStyles.colorPicker_header}>
                        {t(colorPickerHeaderKey)}
                      </div>
                      <div className={mergedStyles.colorPicker_separator} />
                    </>
                  )}
                  <div className={mergedStyles.colorPicker_palette}>
                    <div className={mergedStyles.colorPicker_buttons_container}>
                      {renderPalette()}
                      {renderUserColors()}
                      {isMobile && renderAddColorButton()}
                    </div>
                    {!isMobile && (
                      <>
                        <hr className={mergedStyles.colorPicker_separator} />
                        <div className={mergedStyles.colorPicker_bottom_container}>
                          {renderResetColorButton()}
                          {renderAddColorButton()}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </ColorPicker>
          </div>
        )}
      </ClickOutside>
    );
  }
}

export default ColorPickerButton;
