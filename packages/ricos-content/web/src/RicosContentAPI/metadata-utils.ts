import { cloneDeep } from 'lodash';
import { createEmptyContent } from './createEmptyContent';
import type { RichContent } from '@justame-ricos/ricos-schema';
import { v4 as uuid } from 'uuid';
import { initializeMetadata } from '../converters/nodeUtils';

const applyNewId = ({ metadata, ...rest }: RichContent): RichContent => ({
  ...rest,
  metadata: initializeMetadata({ ...(metadata || {}), id: uuid() }),
});

/**
 * Duplicates `RichContent` object, and assigning a newly generated `id`
 * @param content = `RichContent` object
 * @returns Cloned object with new `id`
 */
export const duplicate = (content: RichContent): RichContent => applyNewId(cloneDeep(content));

/**
 * Ensure that a given `RichContent` object contains an id
 * by generating one (if not exist) or leaving it as is (if it does).
 * If no content is provided, an empty content with a new id is generated.
 * @param content (optional) `RichContent` object
 * @returns `RichContent` object with `id`
 */
export const ensureContentId = (content?: RichContent) => {
  if (!content) {
    return createEmptyContent();
  }
  if (content.metadata?.id) {
    return content;
  }
  return applyNewId(content);
};

/**
 * Extract `id` from content. If not exists, returns `undefined`
 * @param content `RichContent` object
 * @returns `id`
 */
export const extractIdFromContent = (content: RichContent) => content.metadata?.id;
