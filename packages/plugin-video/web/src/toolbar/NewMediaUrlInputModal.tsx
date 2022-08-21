import React from 'react';
import { NewUrlInputModal, BUTTON_SIZE } from 'wix-rich-content-ui-components';
import type { Helpers, TranslationFunction, TextDirection } from 'wix-rich-content-common';

interface MediaURLInputModalProps {
  onConfirm: () => void;
  helpers: Helpers;
  t: TranslationFunction;
  isMobile?: boolean;
  languageDir?: TextDirection;
  url: string;
  submittedInvalidUrl: boolean;
  setUrl: (url) => void;
  onDoubleClick: (url) => void;
  withMobileHeader?: boolean;
  dataHook?: string;
  title?: string;
  subTitle?: string;
  saveLabel?: string;
}

const MediaURLInputModal: React.FC<MediaURLInputModalProps> = ({
  t,
  languageDir,
  helpers,
  isMobile,
  url,
  submittedInvalidUrl,
  setUrl,
  withMobileHeader = false,
  onConfirm,
  dataHook,
  title,
  subTitle,
  saveLabel,
  onDoubleClick,
}) => {
  return (
    <NewUrlInputModal
      onConfirm={onConfirm}
      helpers={helpers}
      input={url}
      t={t}
      languageDir={languageDir}
      title={title}
      subTitle={subTitle}
      submittedInvalidUrl={submittedInvalidUrl}
      dataHook={dataHook}
      saveLabel={saveLabel}
      onInputChange={url => setUrl(url)}
      errorMessage={t('SoundCloudUploadModal_Input_InvalidUrl')}
      placeholder={t('EmbedURL_Placeholder')}
      onCloseRequested={helpers.closeModal}
      buttonSize={BUTTON_SIZE.medium}
      isMobile={isMobile}
      withMobileHeader={withMobileHeader}
      onDoubleClick={onDoubleClick}
      withMobileSaveButton
    />
  );
};

export default MediaURLInputModal;
