/* eslint-disable */
export interface FontSizeData {
  unit: FontSizeData_fontType;
  value?: number;
}

export const enum FontSizeData_fontType {
  PX = 'PX',
  EM = 'EM',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function fontSizeData_fontTypeFromJSON(object: any): FontSizeData_fontType {
  switch (object) {
    case 0:
    case 'PX':
      return FontSizeData_fontType.PX;
    case 1:
    case 'EM':
      return FontSizeData_fontType.EM;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return FontSizeData_fontType.UNRECOGNIZED;
  }
}

export function fontSizeData_fontTypeToJSON(object: FontSizeData_fontType): string {
  switch (object) {
    case FontSizeData_fontType.PX:
      return 'PX';
    case FontSizeData_fontType.EM:
      return 'EM';
    default:
      return 'UNKNOWN';
  }
}

const baseFontSizeData: object = { unit: FontSizeData_fontType.PX };

export const FontSizeData = {
  fromJSON(object: any): FontSizeData {
    const message = { ...baseFontSizeData } as FontSizeData;
    if (object.unit !== undefined && object.unit !== null) {
      message.unit = fontSizeData_fontTypeFromJSON(object.unit);
    } else {
      message.unit = FontSizeData_fontType.PX;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: FontSizeData): unknown {
    const obj: any = {};
    message.unit !== undefined && (obj.unit = fontSizeData_fontTypeToJSON(message.unit));
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
};
