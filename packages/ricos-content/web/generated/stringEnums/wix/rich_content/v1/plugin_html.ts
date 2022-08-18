/* eslint-disable */
import { PluginContainerData } from './common';

export interface HTMLData {
  containerData?: PluginContainerData;
  url: string | undefined;
  html: string | undefined;
}

const baseHTMLData: object = {};

export const HTMLData = {
  fromJSON(object: any): HTMLData {
    const message = { ...baseHTMLData } as HTMLData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    if (object.html !== undefined && object.html !== null) {
      message.html = String(object.html);
    } else {
      message.html = undefined;
    }
    return message;
  },

  toJSON(message: HTMLData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.url !== undefined && (obj.url = message.url);
    message.html !== undefined && (obj.html = message.html);
    return obj;
  },
};
