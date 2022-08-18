/* eslint-disable */
import { PluginContainerData } from './common';

export const enum MapType {
  ROADMAP = 0,
  SATELITE = 1,
  HYBRID = 2,
  TERRAIN = 3,
  UNRECOGNIZED = -1,
}

export function mapTypeFromJSON(object: any): MapType {
  switch (object) {
    case 0:
    case 'ROADMAP':
      return MapType.ROADMAP;
    case 1:
    case 'SATELITE':
      return MapType.SATELITE;
    case 2:
    case 'HYBRID':
      return MapType.HYBRID;
    case 3:
    case 'TERRAIN':
      return MapType.TERRAIN;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return MapType.UNRECOGNIZED;
  }
}

export function mapTypeToJSON(object: MapType): string {
  switch (object) {
    case MapType.ROADMAP:
      return 'ROADMAP';
    case MapType.SATELITE:
      return 'SATELITE';
    case MapType.HYBRID:
      return 'HYBRID';
    case MapType.TERRAIN:
      return 'TERRAIN';
    default:
      return 'UNKNOWN';
  }
}

export interface MapData {
  containerData?: PluginContainerData;
  mapSettings?: MapSettings;
}

export interface MapSettings {
  address?: string;
  draggable?: boolean;
  /** Visibilty of marker */
  marker?: boolean;
  /** Visibilty of street view control */
  streetViewControl?: boolean;
  /** Visibilty of zoom control */
  zoomControl?: boolean;
  /** latitude */
  lat?: number;
  /** longitude */
  lng?: number;
  locationName?: string;
  /** Visibilty of view mode control */
  viewModeControl?: boolean;
  initialZoom?: number;
  mapType: MapType;
}

const baseMapData: object = {};

export const MapData = {
  fromJSON(object: any): MapData {
    const message = { ...baseMapData } as MapData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.mapSettings !== undefined && object.mapSettings !== null) {
      message.mapSettings = MapSettings.fromJSON(object.mapSettings);
    } else {
      message.mapSettings = undefined;
    }
    return message;
  },

  toJSON(message: MapData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.mapSettings !== undefined &&
      (obj.mapSettings = message.mapSettings ? MapSettings.toJSON(message.mapSettings) : undefined);
    return obj;
  },
};

const baseMapSettings: object = { mapType: 0 };

export const MapSettings = {
  fromJSON(object: any): MapSettings {
    const message = { ...baseMapSettings } as MapSettings;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = undefined;
    }
    if (object.draggable !== undefined && object.draggable !== null) {
      message.draggable = Boolean(object.draggable);
    } else {
      message.draggable = undefined;
    }
    if (object.marker !== undefined && object.marker !== null) {
      message.marker = Boolean(object.marker);
    } else {
      message.marker = undefined;
    }
    if (object.streetViewControl !== undefined && object.streetViewControl !== null) {
      message.streetViewControl = Boolean(object.streetViewControl);
    } else {
      message.streetViewControl = undefined;
    }
    if (object.zoomControl !== undefined && object.zoomControl !== null) {
      message.zoomControl = Boolean(object.zoomControl);
    } else {
      message.zoomControl = undefined;
    }
    if (object.lat !== undefined && object.lat !== null) {
      message.lat = Number(object.lat);
    } else {
      message.lat = undefined;
    }
    if (object.lng !== undefined && object.lng !== null) {
      message.lng = Number(object.lng);
    } else {
      message.lng = undefined;
    }
    if (object.locationName !== undefined && object.locationName !== null) {
      message.locationName = String(object.locationName);
    } else {
      message.locationName = undefined;
    }
    if (object.viewModeControl !== undefined && object.viewModeControl !== null) {
      message.viewModeControl = Boolean(object.viewModeControl);
    } else {
      message.viewModeControl = undefined;
    }
    if (object.initialZoom !== undefined && object.initialZoom !== null) {
      message.initialZoom = Number(object.initialZoom);
    } else {
      message.initialZoom = undefined;
    }
    if (object.mapType !== undefined && object.mapType !== null) {
      message.mapType = mapTypeFromJSON(object.mapType);
    } else {
      message.mapType = 0;
    }
    return message;
  },

  toJSON(message: MapSettings): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.draggable !== undefined && (obj.draggable = message.draggable);
    message.marker !== undefined && (obj.marker = message.marker);
    message.streetViewControl !== undefined && (obj.streetViewControl = message.streetViewControl);
    message.zoomControl !== undefined && (obj.zoomControl = message.zoomControl);
    message.lat !== undefined && (obj.lat = message.lat);
    message.lng !== undefined && (obj.lng = message.lng);
    message.locationName !== undefined && (obj.locationName = message.locationName);
    message.viewModeControl !== undefined && (obj.viewModeControl = message.viewModeControl);
    message.initialZoom !== undefined && (obj.initialZoom = message.initialZoom);
    message.mapType !== undefined && (obj.mapType = mapTypeToJSON(message.mapType));
    return obj;
  },
};
