import React from 'react';
import { Button } from '..';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import classNames from 'classnames';
import styles from '../../statics/styles/settings-mobile-header.scss';

export interface SettingsMobileHeaderProps {
  onCancel: () => void;
  onSave: () => void;
  cancelLabel?: string;
  saveLabel?: string;
  theme: RichContentTheme;
  title?: string;
  t: TranslationFunction;
  useNewSettingsUi?: boolean; //!remove when experiment is done
  showSaveBtn?: boolean;
}

const SettingsMobileHeader: React.FC<SettingsMobileHeaderProps> = ({
  theme,
  onSave,
  onCancel,
  saveLabel,
  cancelLabel,
  title,
  t,
  children,
  useNewSettingsUi,
  showSaveBtn = true,
}) => {
  const saveText = saveLabel || t('SettingsPanelFooter_Save');
  const cancelText = cancelLabel || t('SettingsPanelFooter_Cancel');
  const buttonsDataHook = { save: 'actionButtonSave', cancel: 'actionButtonCancel' };

  const renderButton = (text, dataHook, onClick, showBtn = true) => (
    <Button
      ariaLabel={text}
      theme={theme}
      isMobile
      dataHook={dataHook}
      onClick={onClick}
      style={!showBtn ? { visibility: 'hidden' } : {}}
    >
      {text}
    </Button>
  );

  return (
    <div
      className={classNames(styles.setting_mobile_header, {
        [styles.setting_mobile_header_newUi]: useNewSettingsUi,
      })}
    >
      {renderButton(saveText, buttonsDataHook.save, onSave, showSaveBtn)}
      <>
        {title && <div className={styles.setting_mobile_header_title}>{title}</div>}
        {children}
      </>
      {renderButton(cancelText, buttonsDataHook.cancel, onCancel)}
    </div>
  );
};

export default SettingsMobileHeader;
