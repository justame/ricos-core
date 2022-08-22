//@ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import FileUploadViewer from './file-upload-viewer';
import { FILE_UPLOAD_TYPE } from './types';

function FileUploadComponent(props) {
  const {
    componentData,
    theme,
    setComponentUrl,
    t,
    isMobile,
    tempData,
    isLoading,
    locale,
    settings,
  } = props;
  const tempDataPlaceHolder = tempData || (componentData.tempData ? componentData : undefined);
  return (
    <FileUploadViewer
      componentData={componentData}
      isLoading={isLoading || componentData.tempData}
      theme={theme}
      setComponentUrl={setComponentUrl}
      t={t}
      isMobile={isMobile}
      tempDataPlaceHolder={tempDataPlaceHolder}
      locale={locale}
      settings={settings}
    />
  );
}

FileUploadComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setComponentUrl: PropTypes.func,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  tempData: PropTypes.object,
  isLoading: PropTypes.bool,
  locale: PropTypes.string,
  settings: PropTypes.object,
};

FileUploadComponent.defaultProps = {
  settings: {},
};

export { FileUploadComponent as Component };
