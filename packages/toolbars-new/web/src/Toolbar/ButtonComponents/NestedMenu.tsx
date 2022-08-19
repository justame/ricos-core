/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import classNames from 'classnames';
import ClickOutside from 'react-click-outsider';
import styles from '../ToolbarNew.scss';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';

type dropDownPropsType = {
  t: TranslationFunction;
  isMobile?: boolean;
  tooltip: string;
  dataHook: string;
  getIcon: () => any;
  buttonList: any[];
};

interface NestedMenuProps {
  theme?: RichContentTheme;
  dropDownProps: dropDownPropsType;
  getEditorContainer: () => Element;
}

interface State {
  isModalOpen: boolean;
  lastFocusedButton: HTMLElement | null;
  staticToolbarContainer: boolean;
}

class NestedMenu extends Component<NestedMenuProps, State> {
  nestedMenuRef?: HTMLDivElement | null;

  nestedMenuButtonRef?: HTMLDivElement | null;

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      lastFocusedButton: null,
      staticToolbarContainer: false,
    };
  }

  componentDidMount() {
    this.setState({
      staticToolbarContainer: !!this.nestedMenuButtonRef?.closest?.('[data-hook=static-toolbar]'),
    });
  }

  toggleModal = e => {
    const { isModalOpen } = this.state;
    if (isModalOpen) {
      this.closeModal({ clickFromKeyboard: !e.detail });
    } else {
      this.openModal(e);
    }
  };

  openModal = e => {
    const lastFocusedButton = document.activeElement as HTMLElement;
    // !e.detail && setTimeout(() => this.state.lastFocusedButton?.focus());
    const clickFromMouse = e.detail;
    this.setState({ isModalOpen: true, lastFocusedButton }, () => {
      if (!clickFromMouse) {
        const firstButton = this.nestedMenuRef?.querySelector?.('button');
        firstButton?.focus();
      }
    });
  };

  closeModal = ({ clickFromKeyboard = false }) => {
    this.setState({ isModalOpen: false });
    clickFromKeyboard && setTimeout(() => this.state.lastFocusedButton?.focus());
  };

  onClickOutside = () => {
    this.closeModal({});
  };

  setNestedMenuRef = ref => (this.nestedMenuRef = ref);

  setNestedMenuButtonRef = ref => (this.nestedMenuButtonRef = ref);

  onKeyDown = e => {
    if (e.keyCode === KEYS_CHARCODE.ESCAPE) {
      this.closeModal({ clickFromKeyboard: true });
      e.stopPropagation();
    }
  };

  render() {
    const { dropDownProps, theme, getEditorContainer } = this.props;
    const { tooltip, dataHook, getIcon, isMobile, t, buttonList } = dropDownProps;
    const { isModalOpen, staticToolbarContainer } = this.state;
    return (
      <ClickOutside onClickOutside={this.onClickOutside}>
        <div ref={this.setNestedMenuButtonRef} className={styles.buttonWrapper}>
          <ToolbarButton
            isActive={isModalOpen}
            onClick={e => this.toggleModal(e)}
            tooltipText={tooltip}
            dataHook={dataHook || 'toolbar-nestedMenu'}
            isMobile={isMobile}
            icon={getIcon()}
            theme={theme}
            // showArrowIcon
          />
          {isModalOpen && (
            <div
              ref={this.setNestedMenuRef}
              className={classNames(
                styles.modal,
                styles.nestedMenu,
                staticToolbarContainer && styles.nestedMenuInStaticToolbar
              )}
              onKeyDown={this.onKeyDown}
            >
              <Toolbar
                theme={theme}
                isMobile={isMobile}
                t={t}
                buttons={buttonList}
                nestedMenu
                // vertical
                // afterClick={this.toggleModal}
                getEditorContainer={getEditorContainer}
              />
            </div>
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default NestedMenu;
