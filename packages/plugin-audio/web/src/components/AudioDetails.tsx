import React from 'react';
import styles from '../../statics/styles/audio.rtlignore.scss';

interface Props {
  authorName?: string;
  title?: string;
}

const AudioDetails = ({ authorName, title }: Props) => {
  return (
    <div className={styles.audioDetails}>
      {title && <span className={styles.title}>{title}</span>}
      {authorName && <span className={styles.author_name}>{authorName}</span>}
    </div>
  );
};

export default AudioDetails;
