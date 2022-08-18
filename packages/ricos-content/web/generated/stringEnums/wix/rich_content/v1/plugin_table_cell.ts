/* eslint-disable */
export interface TableCellData {
  cellStyle?: TableCellData_CellStyle;
  borderColors?: TableCellData_BorderColors;
}

export const enum TableCellData_VerticalAlignment {
  TOP = 'TOP',
  MIDDLE = 'MIDDLE',
  BOTTOM = 'BOTTOM',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function tableCellData_VerticalAlignmentFromJSON(
  object: any
): TableCellData_VerticalAlignment {
  switch (object) {
    case 0:
    case 'TOP':
      return TableCellData_VerticalAlignment.TOP;
    case 1:
    case 'MIDDLE':
      return TableCellData_VerticalAlignment.MIDDLE;
    case 2:
    case 'BOTTOM':
      return TableCellData_VerticalAlignment.BOTTOM;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return TableCellData_VerticalAlignment.UNRECOGNIZED;
  }
}

export function tableCellData_VerticalAlignmentToJSON(
  object: TableCellData_VerticalAlignment
): string {
  switch (object) {
    case TableCellData_VerticalAlignment.TOP:
      return 'TOP';
    case TableCellData_VerticalAlignment.MIDDLE:
      return 'MIDDLE';
    case TableCellData_VerticalAlignment.BOTTOM:
      return 'BOTTOM';
    default:
      return 'UNKNOWN';
  }
}

export interface TableCellData_CellStyle {
  verticalAlignment: TableCellData_VerticalAlignment;
  backgroundColor?: string;
}

export interface TableCellData_BorderColors {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

const baseTableCellData: object = {};

export const TableCellData = {
  fromJSON(object: any): TableCellData {
    const message = { ...baseTableCellData } as TableCellData;
    if (object.cellStyle !== undefined && object.cellStyle !== null) {
      message.cellStyle = TableCellData_CellStyle.fromJSON(object.cellStyle);
    } else {
      message.cellStyle = undefined;
    }
    if (object.borderColors !== undefined && object.borderColors !== null) {
      message.borderColors = TableCellData_BorderColors.fromJSON(object.borderColors);
    } else {
      message.borderColors = undefined;
    }
    return message;
  },

  toJSON(message: TableCellData): unknown {
    const obj: any = {};
    message.cellStyle !== undefined &&
      (obj.cellStyle = message.cellStyle
        ? TableCellData_CellStyle.toJSON(message.cellStyle)
        : undefined);
    message.borderColors !== undefined &&
      (obj.borderColors = message.borderColors
        ? TableCellData_BorderColors.toJSON(message.borderColors)
        : undefined);
    return obj;
  },
};

const baseTableCellData_CellStyle: object = {
  verticalAlignment: TableCellData_VerticalAlignment.TOP,
};

export const TableCellData_CellStyle = {
  fromJSON(object: any): TableCellData_CellStyle {
    const message = { ...baseTableCellData_CellStyle } as TableCellData_CellStyle;
    if (object.verticalAlignment !== undefined && object.verticalAlignment !== null) {
      message.verticalAlignment = tableCellData_VerticalAlignmentFromJSON(object.verticalAlignment);
    } else {
      message.verticalAlignment = TableCellData_VerticalAlignment.TOP;
    }
    if (object.backgroundColor !== undefined && object.backgroundColor !== null) {
      message.backgroundColor = String(object.backgroundColor);
    } else {
      message.backgroundColor = undefined;
    }
    return message;
  },

  toJSON(message: TableCellData_CellStyle): unknown {
    const obj: any = {};
    message.verticalAlignment !== undefined &&
      (obj.verticalAlignment = tableCellData_VerticalAlignmentToJSON(message.verticalAlignment));
    message.backgroundColor !== undefined && (obj.backgroundColor = message.backgroundColor);
    return obj;
  },
};

const baseTableCellData_BorderColors: object = {};

export const TableCellData_BorderColors = {
  fromJSON(object: any): TableCellData_BorderColors {
    const message = { ...baseTableCellData_BorderColors } as TableCellData_BorderColors;
    if (object.left !== undefined && object.left !== null) {
      message.left = String(object.left);
    } else {
      message.left = undefined;
    }
    if (object.right !== undefined && object.right !== null) {
      message.right = String(object.right);
    } else {
      message.right = undefined;
    }
    if (object.top !== undefined && object.top !== null) {
      message.top = String(object.top);
    } else {
      message.top = undefined;
    }
    if (object.bottom !== undefined && object.bottom !== null) {
      message.bottom = String(object.bottom);
    } else {
      message.bottom = undefined;
    }
    return message;
  },

  toJSON(message: TableCellData_BorderColors): unknown {
    const obj: any = {};
    message.left !== undefined && (obj.left = message.left);
    message.right !== undefined && (obj.right = message.right);
    message.top !== undefined && (obj.top = message.top);
    message.bottom !== undefined && (obj.bottom = message.bottom);
    return obj;
  },
};
