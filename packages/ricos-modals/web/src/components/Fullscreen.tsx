import React from 'react';
import styles from '../../statics/styles/fullscreen.scss';

export const Fullscreen = ({ children }) => {
  return <div className={styles.fullscreen}>{children}</div>;
};
