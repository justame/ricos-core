import type { IMediaPluginService, UploadedData, IMessage } from 'ricos-types';
import { omit } from 'lodash';
import type { ComponentData, FileComponentData } from 'wix-rich-content-common';

export class FilePluginService implements IMediaPluginService {
  createLoadingData(file: File, _: unknown, componentData: ComponentData) {
    const { name, size } = file;
    const type = name.split('.').pop();
    return {
      componentData: {
        ...componentData,
        name,
        size,
        type,
      },
      componentState: {
        loading: true,
        tempData: true,
      },
    };
  }

  createPluginData(uploadedData: UploadedData, componentData: ComponentData) {
    const { data } = uploadedData;
    const { url, id, privacy } = data as FileComponentData;

    const src = url ? { url } : { id };

    return {
      ...omit(componentData, ['tempData', 'loading']),
      ...omit(data, 'url', 'id', 'privacy'),
      src: { ...src, privacy },
    };
  }

  createErrorData(error: IMessage, componentData: ComponentData) {
    return {
      ...omit(componentData, ['tempData', 'loading']),
      error,
    };
  }
}
