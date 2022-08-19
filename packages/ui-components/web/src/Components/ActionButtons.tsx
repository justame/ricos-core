import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import styles from '../../statics/styles/action-buttons.scss';
import type { BUTTON_SIZE } from '../consts';

type ButtonSizeKeys = keyof typeof BUTTON_SIZE;

export interface ActionButtonsProps {
  size?: typeof BUTTON_SIZE[ButtonSizeKeys];
  onCancel: () => void;
  onSave: () => void;
  cancelText: string;
  saveText: string;
  isMobile?: boolean;
  disableSave?: boolean;
  theme: RichContentTheme;
  t: TranslationFunction;
  children?: React.ReactNode;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  size,
  onCancel,
  onSave,
  cancelText,
  saveText,
  isMobile = false,
  theme,
  disableSave = false,
  children,
  t,
}) => {
  const saveLabel = saveText || t('SettingsPanelFooter_Save');
  const cancelLabel = cancelText || t('SettingsPanelFooter_Cancel');
  const buttonsDataHook = { save: 'actionButtonSave', cancel: 'actionButtonCancel' };
  const isSecondary = true;
  const isDisabled = false;

  const renderButton = (text, dataHook, onClick, disabled = false, secondary = false) => (
    <Button
      size={size}
      ariaLabel={text}
      disabled={disabled}
      theme={theme}
      isMobile={isMobile}
      dataHook={dataHook}
      onClick={onClick}
      secondary={secondary}
    >
      {text}
    </Button>
  );
  return (
    <div className={classNames(styles.action_buttons, { [styles.mobile]: isMobile })}>
      {renderButton(saveLabel, buttonsDataHook.save, onSave, disableSave)}
      {children}
      {renderButton(cancelLabel, buttonsDataHook.cancel, onCancel, isDisabled, isSecondary)}
    </div>
  );
};

export default ActionButtons;
