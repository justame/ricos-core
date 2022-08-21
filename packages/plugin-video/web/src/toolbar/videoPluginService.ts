import type { IMediaPluginService, UploadedData, IMessage } from 'ricos-types';
import { omit } from 'lodash';
import type { ComponentData, VideoComponentData } from 'wix-rich-content-common';

export class VideoPluginService implements IMediaPluginService {
  createLoadingData(_: File, url: unknown, componentData: ComponentData) {
    return {
      componentData: {
        ...componentData,
        video: { src: { url } },
      },
      componentState: {
        loading: true,
        tempData: true,
      },
    };
  }

  createPluginData(uploadedData: UploadedData, componentData: ComponentData) {
    let src;
    let thumbnail;
    const data = uploadedData.data as VideoComponentData & { url: unknown };
    if (data) {
      const { pathname, thumbnail: uploadedThumbnail, url } = data;
      src = pathname ? { id: pathname } : { url };
      thumbnail = {
        src: { id: uploadedThumbnail.pathname },
        width: uploadedThumbnail.width,
        height: uploadedThumbnail.height,
      };
    }
    return {
      ...omit(componentData, ['tempData', 'loading']),
      video: { src },
      thumbnail,
    };
  }

  createErrorData(error: IMessage, componentData: ComponentData) {
    return {
      ...omit(componentData, ['tempData', 'loading']),
      error,
    };
  }
}
