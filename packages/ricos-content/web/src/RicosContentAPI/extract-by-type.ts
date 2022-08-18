import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import * as M from 'fp-ts/Monoid';
import { fromNullable } from 'fp-ts/Option';
import type { GalleryData, ImageData, Media, RichContent, VideoData } from '@justame-ricos/ricos-schema';
import { Node_Type } from '@justame-ricos/ricos-schema';
import { RICOS_NODE_TYPE_TO_DATA_FIELD } from '../consts';
import { extract } from './extract';

/**
 * Extracts textual portion of the provided content
 *
 * @param {RichContent} content the full content
 * @returns  {string[]} collection of text fragments
 */
export const getText = (content: RichContent): string[] =>
  extract(content.nodes)
    .map(({ textData }) => textData?.text || '')
    .get();

/**
 * Extracts data items of specified plugin type from the provided content
 *
 * @template T data item type
 * @param {RichContent} content the full content
 * @param {Node_Type} type desired plugin type
 * @returns {T[]} collection of data items
 */

export const getPluginData = <T>(content: RichContent, type: Node_Type): T[] =>
  extract(content.nodes)
    .map(node => node[RICOS_NODE_TYPE_TO_DATA_FIELD[type]])
    .get() as T[];

const MediaM = A.getMonoid<Media>();

/**
 * Extracts media data of images and videos from the provided content
 *
 * @param {RichContent} content the full content
 * @returns  {Media[]} media data
 */

export const getMedia = (content: RichContent): Media[] =>
  M.concatAll(MediaM)([
    pipe(
      getPluginData<ImageData>(content, Node_Type.IMAGE),
      A.map(({ image }) => image),
      A.map(fromNullable),
      A.compact
    ),
    pipe(
      getPluginData<VideoData>(content, Node_Type.VIDEO),
      A.map(({ video }) => video),
      A.map(fromNullable),
      A.compact
    ),
    pipe(
      getPluginData<GalleryData>(content, Node_Type.GALLERY),
      A.chain(({ items }) => items),
      A.map(({ image, video }) => image?.media || video?.media),
      A.map(fromNullable),
      A.compact
    ),
  ]);
