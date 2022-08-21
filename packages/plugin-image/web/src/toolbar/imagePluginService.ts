import type { IMediaPluginService, UploadedData, IMessage } from 'ricos-types';
import { omit } from 'lodash';
import type { ComponentData, ImageComponentData } from 'wix-rich-content-common';

export class ImagePluginService implements IMediaPluginService {
  createLoadingData(_: File, url: unknown, componentData: ComponentData) {
    return {
      componentData: {
        ...componentData,
      },
      componentState: {
        tempData: url,
        loading: true,
      },
    };
  }

  createPluginData(uploadedData: UploadedData, componentData: ComponentData) {
    const { file_name, width, height } = (uploadedData.data as ImageComponentData) || {};
    return {
      ...omit(componentData, ['tempData', 'loading']),
      image: { src: { id: file_name }, width, height },
    };
  }

  createErrorData(error: IMessage, componentData: ComponentData) {
    return {
      ...omit(componentData, ['loading']),
      error,
    };
  }
}
