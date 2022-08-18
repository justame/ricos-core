/* eslint-disable */
import { PluginContainerData, Link } from './common';

export interface LinkPreviewData {
  containerData?: PluginContainerData;
  link?: Link;
  title?: string;
  thumbnailUrl?: string;
  description?: string;
  html?: string;
}

const baseLinkPreviewData: object = {};

export const LinkPreviewData = {
  fromJSON(object: any): LinkPreviewData {
    const message = { ...baseLinkPreviewData } as LinkPreviewData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.link !== undefined && object.link !== null) {
      message.link = Link.fromJSON(object.link);
    } else {
      message.link = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    if (object.thumbnailUrl !== undefined && object.thumbnailUrl !== null) {
      message.thumbnailUrl = String(object.thumbnailUrl);
    } else {
      message.thumbnailUrl = undefined;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = undefined;
    }
    if (object.html !== undefined && object.html !== null) {
      message.html = String(object.html);
    } else {
      message.html = undefined;
    }
    return message;
  },

  toJSON(message: LinkPreviewData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.link !== undefined && (obj.link = message.link ? Link.toJSON(message.link) : undefined);
    message.title !== undefined && (obj.title = message.title);
    message.thumbnailUrl !== undefined && (obj.thumbnailUrl = message.thumbnailUrl);
    message.description !== undefined && (obj.description = message.description);
    message.html !== undefined && (obj.html = message.html);
    return obj;
  },
};
