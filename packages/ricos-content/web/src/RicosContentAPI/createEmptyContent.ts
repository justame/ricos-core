import type { RichContent } from 'ricos-schema';
import { initializeMetadata } from '../converters/nodeUtils';

type EmptyContentCreator = (metadata?: Parameters<typeof initializeMetadata>[0]) => RichContent;

/**
 * Initializes an empty `RichContent` object
 * @param metadata Optional metadata params
 * @returns Empty `RichContent` object
 */
export const createEmptyContent: EmptyContentCreator = metadata => ({
  nodes: [],
  metadata: initializeMetadata(metadata),
});
