import type { FunctionComponent } from 'react';
import React from 'react';
import classnames from 'classnames';
import styles from '../../statics/styles/toast.scss';
import { CloseIcon } from '../Icons';

const Toast: FunctionComponent<{
  message: string | JSX.Element;
  onClose?: () => void;
  isMobile?: boolean;
  isError?: boolean;
}> = ({ isMobile, isError, message, onClose }) => {
  const backgroundColor = isError ? styles.error : styles.success;
  const style = classnames(styles.toastContainer, isMobile && styles.mobile, backgroundColor);
  return (
    <div className={style}>
      {onClose && <CloseIcon className={styles.close} onClick={onClose} />}
      {message}
    </div>
  );
};

export default Toast;
