import React from 'react';
import type { Helpers } from 'wix-rich-content-common';
import { PlayIcon, PauseIcon, LoaderIcon } from 'wix-rich-content-ui-components';
import { AUDIO_TYPE } from '../types';
import styles from '../../statics/styles/audio.rtlignore.scss';
import { AUDIO_BI_VALUES, AUDIO_ACTION_NAMES } from '../consts';

interface Props {
  handlePause: () => void;
  handlePlay: () => void;
  isPlaying: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  helpers?: Helpers;
}

const AudioActionIcons: React.FC<Props> = ({
  isPlaying,
  handlePause,
  handlePlay,
  disabled,
  isLoading,
  helpers,
}) => {
  const onClick = () => {
    const ACTION_BI_VALUE = isPlaying ? AUDIO_BI_VALUES.PAUSE : AUDIO_BI_VALUES.PLAY;
    helpers?.onViewerAction?.(AUDIO_TYPE, AUDIO_ACTION_NAMES.playAudio, ACTION_BI_VALUE);
    isPlaying ? handlePause() : handlePlay();
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  const ComponentIcon = disabled || !isPlaying ? PlayIcon : PauseIcon;
  const ariaLabel = isPlaying ? 'pause' : 'play';

  return isLoading ? (
    <LoaderIcon className={styles.audio_loader_icon} />
  ) : (
    <button
      className={styles.audio_icon_button}
      onClick={onClick}
      onKeyPress={onKeyPress}
      aria-label={ariaLabel}
    >
      <ComponentIcon />
    </button>
  );
};

export default AudioActionIcons;
