/* eslint-disable */
import { PluginContainerData } from './common';

export interface TableData {
  containerData?: PluginContainerData;
  dimensions?: TableData_Dimensions;
  /** Deprecated - Changed to rowHeader and columnHeader */
  header?: boolean;
  rowHeader?: boolean;
  columnHeader?: boolean;
}

export interface TableData_Dimensions {
  colsWidthRatio: number[];
  rowsHeight: number[];
  colsMinWidth: number[];
}

const baseTableData: object = {};

export const TableData = {
  fromJSON(object: any): TableData {
    const message = { ...baseTableData } as TableData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.dimensions !== undefined && object.dimensions !== null) {
      message.dimensions = TableData_Dimensions.fromJSON(object.dimensions);
    } else {
      message.dimensions = undefined;
    }
    if (object.header !== undefined && object.header !== null) {
      message.header = Boolean(object.header);
    } else {
      message.header = undefined;
    }
    if (object.rowHeader !== undefined && object.rowHeader !== null) {
      message.rowHeader = Boolean(object.rowHeader);
    } else {
      message.rowHeader = undefined;
    }
    if (object.columnHeader !== undefined && object.columnHeader !== null) {
      message.columnHeader = Boolean(object.columnHeader);
    } else {
      message.columnHeader = undefined;
    }
    return message;
  },

  toJSON(message: TableData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.dimensions !== undefined &&
      (obj.dimensions = message.dimensions
        ? TableData_Dimensions.toJSON(message.dimensions)
        : undefined);
    message.header !== undefined && (obj.header = message.header);
    message.rowHeader !== undefined && (obj.rowHeader = message.rowHeader);
    message.columnHeader !== undefined && (obj.columnHeader = message.columnHeader);
    return obj;
  },
};

const baseTableData_Dimensions: object = { colsWidthRatio: 0, rowsHeight: 0, colsMinWidth: 0 };

export const TableData_Dimensions = {
  fromJSON(object: any): TableData_Dimensions {
    const message = { ...baseTableData_Dimensions } as TableData_Dimensions;
    message.colsWidthRatio = [];
    message.rowsHeight = [];
    message.colsMinWidth = [];
    if (object.colsWidthRatio !== undefined && object.colsWidthRatio !== null) {
      for (const e of object.colsWidthRatio) {
        message.colsWidthRatio.push(Number(e));
      }
    }
    if (object.rowsHeight !== undefined && object.rowsHeight !== null) {
      for (const e of object.rowsHeight) {
        message.rowsHeight.push(Number(e));
      }
    }
    if (object.colsMinWidth !== undefined && object.colsMinWidth !== null) {
      for (const e of object.colsMinWidth) {
        message.colsMinWidth.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: TableData_Dimensions): unknown {
    const obj: any = {};
    if (message.colsWidthRatio) {
      obj.colsWidthRatio = message.colsWidthRatio.map(e => e);
    } else {
      obj.colsWidthRatio = [];
    }
    if (message.rowsHeight) {
      obj.rowsHeight = message.rowsHeight.map(e => e);
    } else {
      obj.rowsHeight = [];
    }
    if (message.colsMinWidth) {
      obj.colsMinWidth = message.colsMinWidth.map(e => e);
    } else {
      obj.colsMinWidth = [];
    }
    return obj;
  },
};
