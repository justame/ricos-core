/* eslint-disable */
import { PluginContainerData, FileSource } from './common';

export interface FileData {
  containerData?: PluginContainerData;
  src?: FileSource;
  name?: string;
  type?: string;
  size?: number;
  pdfSettings?: FileData_PDFSettings;
  mimeType?: string;
  path?: string;
}

export interface FileData_PDFSettings {
  viewMode: FileData_PDFSettings_ViewMode;
  disableDownload?: boolean;
  disablePrint?: boolean;
}

export const enum FileData_PDFSettings_ViewMode {
  NONE = 0,
  FULL = 1,
  MINI = 2,
  UNRECOGNIZED = -1,
}

export function fileData_PDFSettings_ViewModeFromJSON(object: any): FileData_PDFSettings_ViewMode {
  switch (object) {
    case 0:
    case 'NONE':
      return FileData_PDFSettings_ViewMode.NONE;
    case 1:
    case 'FULL':
      return FileData_PDFSettings_ViewMode.FULL;
    case 2:
    case 'MINI':
      return FileData_PDFSettings_ViewMode.MINI;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return FileData_PDFSettings_ViewMode.UNRECOGNIZED;
  }
}

export function fileData_PDFSettings_ViewModeToJSON(object: FileData_PDFSettings_ViewMode): string {
  switch (object) {
    case FileData_PDFSettings_ViewMode.NONE:
      return 'NONE';
    case FileData_PDFSettings_ViewMode.FULL:
      return 'FULL';
    case FileData_PDFSettings_ViewMode.MINI:
      return 'MINI';
    default:
      return 'UNKNOWN';
  }
}

const baseFileData: object = {};

export const FileData = {
  fromJSON(object: any): FileData {
    const message = { ...baseFileData } as FileData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.src !== undefined && object.src !== null) {
      message.src = FileSource.fromJSON(object.src);
    } else {
      message.src = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = undefined;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = undefined;
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = Number(object.size);
    } else {
      message.size = undefined;
    }
    if (object.pdfSettings !== undefined && object.pdfSettings !== null) {
      message.pdfSettings = FileData_PDFSettings.fromJSON(object.pdfSettings);
    } else {
      message.pdfSettings = undefined;
    }
    if (object.mimeType !== undefined && object.mimeType !== null) {
      message.mimeType = String(object.mimeType);
    } else {
      message.mimeType = undefined;
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path);
    } else {
      message.path = undefined;
    }
    return message;
  },

  toJSON(message: FileData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.src !== undefined &&
      (obj.src = message.src ? FileSource.toJSON(message.src) : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type);
    message.size !== undefined && (obj.size = message.size);
    message.pdfSettings !== undefined &&
      (obj.pdfSettings = message.pdfSettings
        ? FileData_PDFSettings.toJSON(message.pdfSettings)
        : undefined);
    message.mimeType !== undefined && (obj.mimeType = message.mimeType);
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },
};

const baseFileData_PDFSettings: object = { viewMode: 0 };

export const FileData_PDFSettings = {
  fromJSON(object: any): FileData_PDFSettings {
    const message = { ...baseFileData_PDFSettings } as FileData_PDFSettings;
    if (object.viewMode !== undefined && object.viewMode !== null) {
      message.viewMode = fileData_PDFSettings_ViewModeFromJSON(object.viewMode);
    } else {
      message.viewMode = 0;
    }
    if (object.disableDownload !== undefined && object.disableDownload !== null) {
      message.disableDownload = Boolean(object.disableDownload);
    } else {
      message.disableDownload = undefined;
    }
    if (object.disablePrint !== undefined && object.disablePrint !== null) {
      message.disablePrint = Boolean(object.disablePrint);
    } else {
      message.disablePrint = undefined;
    }
    return message;
  },

  toJSON(message: FileData_PDFSettings): unknown {
    const obj: any = {};
    message.viewMode !== undefined &&
      (obj.viewMode = fileData_PDFSettings_ViewModeToJSON(message.viewMode));
    message.disableDownload !== undefined && (obj.disableDownload = message.disableDownload);
    message.disablePrint !== undefined && (obj.disablePrint = message.disablePrint);
    return obj;
  },
};
