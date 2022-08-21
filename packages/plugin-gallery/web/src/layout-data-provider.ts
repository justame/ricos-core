export enum GALLERY_LAYOUTS {
  EMPTY = -1,
  COLLAGE,
  MASONRY,
  GRID,
  THUMBNAIL,
  SLIDER,
  SLIDESHOW,
  PANORAMA,
  COLUMN,
  MAGIC,
  FULLSIZE,
  BRICKS,
  MIX,
  ALTERNATE,
}

export const layoutData = {
  [GALLERY_LAYOUTS.COLLAGE]: {
    isVertical: true,
    oneRow: false,
    galleryType: 'Columns',
    gallerySizePx: '300',
  },
  [GALLERY_LAYOUTS.MASONRY]: {
    numberOfImagesPerRow: 0,
    isVertical: false,
    gallerySizePx: '300',
  },
  [GALLERY_LAYOUTS.GRID]: {
    numberOfImagesPerRow: 3,
    cubeType: 'fill',
    cubeRatio: 1,
    isVertical: true,
    oneRow: false,
  },
  [GALLERY_LAYOUTS.THUMBNAIL]: {
    galleryThumbnailsAlignment: 'bottom',
    thumbnailSpacings: 5,
  },
  [GALLERY_LAYOUTS.SLIDER]: {
    cubeType: 'fit',
    cubeRatio: '16/9',
  },
  [GALLERY_LAYOUTS.SLIDESHOW]: {
    cubeType: 'fit',
  },
  [GALLERY_LAYOUTS.PANORAMA]: {
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
  },
  [GALLERY_LAYOUTS.COLUMN]: {
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
  },
  [GALLERY_LAYOUTS.FULLSIZE]: {
    cubeType: 'fill',
  },
};

export const layoutRicosData = {
  [GALLERY_LAYOUTS.COLLAGE]: {
    layout: {
      type: 'COLLAGE',
      orientation: 'COLUMNS',
      horizontalScroll: false,
    },
    item: {
      crop: 'FILL',
      targetSize: 300,
    },
    thumbnails: {
      placement: 'NONE',
    },
  },
  [GALLERY_LAYOUTS.MASONRY]: {
    layout: {
      type: 'MASONRY',
      orientation: 'ROWS',
      numberOfColumns: 0,
    },
    item: {
      crop: 'FILL',
      targetSize: 300,
    },
    thumbnails: {
      placement: 'NONE',
    },
  },
  [GALLERY_LAYOUTS.GRID]: {
    layout: {
      type: 'GRID',
      orientation: 'COLUMNS',
      horizontalScroll: false,
      numberOfColumns: 3,
    },
    item: {
      crop: 'FILL',
      ratio: 1,
    },
    thumbnails: {
      placement: 'NONE',
    },
  },
  [GALLERY_LAYOUTS.THUMBNAIL]: {
    layout: {
      type: 'THUMBNAIL',
      orientation: 'ROWS',
    },
    item: {
      crop: 'FILL',
    },
    thumbnails: {
      placement: 'BOTTOM',
      spacing: 10,
    },
  },
  [GALLERY_LAYOUTS.SLIDER]: {
    layout: {
      type: 'SLIDER',
      orientation: 'ROWS',
    },
    item: {
      crop: 'FIT',
      ratio: 16 / 9,
    },
    thumbnails: {
      placement: 'NONE',
    },
  },
  [GALLERY_LAYOUTS.SLIDESHOW]: {
    layout: {
      type: 'SLIDESHOW',
      orientation: 'ROWS',
    },
    item: {
      crop: 'FILL',
    },
    thumbnails: {
      placement: 'NONE',
    },
  },
  [GALLERY_LAYOUTS.PANORAMA]: {
    layout: {
      type: 'PANORAMA',
      orientation: 'ROWS',
    },
    item: {
      crop: 'FILL',
    },
    thumbnails: {
      placement: 'NONE',
    },
  },
  [GALLERY_LAYOUTS.COLUMN]: {
    layout: {
      type: 'COLUMN',
      orientation: 'ROWS',
    },
    item: {
      crop: 'FILL',
    },
    thumbnails: {
      placement: 'NONE',
    },
  },
  [GALLERY_LAYOUTS.FULLSIZE]: {
    layout: {
      type: 'FULLSIZE',
      orientation: 'ROWS',
    },
    item: {
      crop: 'FILL',
    },
    thumbnails: {
      placement: 'NONE',
    },
  },
};
