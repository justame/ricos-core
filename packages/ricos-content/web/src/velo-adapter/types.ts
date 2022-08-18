import type { RichContent } from '@justame-ricos/ricos-schema';
import type { Overwrite } from 'utility-types';
import type { ContentBuilder } from '../types';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type OriginalAddImageParams = Parameters<ContentBuilder['addImage']>[0];

export interface ImageElement {
  src: string;
  alt?: string;
}

// TODO: modify `addImage.ts` file to work with the new pattern, and change this type
export type AddImageParams = Omit<
  Overwrite<
    OriginalAddImageParams,
    {
      data?: OriginalAddImageParams['data'] | ImageElement | string;
    }
  >,
  'content'
>;

// Old version of builder
export type ContentBuilderAdapterOld = {
  [key in keyof ContentBuilder]: (
    param?: Omit<Parameters<ContentBuilder[key]>[0], 'content'>
  ) => ContentBuilderAdapterOld;
} & {
  addImage: (params: AddImageParams) => ContentBuilderAdapterOld;
  get: () => RichContent;
};

export type CreateBuilderOld = (
  content: RichContent,
  callback?: (content: RichContent) => void
) => ContentBuilderAdapterOld;
