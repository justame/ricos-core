/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import type { FC, Ref } from 'react';
import React, { Component } from 'react';
import classNames from 'classnames';
import ClickOutside from 'react-click-outsider';
import styles from '../ToolbarNew.scss';
import ToolbarInputButton from '../ToolbarInputButton';
import ToolbarButton from '../ToolbarButton';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { elementOverflowWithEditor, KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import { FocusManager } from 'wix-rich-content-ui-components';
import { GlobalContext } from 'wix-rich-content-common';

type dropDownPropsType = {
  isMobile?: boolean;
  tabIndex?: number;
  buttons: any;
  tooltip: string;
  dataHook: string;
  isActive: () => boolean;
  isDisabled: () => boolean;
  getLabel?: () => string;
  arrow?: boolean;
  isMobileModalFullscreen?: boolean;
  getIcon: () => any;
  saveState?: () => void;
  saveSelection?: () => void;
  onCancel?: () => void;
  onChange?: (any) => void;
  onDelete?: () => void;
  loadSelection?: () => void;
  isInput: boolean;
  useIconOnMobile?: boolean;
  closeOnChange?: boolean;
};

interface ModalButtonProps {
  onToolbarButtonClick?: any;
  theme?: RichContentTheme;
  setKeepOpen?: (boolean) => void;
  t: TranslationFunction;
  modal: (() => JSX.Element) | FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onSelect: (string) => void;
  onSave?: (any) => void;
  onDone?: (any) => void;
  isMobile?: boolean;
  dropDownProps: dropDownPropsType;
  getEditorContainer: () => Element;
}

interface State {
  isModalOpen: boolean;
  isModalOverflowByHeight: boolean;
  overflowWidthBy: boolean | number;
  lastFocusedButton: HTMLElement | null;
}

class ModalButton extends Component<ModalButtonProps, State> {
  modalRef?: HTMLDivElement | null;

  buttonRef: React.RefObject<any> = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isModalOverflowByHeight: false,
      overflowWidthBy: false,
      lastFocusedButton: null,
    };
  }

  static contextType = GlobalContext;

  setModalRef = ref => (this.modalRef = ref);

  toggleModal = e => {
    const { isModalOpen } = this.state;
    if (!isModalOpen) {
      this.buttonRef?.current.focus();
      setTimeout(() => this.openModal());
    } else {
      this.closeModal();
    }
  };

  handleOverflow = () => {
    const { isMobile, getEditorContainer } = this.props;
    const { experiments } = this.context;
    const modalOverflowByBoundingClientRect =
      !!experiments?.modalOverflowByBoundingClientRect?.enabled;
    if (this.modalRef) {
      const modalOverflowWithEditor = elementOverflowWithEditor(
        this.modalRef,
        getEditorContainer() as HTMLElement,
        modalOverflowByBoundingClientRect
      );
      const isModalWidthOverflow = !!modalOverflowWithEditor.overflowRight;
      const isModalOverflowByHeight = !!modalOverflowWithEditor.overflowBottom;
      const overflowWidthBy = isModalWidthOverflow ? modalOverflowWithEditor.overflowRight : false;
      this.setState({
        isModalOverflowByHeight,
        overflowWidthBy,
      });
      isMobile && this.modalRef?.focus();
    } else {
      this.setState({ isModalOverflowByHeight: false, overflowWidthBy: false });
    }
  };

  openModal = () => {
    if (!this.state.isModalOpen) {
      const {
        dropDownProps: { saveState, saveSelection },
        setKeepOpen,
      } = this.props;
      const lastFocusedButton = document.activeElement as HTMLElement;
      this.setState({ isModalOpen: true, lastFocusedButton }, this.handleOverflow);
      saveSelection?.();
      saveState?.();
      setKeepOpen?.(true);
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
      this.setState({ isModalOpen: false, isModalOverflowByHeight: false, overflowWidthBy: false });
    }
  };

  onSave = ({ clickFromKeyboard = false, data }) => {
    this.props.onSave?.(data);
    const {
      dropDownProps: { isMobile },
    } = this.props;
    !isMobile && this.closeModal({ clickFromKeyboard });
  };

  onDone = ({ clickFromKeyboard = false, data }) => {
    this.props.onDone?.(data);
    this.closeModal({ clickFromKeyboard });
  };

  onDelete = ({ clickFromKeyboard = false }) => {
    const {
      dropDownProps: { onDelete },
    } = this.props;
    onDelete?.();
    this.closeModal({ clickFromKeyboard });
  };

  onCancel = ({ clickFromKeyboard = false }) => {
    const {
      dropDownProps: { onCancel },
    } = this.props;
    onCancel?.();
    this.closeModal({ clickFromKeyboard });
  };

  onChange = (...args: [any]) => {
    const {
      dropDownProps: { onChange, closeOnChange },
    } = this.props;
    onChange?.(...args);
    closeOnChange && this.closeModal();
  };

  onClickOutside = e => {
    const clickFromInsideTheToolbar = !!e.target.closest('[data-hook=ricos-editor-toolbars]');
    return !clickFromInsideTheToolbar
      ? this.closeModal({
          loadSelectionOnClose: e.target.closest('[data-hook=ricos-editor-toolbars]'),
        })
      : this.closeModal();
  };

  render() {
    const { modal, dropDownProps, onSelect, theme, t, onToolbarButtonClick } = this.props;
    const {
      isActive,
      tooltip,
      dataHook,
      getIcon,
      isDisabled,
      tabIndex,
      isMobile,
      arrow = false,
      getLabel,
      isInput,
      isMobileModalFullscreen = false,
      useIconOnMobile,
    } = dropDownProps;
    const { isModalOpen, isModalOverflowByHeight, overflowWidthBy } = this.state;
    const shouldRenderText = arrow && getLabel && !(isMobile && useIconOnMobile);
    const buttonProps = shouldRenderText ? { buttonContent: getLabel?.() } : { icon: getIcon() };
    const onModalWrapperClick =
      isMobile && !isMobileModalFullscreen ? () => this.closeModal() : undefined;
    const toolbarButtonProps = {
      ...buttonProps,
      onToolbarButtonClick,
      isActive: isModalOpen || isActive(),
      onClick: this.toggleModal,
      tooltipText: tooltip,
      dataHook,
      tabIndex,
      isMobile,
      disabled: isDisabled(),
      ref: this.buttonRef as Ref<any>,
    };
    const Button = isInput ? (
      <ToolbarInputButton onChange={this.onChange} {...toolbarButtonProps} />
    ) : (
      <ToolbarButton {...toolbarButtonProps} showArrowIcon={arrow} icon={getIcon()} />
    );

    const defaultStyles = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
    } as React.CSSProperties;
    const mobileStyles = isMobileModalFullscreen
      ? { ...defaultStyles, height: '100%' }
      : { ...defaultStyles, background: 'transparent' };

    const onKeyDown = e => {
      if (e.keyCode === KEYS_CHARCODE.ESCAPE) {
        this.closeModal({ clickFromKeyboard: true });
        e.stopPropagation();
      }
    };

    let modalButton = (
      <div className={styles.buttonWrapper}>
        {Button}
        {isModalOpen && (
          <div
            data-id="toolbar-modal-button"
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={-1}
            ref={this.setModalRef}
            className={classNames(
              styles.modal,
              styles.withoutPadding,
              isModalOverflowByHeight && styles.modalOverflow
            )}
            style={
              isMobile ? mobileStyles : overflowWidthBy ? { left: `-${overflowWidthBy}px` } : {}
            }
            onClick={onModalWrapperClick}
            onKeyDown={onKeyDown}
          >
            {modal({
              closeCustomModal: this.closeModal,
              onSelect,
              t,
              onSave: this.onSave,
              theme,
              isMobile,
              onCancel: this.onCancel,
              onChange: this.onChange,
              onDone: this.onDone,
              isActive: isActive(),
              onDelete: this.onDelete,
              onToolbarButtonClick: this.props.onToolbarButtonClick,
            })}
          </div>
        )}
      </div>
    );

    modalButton = isInput && isModalOpen ? <FocusManager>{modalButton}</FocusManager> : modalButton;

    return <ClickOutside onClickOutside={this.onClickOutside}>{modalButton}</ClickOutside>;
  }
}

export default ModalButton;
