/* eslint-disable */
import { PluginContainerData, Media, Link } from './common';

export interface GalleryOptions {
  layout?: GalleryOptions_Layout;
  item?: GalleryOptions_ItemStyle;
  thumbnails?: GalleryOptions_Thumbnails;
}

export interface GalleryOptions_Layout {
  type: GalleryOptions_Layout_Type;
  horizontalScroll?: boolean;
  orientation: GalleryOptions_Layout_Orientation;
  numberOfColumns?: number;
  mobileNumberOfColumns?: number;
}

export const enum GalleryOptions_Layout_Type {
  COLLAGE = 'COLLAGE',
  MASONRY = 'MASONRY',
  GRID = 'GRID',
  THUMBNAIL = 'THUMBNAIL',
  SLIDER = 'SLIDER',
  SLIDESHOW = 'SLIDESHOW',
  PANORAMA = 'PANORAMA',
  COLUMN = 'COLUMN',
  MAGIC = 'MAGIC',
  FULLSIZE = 'FULLSIZE',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function galleryOptions_Layout_TypeFromJSON(object: any): GalleryOptions_Layout_Type {
  switch (object) {
    case 0:
    case 'COLLAGE':
      return GalleryOptions_Layout_Type.COLLAGE;
    case 1:
    case 'MASONRY':
      return GalleryOptions_Layout_Type.MASONRY;
    case 2:
    case 'GRID':
      return GalleryOptions_Layout_Type.GRID;
    case 3:
    case 'THUMBNAIL':
      return GalleryOptions_Layout_Type.THUMBNAIL;
    case 4:
    case 'SLIDER':
      return GalleryOptions_Layout_Type.SLIDER;
    case 5:
    case 'SLIDESHOW':
      return GalleryOptions_Layout_Type.SLIDESHOW;
    case 6:
    case 'PANORAMA':
      return GalleryOptions_Layout_Type.PANORAMA;
    case 7:
    case 'COLUMN':
      return GalleryOptions_Layout_Type.COLUMN;
    case 8:
    case 'MAGIC':
      return GalleryOptions_Layout_Type.MAGIC;
    case 9:
    case 'FULLSIZE':
      return GalleryOptions_Layout_Type.FULLSIZE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return GalleryOptions_Layout_Type.UNRECOGNIZED;
  }
}

export function galleryOptions_Layout_TypeToJSON(object: GalleryOptions_Layout_Type): string {
  switch (object) {
    case GalleryOptions_Layout_Type.COLLAGE:
      return 'COLLAGE';
    case GalleryOptions_Layout_Type.MASONRY:
      return 'MASONRY';
    case GalleryOptions_Layout_Type.GRID:
      return 'GRID';
    case GalleryOptions_Layout_Type.THUMBNAIL:
      return 'THUMBNAIL';
    case GalleryOptions_Layout_Type.SLIDER:
      return 'SLIDER';
    case GalleryOptions_Layout_Type.SLIDESHOW:
      return 'SLIDESHOW';
    case GalleryOptions_Layout_Type.PANORAMA:
      return 'PANORAMA';
    case GalleryOptions_Layout_Type.COLUMN:
      return 'COLUMN';
    case GalleryOptions_Layout_Type.MAGIC:
      return 'MAGIC';
    case GalleryOptions_Layout_Type.FULLSIZE:
      return 'FULLSIZE';
    default:
      return 'UNKNOWN';
  }
}

export const enum GalleryOptions_Layout_Orientation {
  ROWS = 'ROWS',
  COLUMNS = 'COLUMNS',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function galleryOptions_Layout_OrientationFromJSON(
  object: any
): GalleryOptions_Layout_Orientation {
  switch (object) {
    case 0:
    case 'ROWS':
      return GalleryOptions_Layout_Orientation.ROWS;
    case 1:
    case 'COLUMNS':
      return GalleryOptions_Layout_Orientation.COLUMNS;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return GalleryOptions_Layout_Orientation.UNRECOGNIZED;
  }
}

export function galleryOptions_Layout_OrientationToJSON(
  object: GalleryOptions_Layout_Orientation
): string {
  switch (object) {
    case GalleryOptions_Layout_Orientation.ROWS:
      return 'ROWS';
    case GalleryOptions_Layout_Orientation.COLUMNS:
      return 'COLUMNS';
    default:
      return 'UNKNOWN';
  }
}

export interface GalleryOptions_ItemStyle {
  targetSize?: number;
  ratio?: number;
  crop: GalleryOptions_ItemStyle_Crop;
  spacing?: number;
}

export const enum GalleryOptions_ItemStyle_Crop {
  FILL = 'FILL',
  FIT = 'FIT',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function galleryOptions_ItemStyle_CropFromJSON(object: any): GalleryOptions_ItemStyle_Crop {
  switch (object) {
    case 0:
    case 'FILL':
      return GalleryOptions_ItemStyle_Crop.FILL;
    case 1:
    case 'FIT':
      return GalleryOptions_ItemStyle_Crop.FIT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return GalleryOptions_ItemStyle_Crop.UNRECOGNIZED;
  }
}

export function galleryOptions_ItemStyle_CropToJSON(object: GalleryOptions_ItemStyle_Crop): string {
  switch (object) {
    case GalleryOptions_ItemStyle_Crop.FILL:
      return 'FILL';
    case GalleryOptions_ItemStyle_Crop.FIT:
      return 'FIT';
    default:
      return 'UNKNOWN';
  }
}

export interface GalleryOptions_Thumbnails {
  placement: GalleryOptions_Thumbnails_Alignment;
  spacing?: number;
}

export const enum GalleryOptions_Thumbnails_Alignment {
  TOP = 'TOP',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  NONE = 'NONE',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function galleryOptions_Thumbnails_AlignmentFromJSON(
  object: any
): GalleryOptions_Thumbnails_Alignment {
  switch (object) {
    case 0:
    case 'TOP':
      return GalleryOptions_Thumbnails_Alignment.TOP;
    case 1:
    case 'RIGHT':
      return GalleryOptions_Thumbnails_Alignment.RIGHT;
    case 2:
    case 'BOTTOM':
      return GalleryOptions_Thumbnails_Alignment.BOTTOM;
    case 3:
    case 'LEFT':
      return GalleryOptions_Thumbnails_Alignment.LEFT;
    case 4:
    case 'NONE':
      return GalleryOptions_Thumbnails_Alignment.NONE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return GalleryOptions_Thumbnails_Alignment.UNRECOGNIZED;
  }
}

export function galleryOptions_Thumbnails_AlignmentToJSON(
  object: GalleryOptions_Thumbnails_Alignment
): string {
  switch (object) {
    case GalleryOptions_Thumbnails_Alignment.TOP:
      return 'TOP';
    case GalleryOptions_Thumbnails_Alignment.RIGHT:
      return 'RIGHT';
    case GalleryOptions_Thumbnails_Alignment.BOTTOM:
      return 'BOTTOM';
    case GalleryOptions_Thumbnails_Alignment.LEFT:
      return 'LEFT';
    case GalleryOptions_Thumbnails_Alignment.NONE:
      return 'NONE';
    default:
      return 'UNKNOWN';
  }
}

export interface GalleryData {
  containerData?: PluginContainerData;
  items: GalleryData_Item[];
  options?: GalleryOptions;
  disableExpand?: boolean;
  disableDownload?: boolean;
}

export interface GalleryData_Item {
  image?: GalleryData_Item_Image | undefined;
  video?: GalleryData_Item_Video | undefined;
  title?: string;
  altText?: string;
}

export interface GalleryData_Item_Video {
  media?: Media;
  thumbnail?: Media;
}

export interface GalleryData_Item_Image {
  media?: Media;
  link?: Link;
}

const baseGalleryOptions: object = {};

export const GalleryOptions = {
  fromJSON(object: any): GalleryOptions {
    const message = { ...baseGalleryOptions } as GalleryOptions;
    if (object.layout !== undefined && object.layout !== null) {
      message.layout = GalleryOptions_Layout.fromJSON(object.layout);
    } else {
      message.layout = undefined;
    }
    if (object.item !== undefined && object.item !== null) {
      message.item = GalleryOptions_ItemStyle.fromJSON(object.item);
    } else {
      message.item = undefined;
    }
    if (object.thumbnails !== undefined && object.thumbnails !== null) {
      message.thumbnails = GalleryOptions_Thumbnails.fromJSON(object.thumbnails);
    } else {
      message.thumbnails = undefined;
    }
    return message;
  },

  toJSON(message: GalleryOptions): unknown {
    const obj: any = {};
    message.layout !== undefined &&
      (obj.layout = message.layout ? GalleryOptions_Layout.toJSON(message.layout) : undefined);
    message.item !== undefined &&
      (obj.item = message.item ? GalleryOptions_ItemStyle.toJSON(message.item) : undefined);
    message.thumbnails !== undefined &&
      (obj.thumbnails = message.thumbnails
        ? GalleryOptions_Thumbnails.toJSON(message.thumbnails)
        : undefined);
    return obj;
  },
};

const baseGalleryOptions_Layout: object = {
  type: GalleryOptions_Layout_Type.COLLAGE,
  orientation: GalleryOptions_Layout_Orientation.ROWS,
};

export const GalleryOptions_Layout = {
  fromJSON(object: any): GalleryOptions_Layout {
    const message = { ...baseGalleryOptions_Layout } as GalleryOptions_Layout;
    if (object.type !== undefined && object.type !== null) {
      message.type = galleryOptions_Layout_TypeFromJSON(object.type);
    } else {
      message.type = GalleryOptions_Layout_Type.COLLAGE;
    }
    if (object.horizontalScroll !== undefined && object.horizontalScroll !== null) {
      message.horizontalScroll = Boolean(object.horizontalScroll);
    } else {
      message.horizontalScroll = undefined;
    }
    if (object.orientation !== undefined && object.orientation !== null) {
      message.orientation = galleryOptions_Layout_OrientationFromJSON(object.orientation);
    } else {
      message.orientation = GalleryOptions_Layout_Orientation.ROWS;
    }
    if (object.numberOfColumns !== undefined && object.numberOfColumns !== null) {
      message.numberOfColumns = Number(object.numberOfColumns);
    } else {
      message.numberOfColumns = undefined;
    }
    if (object.mobileNumberOfColumns !== undefined && object.mobileNumberOfColumns !== null) {
      message.mobileNumberOfColumns = Number(object.mobileNumberOfColumns);
    } else {
      message.mobileNumberOfColumns = undefined;
    }
    return message;
  },

  toJSON(message: GalleryOptions_Layout): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = galleryOptions_Layout_TypeToJSON(message.type));
    message.horizontalScroll !== undefined && (obj.horizontalScroll = message.horizontalScroll);
    message.orientation !== undefined &&
      (obj.orientation = galleryOptions_Layout_OrientationToJSON(message.orientation));
    message.numberOfColumns !== undefined && (obj.numberOfColumns = message.numberOfColumns);
    message.mobileNumberOfColumns !== undefined &&
      (obj.mobileNumberOfColumns = message.mobileNumberOfColumns);
    return obj;
  },
};

const baseGalleryOptions_ItemStyle: object = { crop: GalleryOptions_ItemStyle_Crop.FILL };

export const GalleryOptions_ItemStyle = {
  fromJSON(object: any): GalleryOptions_ItemStyle {
    const message = { ...baseGalleryOptions_ItemStyle } as GalleryOptions_ItemStyle;
    if (object.targetSize !== undefined && object.targetSize !== null) {
      message.targetSize = Number(object.targetSize);
    } else {
      message.targetSize = undefined;
    }
    if (object.ratio !== undefined && object.ratio !== null) {
      message.ratio = Number(object.ratio);
    } else {
      message.ratio = undefined;
    }
    if (object.crop !== undefined && object.crop !== null) {
      message.crop = galleryOptions_ItemStyle_CropFromJSON(object.crop);
    } else {
      message.crop = GalleryOptions_ItemStyle_Crop.FILL;
    }
    if (object.spacing !== undefined && object.spacing !== null) {
      message.spacing = Number(object.spacing);
    } else {
      message.spacing = undefined;
    }
    return message;
  },

  toJSON(message: GalleryOptions_ItemStyle): unknown {
    const obj: any = {};
    message.targetSize !== undefined && (obj.targetSize = message.targetSize);
    message.ratio !== undefined && (obj.ratio = message.ratio);
    message.crop !== undefined && (obj.crop = galleryOptions_ItemStyle_CropToJSON(message.crop));
    message.spacing !== undefined && (obj.spacing = message.spacing);
    return obj;
  },
};

const baseGalleryOptions_Thumbnails: object = {
  placement: GalleryOptions_Thumbnails_Alignment.TOP,
};

export const GalleryOptions_Thumbnails = {
  fromJSON(object: any): GalleryOptions_Thumbnails {
    const message = { ...baseGalleryOptions_Thumbnails } as GalleryOptions_Thumbnails;
    if (object.placement !== undefined && object.placement !== null) {
      message.placement = galleryOptions_Thumbnails_AlignmentFromJSON(object.placement);
    } else {
      message.placement = GalleryOptions_Thumbnails_Alignment.TOP;
    }
    if (object.spacing !== undefined && object.spacing !== null) {
      message.spacing = Number(object.spacing);
    } else {
      message.spacing = undefined;
    }
    return message;
  },

  toJSON(message: GalleryOptions_Thumbnails): unknown {
    const obj: any = {};
    message.placement !== undefined &&
      (obj.placement = galleryOptions_Thumbnails_AlignmentToJSON(message.placement));
    message.spacing !== undefined && (obj.spacing = message.spacing);
    return obj;
  },
};

const baseGalleryData: object = {};

export const GalleryData = {
  fromJSON(object: any): GalleryData {
    const message = { ...baseGalleryData } as GalleryData;
    message.items = [];
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.items !== undefined && object.items !== null) {
      for (const e of object.items) {
        message.items.push(GalleryData_Item.fromJSON(e));
      }
    }
    if (object.options !== undefined && object.options !== null) {
      message.options = GalleryOptions.fromJSON(object.options);
    } else {
      message.options = undefined;
    }
    if (object.disableExpand !== undefined && object.disableExpand !== null) {
      message.disableExpand = Boolean(object.disableExpand);
    } else {
      message.disableExpand = undefined;
    }
    if (object.disableDownload !== undefined && object.disableDownload !== null) {
      message.disableDownload = Boolean(object.disableDownload);
    } else {
      message.disableDownload = undefined;
    }
    return message;
  },

  toJSON(message: GalleryData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    if (message.items) {
      obj.items = message.items.map(e => (e ? GalleryData_Item.toJSON(e) : undefined));
    } else {
      obj.items = [];
    }
    message.options !== undefined &&
      (obj.options = message.options ? GalleryOptions.toJSON(message.options) : undefined);
    message.disableExpand !== undefined && (obj.disableExpand = message.disableExpand);
    message.disableDownload !== undefined && (obj.disableDownload = message.disableDownload);
    return obj;
  },
};

const baseGalleryData_Item: object = {};

export const GalleryData_Item = {
  fromJSON(object: any): GalleryData_Item {
    const message = { ...baseGalleryData_Item } as GalleryData_Item;
    if (object.image !== undefined && object.image !== null) {
      message.image = GalleryData_Item_Image.fromJSON(object.image);
    } else {
      message.image = undefined;
    }
    if (object.video !== undefined && object.video !== null) {
      message.video = GalleryData_Item_Video.fromJSON(object.video);
    } else {
      message.video = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    if (object.altText !== undefined && object.altText !== null) {
      message.altText = String(object.altText);
    } else {
      message.altText = undefined;
    }
    return message;
  },

  toJSON(message: GalleryData_Item): unknown {
    const obj: any = {};
    message.image !== undefined &&
      (obj.image = message.image ? GalleryData_Item_Image.toJSON(message.image) : undefined);
    message.video !== undefined &&
      (obj.video = message.video ? GalleryData_Item_Video.toJSON(message.video) : undefined);
    message.title !== undefined && (obj.title = message.title);
    message.altText !== undefined && (obj.altText = message.altText);
    return obj;
  },
};

const baseGalleryData_Item_Video: object = {};

export const GalleryData_Item_Video = {
  fromJSON(object: any): GalleryData_Item_Video {
    const message = { ...baseGalleryData_Item_Video } as GalleryData_Item_Video;
    if (object.media !== undefined && object.media !== null) {
      message.media = Media.fromJSON(object.media);
    } else {
      message.media = undefined;
    }
    if (object.thumbnail !== undefined && object.thumbnail !== null) {
      message.thumbnail = Media.fromJSON(object.thumbnail);
    } else {
      message.thumbnail = undefined;
    }
    return message;
  },

  toJSON(message: GalleryData_Item_Video): unknown {
    const obj: any = {};
    message.media !== undefined &&
      (obj.media = message.media ? Media.toJSON(message.media) : undefined);
    message.thumbnail !== undefined &&
      (obj.thumbnail = message.thumbnail ? Media.toJSON(message.thumbnail) : undefined);
    return obj;
  },
};

const baseGalleryData_Item_Image: object = {};

export const GalleryData_Item_Image = {
  fromJSON(object: any): GalleryData_Item_Image {
    const message = { ...baseGalleryData_Item_Image } as GalleryData_Item_Image;
    if (object.media !== undefined && object.media !== null) {
      message.media = Media.fromJSON(object.media);
    } else {
      message.media = undefined;
    }
    if (object.link !== undefined && object.link !== null) {
      message.link = Link.fromJSON(object.link);
    } else {
      message.link = undefined;
    }
    return message;
  },

  toJSON(message: GalleryData_Item_Image): unknown {
    const obj: any = {};
    message.media !== undefined &&
      (obj.media = message.media ? Media.toJSON(message.media) : undefined);
    message.link !== undefined && (obj.link = message.link ? Link.toJSON(message.link) : undefined);
    return obj;
  },
};
