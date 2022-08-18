/* eslint-disable */
import { PluginContainerData, Media } from './common';

export interface AudioData {
  containerData?: PluginContainerData;
  audio?: Media;
  disableDownload?: boolean;
  coverImage?: Media;
  name?: string;
  authorName?: string;
  html?: string;
}

const baseAudioData: object = {};

export const AudioData = {
  fromJSON(object: any): AudioData {
    const message = { ...baseAudioData } as AudioData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.audio !== undefined && object.audio !== null) {
      message.audio = Media.fromJSON(object.audio);
    } else {
      message.audio = undefined;
    }
    if (object.disableDownload !== undefined && object.disableDownload !== null) {
      message.disableDownload = Boolean(object.disableDownload);
    } else {
      message.disableDownload = undefined;
    }
    if (object.coverImage !== undefined && object.coverImage !== null) {
      message.coverImage = Media.fromJSON(object.coverImage);
    } else {
      message.coverImage = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = undefined;
    }
    if (object.authorName !== undefined && object.authorName !== null) {
      message.authorName = String(object.authorName);
    } else {
      message.authorName = undefined;
    }
    if (object.html !== undefined && object.html !== null) {
      message.html = String(object.html);
    } else {
      message.html = undefined;
    }
    return message;
  },

  toJSON(message: AudioData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.audio !== undefined &&
      (obj.audio = message.audio ? Media.toJSON(message.audio) : undefined);
    message.disableDownload !== undefined && (obj.disableDownload = message.disableDownload);
    message.coverImage !== undefined &&
      (obj.coverImage = message.coverImage ? Media.toJSON(message.coverImage) : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.authorName !== undefined && (obj.authorName = message.authorName);
    message.html !== undefined && (obj.html = message.html);
    return obj;
  },
};
