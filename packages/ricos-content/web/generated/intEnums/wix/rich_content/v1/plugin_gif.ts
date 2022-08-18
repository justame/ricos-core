/* eslint-disable */
import { PluginContainerData } from './common';

export interface GIFData {
  containerData?: PluginContainerData;
  /** original gif */
  original?: GIF;
  /** downsized gif */
  downsized?: GIF;
  height: number;
  width: number;
}

export interface GIF {
  gif?: string;
  mp4?: string;
  still?: string;
}

const baseGIFData: object = { height: 0, width: 0 };

export const GIFData = {
  fromJSON(object: any): GIFData {
    const message = { ...baseGIFData } as GIFData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.original !== undefined && object.original !== null) {
      message.original = GIF.fromJSON(object.original);
    } else {
      message.original = undefined;
    }
    if (object.downsized !== undefined && object.downsized !== null) {
      message.downsized = GIF.fromJSON(object.downsized);
    } else {
      message.downsized = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = 0;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = 0;
    }
    return message;
  },

  toJSON(message: GIFData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.original !== undefined &&
      (obj.original = message.original ? GIF.toJSON(message.original) : undefined);
    message.downsized !== undefined &&
      (obj.downsized = message.downsized ? GIF.toJSON(message.downsized) : undefined);
    message.height !== undefined && (obj.height = message.height);
    message.width !== undefined && (obj.width = message.width);
    return obj;
  },
};

const baseGIF: object = {};

export const GIF = {
  fromJSON(object: any): GIF {
    const message = { ...baseGIF } as GIF;
    if (object.gif !== undefined && object.gif !== null) {
      message.gif = String(object.gif);
    } else {
      message.gif = undefined;
    }
    if (object.mp4 !== undefined && object.mp4 !== null) {
      message.mp4 = String(object.mp4);
    } else {
      message.mp4 = undefined;
    }
    if (object.still !== undefined && object.still !== null) {
      message.still = String(object.still);
    } else {
      message.still = undefined;
    }
    return message;
  },

  toJSON(message: GIF): unknown {
    const obj: any = {};
    message.gif !== undefined && (obj.gif = message.gif);
    message.mp4 !== undefined && (obj.mp4 = message.mp4);
    message.still !== undefined && (obj.still = message.still);
    return obj;
  },
};
