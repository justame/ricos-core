/* eslint-disable */
import { TextStyle } from './common';

export interface CodeBlockData {
  textStyle?: TextStyle;
}

const baseCodeBlockData: object = {};

export const CodeBlockData = {
  fromJSON(object: any): CodeBlockData {
    const message = { ...baseCodeBlockData } as CodeBlockData;
    if (object.textStyle !== undefined && object.textStyle !== null) {
      message.textStyle = TextStyle.fromJSON(object.textStyle);
    } else {
      message.textStyle = undefined;
    }
    return message;
  },

  toJSON(message: CodeBlockData): unknown {
    const obj: any = {};
    message.textStyle !== undefined &&
      (obj.textStyle = message.textStyle ? TextStyle.toJSON(message.textStyle) : undefined);
    return obj;
  },
};
