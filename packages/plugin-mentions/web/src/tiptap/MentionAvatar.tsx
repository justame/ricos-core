import React from 'react';
import styles from '../../statics/mention-list.scss';
import AvatarIcon from '../icons/AvatarIcon';

const MentionAvatar = ({ src, alt }) => {
  return src ? (
    <img className={styles.avatar} src={src} alt={alt} />
  ) : (
    <AvatarIcon className={styles.avatar} />
  );
};

export default MentionAvatar;
