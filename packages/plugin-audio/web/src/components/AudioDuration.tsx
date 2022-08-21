import React from 'react';
import styles from '../../statics/styles/audio.rtlignore.scss';

interface Props {
  seconds: number;
}

const Duration: React.FC<Props> = ({ seconds }) => {
  return <time dateTime={`P${Math.round(seconds)}S`}>{format(seconds)}</time>;
};

function format(seconds: number) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function pad(string: number) {
  return ('0' + string).slice(-2);
}

interface AudioDurationProps {
  elapsed: number;
  duration: number;
  isMobile?: boolean;
  isSmallWidth?: boolean;
}
const AudioDuration: React.FC<AudioDurationProps> = ({
  elapsed,
  duration,
  isMobile,
  isSmallWidth,
}) => {
  const shouldRenderElapsed = !(isMobile || isSmallWidth);
  return (
    <div className={styles.audio_duration}>
      {shouldRenderElapsed && (
        <>
          <Duration seconds={elapsed} /> /
        </>
      )}
      <Duration seconds={duration} />
    </div>
  );
};
export default AudioDuration;
