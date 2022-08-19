/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import styles from '../../statics/styles/url-input-modal.scss';

interface MediaUploadModalProps {
  id?: string;
  handleClick: (e?: any) => void;
  handleChange: (file: any) => void;
  languageDir: string;
  title: string;
  labelText: string;
  dataHook: string;
  showUploadSection: boolean;
  accept: string;
}

const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  id,
  handleClick,
  handleChange,
  languageDir,
  title,
  labelText,
  dataHook,
  showUploadSection,
  accept,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = e => handleChange(e.target.files[0]);
  const onKeyPress = e => e.key === 'Enter' && inputRef?.current?.click();

  const uploadSection = (
    <div>
      <div className={styles.mediaUploadModal}>
        <label
          htmlFor={id}
          className={styles.mediaUploadModal_fileInputLabel}
          role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
          data-hook={dataHook}
          onKeyPress={onKeyPress}
          tabIndex={0}
        >
          <input
            id={id}
            type="file"
            accept={accept}
            className={styles.mediaUploadModal_fileInput}
            ref={inputRef}
            onClick={handleClick}
            onChange={onChange}
            tabIndex={-1}
          />
          {labelText}
        </label>
      </div>
    </div>
  );
  return (
    <div>
      <div className={styles.header_subTitle} dir={languageDir}>
        {title}
      </div>
      {showUploadSection && uploadSection}
    </div>
  );
};

export default MediaUploadModal;
