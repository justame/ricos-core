import React from 'react';
import styles from '../../statics/styles/audio.rtlignore.scss';
import { ClickOutside } from 'wix-rich-content-editor-common';
import DropdownMenu from './DropdownMenu';
import { ContextMenuIcon } from 'wix-rich-content-ui-components';
import type { audioMenuDataType } from '../types';

interface Props {
  onClickOutside: () => void;
  contextMenuData: audioMenuDataType;
  playBackMenuData: audioMenuDataType;
  showContextMenu: boolean;
  showPlaybackMenu: boolean;
  onClick: () => void;
}

const ContextMenu: React.FC<Props> = ({
  onClickOutside,
  contextMenuData,
  playBackMenuData,
  showContextMenu,
  showPlaybackMenu,
  onClick,
}) => {
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <>
      <ClickOutside onClickOutside={onClickOutside}>
        {showContextMenu && <DropdownMenu options={contextMenuData} onClose={onClickOutside} />}
        {showPlaybackMenu && <DropdownMenu options={playBackMenuData} onClose={onClickOutside} />}
      </ClickOutside>
      <ContextMenuIcon
        data-hook="audioContextMenu"
        tabIndex={0}
        onKeyPress={onKeyPress}
        className={styles.audio_contextMenuIcon}
        onClick={onClick}
        aria-label="context menu"
      />
    </>
  );
};

export default ContextMenu;
