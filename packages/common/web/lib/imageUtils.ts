import imageClientAPI from 'image-client-api/dist/imageClientSDK';
import type { ComponentData } from 'ricos-content';

const WIX_STATIC_URL = 'https://static.wixstatic.com';
const DEFAULT = {
  SIZE: 300,
  QUALITY: 5,
  TYPE: 'preload',
};

const PRELOAD = {
  WIDTH: 750,
  QUALITY: 20,
};

const IMAGE_SIZE = {
  small: 350,
  fullWidth: 940,
};

const resize = (w: number, h: number, rw: number, rh: number) => {
  if (rw > w && rh > h) {
    return { width: w, height: h };
  }
  return { width: rw, height: rh };
};

type Dimension = { w: number; h: number };
const ceilDimension = (dim: Dimension) => ({ w: Math.ceil(dim.w), h: Math.ceil(dim.h) });

const createUrl = (
  src: ComponentData['src'],
  rw?: number,
  rh?: number,
  rq?: number,
  type = DEFAULT.TYPE,
  size?: string,
  options?: {
    removeUsm?: boolean;
    encAutoImageUrls?: boolean;
  }
) => {
  if (type === 'preload') {
    return createPreloadUrl(src, rw, rh, rq, options?.encAutoImageUrls);
  }
  if (type === 'quailtyPreload') {
    return createQuailtyPreloadUrl(src, rw, rq, size, options?.encAutoImageUrls);
  }
  return createHiResUrl(src, rw, rh, rq, options?.removeUsm);
};

const createPreloadUrl = (
  { file_name: fileName, width: w, height: h }: ComponentData['src'] = {},
  rw = DEFAULT.SIZE,
  rh = DEFAULT.SIZE,
  rq = DEFAULT.QUALITY,
  encAutoImageUrls
) => {
  if (fileName) {
    const { width, height } = resize(w, h, rw, rh);
    const H = Math.ceil(height); //make sure no sterching will occur
    const W = Math.ceil(width);
    const format = getImageFormat(fileName);
    const params = `w_${W},h_${H},al_c,q_${rq}${encAutoImageUrls ? ',enc_auto' : ''}`;
    return `${WIX_STATIC_URL}/media/${fileName}/v1/fit/${params}/file${format}`;
  }
  return undefined;
};

const createQuailtyPreloadUrl = (
  { file_name: fileName, width: w, height: h }: ComponentData['src'] = {},
  rw,
  rq = PRELOAD.QUALITY,
  size,
  encAutoImageUrls
) => {
  if (fileName) {
    const width = rw || IMAGE_SIZE[size] || PRELOAD.WIDTH;
    const minW = Math.min(width, w);
    const ratio = h / w;
    const tDim: Dimension = ceilDimension({ w: minW, h: minW * ratio });
    const params = `w_${tDim.w},h_${tDim.h},al_c,q_${rq}${encAutoImageUrls ? ',enc_auto' : ''}`;
    return `${WIX_STATIC_URL}/media/${fileName}/v1/fit/${params}/file${getImageFormat(fileName)}`;
  }
  return '';
};

const createHiResUrl = (
  { file_name: fileName, width: w, height: h }: ComponentData['src'] = {},
  rw = DEFAULT.SIZE,
  rh = DEFAULT.SIZE,
  rq = DEFAULT.QUALITY,
  removeUsm = false
) =>
  fileName
    ? imageClientAPI.getScaleToFitImageURL(fileName, w, h, rw, rh, {
        quality: rq,
        ...(removeUsm && {
          unsharpMask: {
            amount: 0,
            radius: 0,
            threshold: 0,
          },
        }),
      })
    : '';

const getImageFormat = (fileName: string) => {
  const matches = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/i.exec(fileName);
  return matches ? matches[0] : '.jpg';
};

const getImageSrc = (
  src: ComponentData['src'],
  customGetImageUrl?: ({ file_name }: { file_name: string }) => string,
  options: {
    requiredWidth?: number;
    requiredHeight?: number;
    requiredQuality?: number;
    imageType?: string;
    removeUsm?: boolean;
    encAutoImageUrls?: boolean;
    size?: string;
  } = {}
) => {
  if (typeof src === 'object') {
    if (src.source) {
      if (src.source === 'static') {
        if (src.url) {
          return src.url;
        } else {
          console.error('must provide src url when using static image source!', src); //eslint-disable-line no-console
        }
      } else if (src.source === 'custom') {
        if (customGetImageUrl) {
          return customGetImageUrl({ file_name: src.file_name }); //eslint-disable-line camelcase
        } else {
          console.error('must provide getImageUrl helper when using custom image source!', src); //eslint-disable-line no-console
        }
      }
    } else if (src.file_name) {
      const url = createUrl(
        src,
        options.requiredWidth,
        options.requiredHeight,
        options.requiredQuality,
        options.imageType,
        options.size,
        {
          removeUsm: options.removeUsm,
          encAutoImageUrls: options.encAutoImageUrls,
        }
      );
      return url;
    }
  }

  return src;
};

const isPNG = (src?: ComponentData['src']): boolean => {
  if (!src || !src.file_name) {
    return false;
  }
  return /(.*)\.(png)$/.test(src.file_name);
};

function getMediaId(src: string) {
  try {
    const [, mediaId] = /media\/([^/]+)/.exec(src) as string[];
    return mediaId;
  } catch (error) {
    return src;
  }
}

function getScaleImageSrc(src: string, width: number, height: number) {
  const mediaId = getMediaId(src);

  try {
    return imageClientAPI.getScaleToFillImageURL(mediaId, null, null, width, height, {
      quality: 90,
    });
  } catch (error) {
    return src;
  }
}

export { isPNG, getImageSrc, getScaleImageSrc, DEFAULT as WIX_MEDIA_DEFAULT };
