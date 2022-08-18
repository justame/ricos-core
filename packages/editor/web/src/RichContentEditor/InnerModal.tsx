import type { CSSProperties, RefCallback } from 'react';
import React, { Component } from 'react';
import RichContentEditorModal from './RichContentEditorModal';
import ClickOutside from 'react-click-outsider';
import type { ModalStyles, RichContentTheme } from 'wix-rich-content-common';
import { getLangDir } from 'wix-rich-content-common';

class InnerModal extends Component<{
  theme: RichContentTheme;
  locale: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerModal: { modalProps: Record<string, any>; modalStyles?: ModalStyles } | null;
  closeInnerModal: () => void;
  editorWrapper: Element;
}> {
  innerModalRef;

  setInnerModalRef: RefCallback<HTMLDivElement> = ref => (this.innerModalRef = ref);

  getVerticalPosition = (top: string) => {
    const { editorWrapper } = this.props;
    const editorRect = editorWrapper.getBoundingClientRect();
    const modalHeight = this.innerModalRef.clientHeight;
    const editorHeight = editorRect.height;
    const topAsNumber = parseInt(top, 10);
    if (topAsNumber + modalHeight > editorHeight) {
      return { top: 'auto', bottom: '0' };
    } else {
      return { top, bottom: 'auto' };
    }
  };

  render() {
    const { theme, locale, innerModal, closeInnerModal } = this.props;
    const { top, left } = innerModal?.modalProps || {};
    const { top: topAfterOverflowCheck, bottom: bottomAfterOverflowCheck } =
      (this.innerModalRef && this.getVerticalPosition(top)) || {};
    const dir = getLangDir(locale);
    const modalStyleDefaults: CSSProperties = {
      position: 'absolute',
      top: topAfterOverflowCheck || top,
      left: dir === 'ltr' ? left : 'auto',
      right: dir === 'rtl' ? left : 'auto',
      bottom: bottomAfterOverflowCheck || 'auto',
      border: 'solid 1px #ededed',
      background: 'rgb(255, 255, 255)',
      maxWidth: '420px',
      zIndex: 6,
      transform: 'none',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'var(--ricos-settings-text-color, #000)',
      borderRadius: 'var(--ricos-settings-whitebox-border-radius, 2px)',
      boxShadow: 'var(--ricos-settings-whitebox-box-shadow, 0 4px 8px 0 rgba(0, 0, 0, 0.07))',
    };
    const innerModalStyles: CSSProperties = {
      ...modalStyleDefaults,
      ...innerModal?.modalStyles,
    } as CSSProperties;
    return innerModal ? (
      <ClickOutside onClickOutside={closeInnerModal}>
        <div
          ref={this.setInnerModalRef}
          style={{
            ...innerModalStyles,
          }}
          className={theme.innerModalTheme}
        >
          <RichContentEditorModal
            modalsMap={undefined}
            locale={locale}
            {...innerModal?.modalProps}
          />
        </div>
      </ClickOutside>
    ) : null;
  }
}

export default InnerModal;
