import classNames from 'classnames';
import React from 'react';
import type { RichContentTheme } from 'wix-rich-content-common';
import {
  SoundIcon,
  SoundMutedIcon,
  Slider,
  SLIDER_TRACK_SIZE,
} from 'wix-rich-content-ui-components';
import styles from '../../statics/styles/audio.rtlignore.scss';

interface Props {
  volume: number;
  muted: boolean;
  handleMute: () => void;
  theme: RichContentTheme;
  handleVolumeChange: (number: number) => void;
}

const SoundControl: React.FC<Props> = ({
  volume,
  muted,
  handleMute,
  theme,
  handleVolumeChange,
}) => {
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      handleMute();
    }
  };

  const onKeyDown = e => {
    const shouldDecrease = e.key === 'ArrowDown' && volume > 0;
    const shouldIncrease = e.key === 'ArrowUp' && volume < 1;
    const newVolume = shouldDecrease ? volume - 0.1 : shouldIncrease ? volume + 0.1 : volume;
    handleVolumeChange(parseFloat(newVolume.toFixed(1)));
  };

  const SoundIconComponent = muted ? SoundMutedIcon : SoundIcon;

  return (
    <button
      className={classNames(styles.audio_icon_button, styles.audio_volume_wrapper)}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      aria-label="sound"
    >
      <div className={styles.volume_slider_wrapper}>
        <Slider
          theme={theme}
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
          onChangeCommitted={handleVolumeChange}
          languageDir="ltr"
          dataHook="audioVolumeSlider"
          trackSize={SLIDER_TRACK_SIZE.small}
          liveSiteWiring
          tabIndex={-1}
        />
      </div>
      <SoundIconComponent className={styles.audio_sound_icon} onClick={handleMute} />
    </button>
  );
};

export default SoundControl;
