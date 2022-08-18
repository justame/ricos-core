/* eslint-disable */
import { Media } from './common';

export interface AppEmbedData {
  type: AppEmbedData_AppType;
  itemId?: string;
  name?: string;
  /**
   * TODO: use image.src.url instead
   *
   * @deprecated
   */
  imageSrc?: string;
  url?: string;
  image?: Media;
  bookingData?: AppEmbedData_BookingData | undefined;
  eventData?: AppEmbedData_EventData | undefined;
}

export const enum AppEmbedData_AppType {
  PRODUCT = 0,
  EVENT = 1,
  BOOKING = 2,
  UNRECOGNIZED = -1,
}

export function appEmbedData_AppTypeFromJSON(object: any): AppEmbedData_AppType {
  switch (object) {
    case 0:
    case 'PRODUCT':
      return AppEmbedData_AppType.PRODUCT;
    case 1:
    case 'EVENT':
      return AppEmbedData_AppType.EVENT;
    case 2:
    case 'BOOKING':
      return AppEmbedData_AppType.BOOKING;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return AppEmbedData_AppType.UNRECOGNIZED;
  }
}

export function appEmbedData_AppTypeToJSON(object: AppEmbedData_AppType): string {
  switch (object) {
    case AppEmbedData_AppType.PRODUCT:
      return 'PRODUCT';
    case AppEmbedData_AppType.EVENT:
      return 'EVENT';
    case AppEmbedData_AppType.BOOKING:
      return 'BOOKING';
    default:
      return 'UNKNOWN';
  }
}

export interface AppEmbedData_BookingData {
  durations?: string;
}

export interface AppEmbedData_EventData {
  scheduling?: string;
  location?: string;
}

const baseAppEmbedData: object = { type: 0 };

export const AppEmbedData = {
  fromJSON(object: any): AppEmbedData {
    const message = { ...baseAppEmbedData } as AppEmbedData;
    if (object.type !== undefined && object.type !== null) {
      message.type = appEmbedData_AppTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.itemId !== undefined && object.itemId !== null) {
      message.itemId = String(object.itemId);
    } else {
      message.itemId = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = undefined;
    }
    if (object.imageSrc !== undefined && object.imageSrc !== null) {
      message.imageSrc = String(object.imageSrc);
    } else {
      message.imageSrc = undefined;
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = Media.fromJSON(object.image);
    } else {
      message.image = undefined;
    }
    if (object.bookingData !== undefined && object.bookingData !== null) {
      message.bookingData = AppEmbedData_BookingData.fromJSON(object.bookingData);
    } else {
      message.bookingData = undefined;
    }
    if (object.eventData !== undefined && object.eventData !== null) {
      message.eventData = AppEmbedData_EventData.fromJSON(object.eventData);
    } else {
      message.eventData = undefined;
    }
    return message;
  },

  toJSON(message: AppEmbedData): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = appEmbedData_AppTypeToJSON(message.type));
    message.itemId !== undefined && (obj.itemId = message.itemId);
    message.name !== undefined && (obj.name = message.name);
    message.imageSrc !== undefined && (obj.imageSrc = message.imageSrc);
    message.url !== undefined && (obj.url = message.url);
    message.image !== undefined &&
      (obj.image = message.image ? Media.toJSON(message.image) : undefined);
    message.bookingData !== undefined &&
      (obj.bookingData = message.bookingData
        ? AppEmbedData_BookingData.toJSON(message.bookingData)
        : undefined);
    message.eventData !== undefined &&
      (obj.eventData = message.eventData
        ? AppEmbedData_EventData.toJSON(message.eventData)
        : undefined);
    return obj;
  },
};

const baseAppEmbedData_BookingData: object = {};

export const AppEmbedData_BookingData = {
  fromJSON(object: any): AppEmbedData_BookingData {
    const message = { ...baseAppEmbedData_BookingData } as AppEmbedData_BookingData;
    if (object.durations !== undefined && object.durations !== null) {
      message.durations = String(object.durations);
    } else {
      message.durations = undefined;
    }
    return message;
  },

  toJSON(message: AppEmbedData_BookingData): unknown {
    const obj: any = {};
    message.durations !== undefined && (obj.durations = message.durations);
    return obj;
  },
};

const baseAppEmbedData_EventData: object = {};

export const AppEmbedData_EventData = {
  fromJSON(object: any): AppEmbedData_EventData {
    const message = { ...baseAppEmbedData_EventData } as AppEmbedData_EventData;
    if (object.scheduling !== undefined && object.scheduling !== null) {
      message.scheduling = String(object.scheduling);
    } else {
      message.scheduling = undefined;
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = String(object.location);
    } else {
      message.location = undefined;
    }
    return message;
  },

  toJSON(message: AppEmbedData_EventData): unknown {
    const obj: any = {};
    message.scheduling !== undefined && (obj.scheduling = message.scheduling);
    message.location !== undefined && (obj.location = message.location);
    return obj;
  },
};
