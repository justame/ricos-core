/* eslint-disable */
import { PluginContainerData, Oembed } from './common';

export interface EmbedData {
  containerData?: PluginContainerData;
  oembed?: Oembed;
  src?: string;
}

const baseEmbedData: object = {};

export const EmbedData = {
  fromJSON(object: any): EmbedData {
    const message = { ...baseEmbedData } as EmbedData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.oembed !== undefined && object.oembed !== null) {
      message.oembed = Oembed.fromJSON(object.oembed);
    } else {
      message.oembed = undefined;
    }
    if (object.src !== undefined && object.src !== null) {
      message.src = String(object.src);
    } else {
      message.src = undefined;
    }
    return message;
  },

  toJSON(message: EmbedData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.oembed !== undefined &&
      (obj.oembed = message.oembed ? Oembed.toJSON(message.oembed) : undefined);
    message.src !== undefined && (obj.src = message.src);
    return obj;
  },
};
