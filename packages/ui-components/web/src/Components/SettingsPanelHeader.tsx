/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import styles from '../../statics/styles/settings-panel-header.scss';
import { CloseIcon } from '../Icons';
interface SettingsPanelHeaderProps {
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
  showCloseIcon?: boolean;
}

const SettingsPanelHeader: React.FC<SettingsPanelHeaderProps> = ({
  title,
  onClose,
  children,
  showCloseIcon = true,
}) => {
  const onKeyPress = e => e.key === 'Enter' && onClose();

  return (
    <div className={styles.settingsPanelHeader}>
      <div className={styles.settingsPanelHeader_title}>{children || title}</div>
      <div className={styles.settingsPanelHeader_closeIcon}>
        {showCloseIcon && (
          <CloseIcon
            onClick={onClose}
            onKeyPress={onKeyPress}
            tabIndex={0}
            data-hook="settingsCloseIcon"
          />
        )}
      </div>
    </div>
  );
};

export default SettingsPanelHeader;
