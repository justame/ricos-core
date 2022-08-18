/* eslint-disable */
import { PluginContainerData, Media } from './common';

export interface VideoData {
  containerData?: PluginContainerData;
  video?: Media;
  thumbnail?: Media;
  disableDownload?: boolean;
  title?: string;
}

const baseVideoData: object = {};

export const VideoData = {
  fromJSON(object: any): VideoData {
    const message = { ...baseVideoData } as VideoData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.video !== undefined && object.video !== null) {
      message.video = Media.fromJSON(object.video);
    } else {
      message.video = undefined;
    }
    if (object.thumbnail !== undefined && object.thumbnail !== null) {
      message.thumbnail = Media.fromJSON(object.thumbnail);
    } else {
      message.thumbnail = undefined;
    }
    if (object.disableDownload !== undefined && object.disableDownload !== null) {
      message.disableDownload = Boolean(object.disableDownload);
    } else {
      message.disableDownload = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    return message;
  },

  toJSON(message: VideoData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.video !== undefined &&
      (obj.video = message.video ? Media.toJSON(message.video) : undefined);
    message.thumbnail !== undefined &&
      (obj.thumbnail = message.thumbnail ? Media.toJSON(message.thumbnail) : undefined);
    message.disableDownload !== undefined && (obj.disableDownload = message.disableDownload);
    message.title !== undefined && (obj.title = message.title);
    return obj;
  },
};
