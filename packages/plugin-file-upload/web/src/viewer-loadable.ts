import { typeMapper } from './typeMapper-loadable';
import type { FilePluginViewerConfig } from './types';
import { FILE_UPLOAD_TYPE } from './types';
export { typeMapper as fileUploadTypeMapper, FILE_UPLOAD_TYPE, FilePluginViewerConfig };
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';

export const pluginFileUpload: ViewerPluginCreator<FilePluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: FILE_UPLOAD_TYPE,
    typeMapper,
  };
};
