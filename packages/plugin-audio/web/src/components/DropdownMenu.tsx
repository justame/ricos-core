import React from 'react';
import { FocusManager } from 'wix-rich-content-ui-components';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import styles from '../../statics/styles/audio.rtlignore.scss';
import type { audioMenuDataType } from '../types';

interface Props {
  options: audioMenuDataType;
  onClose: () => void;
}

const optionElement = (option: audioMenuDataType[0]) => {
  const selected = option?.selected;
  const content = option.icon ? (
    <span className={styles.dropdown_content_withIcon}>
      {option.icon()}
      {option.text}
    </span>
  ) : (
    <span className={styles.dropdown_content}>{option.text}</span>
  );
  const onKeyDown = e => {
    if (e.keyCode === KEYS_CHARCODE.ENTER) {
      option.onClick();
    }
  };

  return (
    <button
      key={option.text}
      className={selected ? styles.dropdown_selected_button : ''}
      onKeyDown={onKeyDown}
      onClick={option.onClick}
      data-hook={option?.dataHook}
    >
      {content}
    </button>
  );
};

const DropdownMenu: React.FC<Props> = ({ options, onClose }) => {
  const onKeyDown = e => {
    if (e.keyCode === KEYS_CHARCODE.ESCAPE) {
      onClose();
    }
  };
  return (
    <FocusManager onKeyDown={onKeyDown}>
      <div className={styles.dropdown_menu_wrapper}>
        {options.map(option => optionElement(option))}
      </div>
    </FocusManager>
  );
};

export default DropdownMenu;
