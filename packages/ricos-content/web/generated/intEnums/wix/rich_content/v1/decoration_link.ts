/* eslint-disable */
import { Link } from './common';

export interface LinkData {
  link?: Link;
}

const baseLinkData: object = {};

export const LinkData = {
  fromJSON(object: any): LinkData {
    const message = { ...baseLinkData } as LinkData;
    if (object.link !== undefined && object.link !== null) {
      message.link = Link.fromJSON(object.link);
    } else {
      message.link = undefined;
    }
    return message;
  },

  toJSON(message: LinkData): unknown {
    const obj: any = {};
    message.link !== undefined && (obj.link = message.link ? Link.toJSON(message.link) : undefined);
    return obj;
  },
};
