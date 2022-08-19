/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type {
  TranslationFunction,
  RichContentTheme,
  Helpers,
  TextDirection,
} from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import { SettingsMobileHeader, Button } from '..';
import { BUTTON_SIZE } from '../consts';
import Styles from '../../statics/styles/url-input-modal.scss';
import classNames from 'classnames';

interface TextInputModalContainerProps {
  t: TranslationFunction;
  theme?: RichContentTheme;
  languageDir?: TextDirection;
  dataHook: string;
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  isMobile?: boolean;
  withMobileHeader?: boolean;
  selected?: boolean;
  showTitle?: boolean;
  onConfirm: () => void;
  onCloseRequested: (() => void) | undefined;
  submittedInvalidUrl?: any;
  errorMessage: string;
  placeholder: string;
  buttonAlignment?: string;
  saveLabel?: string;
  onInputChange: (text) => void;
  input?: string;
  helpers?: Helpers;
  withMobileSaveButton?: boolean;
}

const TextInputModalContainer: React.FC<TextInputModalContainerProps> = ({
  t,
  theme = {},
  languageDir,
  dataHook,
  children,
  title,
  subTitle,
  isMobile,
  withMobileHeader = true,
  withMobileSaveButton = false,
  selected = true,
  showTitle = true,
  onConfirm,
  onCloseRequested,
  saveLabel,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const saveLabelText = saveLabel || t('EmbedURL_Common_CTA_Primary');
  const modalTitle = title && showTitle && <div className={styles.input_header_title}>{title}</div>;
  const modalSubTitle = subTitle && <div className={styles.header_subTitle}>{subTitle}</div>;

  const renderMobileHeader = () => (
    <SettingsMobileHeader
      theme={theme}
      onSave={onConfirm}
      onCancel={() => onCloseRequested?.()}
      t={t}
      title={t('EmbedURL_MobileHeader')}
      useNewSettingsUi
      showSaveBtn={false}
    />
  );

  const renderActionButton = () => (
    <Button
      dataHook="actionButtonSave"
      disabled={!selected}
      onClick={onConfirm}
      size={BUTTON_SIZE.medium}
      theme={theme}
    >
      {saveLabelText}
    </Button>
  );

  const shouldRenderActionButton = !isMobile || (isMobile && withMobileSaveButton);

  return (
    <div
      className={classNames(styles.inputModal_container, {
        [styles.inputModal_mobile]: isMobile,
        [styles.inputModal_mobile_withHeader]: withMobileHeader && isMobile,
      })}
    >
      {isMobile && withMobileHeader && renderMobileHeader()}
      <div className={styles.inputModal_content} data-hook={dataHook} dir={languageDir}>
        {modalTitle}
        {modalSubTitle}
        <div
          className={classNames(styles.inputModal_textInput, {
            [styles.textInput_margin_bottom]: withMobileSaveButton,
          })}
        >
          {children}
        </div>
        {shouldRenderActionButton && renderActionButton()}
      </div>
    </div>
  );
};

export default TextInputModalContainer;
