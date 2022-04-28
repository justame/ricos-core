import { isString } from 'lodash';
import { firstRight } from '../../fp-utils';
import type { AddImageParams, ImageElement, OriginalAddImageParams } from '../types';
import type { ImageData } from 'ricos-schema';

// https://www.wix.com/velo/reference/$w/image/src
const imageElementRegex = /^wix:image:\/\/v1\/(.+)\/(.+)#originWidth=(\d+)&originHeight=(\d+)/i;
const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g;

const parseImageElement = (data: ImageElement) => {
  const vars = imageElementRegex.exec(data.src);
  if (typeof data.src !== 'string' || vars === null) {
    throw new Error('Source format is invalid. Received:\n' + JSON.stringify(data));
  }
  const { alt } = data;
  const [, uri, fileName, originWidth, originHeight] = vars;
  return { uri, fileName, width: parseInt(originWidth), height: parseInt(originHeight), alt };
};

function isImageElement(data: AddImageParams['data']): data is ImageElement {
  return !!data && !isString(data) && !!Object.keys(data).includes('src');
}

const asPublicUrl: (data: string) => Partial<ImageData> = data => ({
  image: { src: { url: data } },
});

const asImageElement: (data: ImageElement) => Partial<ImageData> = data => {
  if (data.src.match(urlRegex)) {
    return { image: { src: { url: data.src } } };
  }
  const { width, height, uri: id, alt } = parseImageElement(data);
  return { altText: alt, image: { src: { id }, width, height } };
};

export const toImageData: (data: AddImageParams['data']) => Partial<ImageData> = data =>
  firstRight(data, data as Partial<ImageData>, [
    [isString, asPublicUrl],
    [isImageElement, asImageElement],
  ]);

// builder-old.ts
export const addImage: (params?: AddImageParams) => Omit<OriginalAddImageParams, 'content'> = ({
  data,
  ...rest
} = {}) => ({
  data: toImageData(data),
  ...rest,
});

// builder.ts
export const createImageData: (
  data: AddImageParams['data']
) => OriginalAddImageParams['data'] = data => toImageData(data);
