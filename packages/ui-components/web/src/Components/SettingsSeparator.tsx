import React from 'react';
import classNames from 'classnames';
import styles from '../../statics/styles/settings-separator.scss';

const SettingsSeparator = ({ top = false, bottom = false }) => {
  return (
    <div
      className={classNames(styles.settingsSeparator, {
        [styles.settingsSeparator_top]: top,
        [styles.settingsSeparator_bottom]: bottom,
      })}
    />
  );
};

export default SettingsSeparator;
