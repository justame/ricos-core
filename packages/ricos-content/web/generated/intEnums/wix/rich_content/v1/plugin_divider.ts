/* eslint-disable */
import { PluginContainerData } from './common';

export interface DividerData {
  containerData?: PluginContainerData;
  lineStyle: DividerData_LineStyle;
  width: DividerData_Width;
  alignment: DividerData_Alignment;
}

export const enum DividerData_LineStyle {
  SINGLE = 0,
  DOUBLE = 1,
  DASHED = 2,
  DOTTED = 3,
  UNRECOGNIZED = -1,
}

export function dividerData_LineStyleFromJSON(object: any): DividerData_LineStyle {
  switch (object) {
    case 0:
    case 'SINGLE':
      return DividerData_LineStyle.SINGLE;
    case 1:
    case 'DOUBLE':
      return DividerData_LineStyle.DOUBLE;
    case 2:
    case 'DASHED':
      return DividerData_LineStyle.DASHED;
    case 3:
    case 'DOTTED':
      return DividerData_LineStyle.DOTTED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerData_LineStyle.UNRECOGNIZED;
  }
}

export function dividerData_LineStyleToJSON(object: DividerData_LineStyle): string {
  switch (object) {
    case DividerData_LineStyle.SINGLE:
      return 'SINGLE';
    case DividerData_LineStyle.DOUBLE:
      return 'DOUBLE';
    case DividerData_LineStyle.DASHED:
      return 'DASHED';
    case DividerData_LineStyle.DOTTED:
      return 'DOTTED';
    default:
      return 'UNKNOWN';
  }
}

export const enum DividerData_Width {
  LARGE = 0,
  MEDIUM = 1,
  SMALL = 2,
  UNRECOGNIZED = -1,
}

export function dividerData_WidthFromJSON(object: any): DividerData_Width {
  switch (object) {
    case 0:
    case 'LARGE':
      return DividerData_Width.LARGE;
    case 1:
    case 'MEDIUM':
      return DividerData_Width.MEDIUM;
    case 2:
    case 'SMALL':
      return DividerData_Width.SMALL;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerData_Width.UNRECOGNIZED;
  }
}

export function dividerData_WidthToJSON(object: DividerData_Width): string {
  switch (object) {
    case DividerData_Width.LARGE:
      return 'LARGE';
    case DividerData_Width.MEDIUM:
      return 'MEDIUM';
    case DividerData_Width.SMALL:
      return 'SMALL';
    default:
      return 'UNKNOWN';
  }
}

export const enum DividerData_Alignment {
  CENTER = 0,
  LEFT = 1,
  RIGHT = 2,
  UNRECOGNIZED = -1,
}

export function dividerData_AlignmentFromJSON(object: any): DividerData_Alignment {
  switch (object) {
    case 0:
    case 'CENTER':
      return DividerData_Alignment.CENTER;
    case 1:
    case 'LEFT':
      return DividerData_Alignment.LEFT;
    case 2:
    case 'RIGHT':
      return DividerData_Alignment.RIGHT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DividerData_Alignment.UNRECOGNIZED;
  }
}

export function dividerData_AlignmentToJSON(object: DividerData_Alignment): string {
  switch (object) {
    case DividerData_Alignment.CENTER:
      return 'CENTER';
    case DividerData_Alignment.LEFT:
      return 'LEFT';
    case DividerData_Alignment.RIGHT:
      return 'RIGHT';
    default:
      return 'UNKNOWN';
  }
}

const baseDividerData: object = { lineStyle: 0, width: 0, alignment: 0 };

export const DividerData = {
  fromJSON(object: any): DividerData {
    const message = { ...baseDividerData } as DividerData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.lineStyle !== undefined && object.lineStyle !== null) {
      message.lineStyle = dividerData_LineStyleFromJSON(object.lineStyle);
    } else {
      message.lineStyle = 0;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = dividerData_WidthFromJSON(object.width);
    } else {
      message.width = 0;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = dividerData_AlignmentFromJSON(object.alignment);
    } else {
      message.alignment = 0;
    }
    return message;
  },

  toJSON(message: DividerData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.lineStyle !== undefined &&
      (obj.lineStyle = dividerData_LineStyleToJSON(message.lineStyle));
    message.width !== undefined && (obj.width = dividerData_WidthToJSON(message.width));
    message.alignment !== undefined &&
      (obj.alignment = dividerData_AlignmentToJSON(message.alignment));
    return obj;
  },
};
