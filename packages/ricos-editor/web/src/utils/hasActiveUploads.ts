import type { EntityInstance, ContentState, ContentBlock } from 'draft-js';
import type { Iterable } from 'immutable';
import { IMAGE_TYPE, VIDEO_TYPE, FILE_UPLOAD_TYPE, GALLERY_TYPE } from 'wix-rich-content-common';

const isUploadingImage = (entity: EntityInstance) =>
  entity.getType() === IMAGE_TYPE && !entity.getData().src;

const isUploadingVideo = (entity: EntityInstance) =>
  entity.getType() === VIDEO_TYPE && entity.getData().tempData === true;

const isUploadingFile = (entity: EntityInstance) => {
  const { tempData, name, type } = entity.getData();
  return entity.getType() === FILE_UPLOAD_TYPE && (tempData === true || !name || !type);
};

const isUploadingGallery = (entity: EntityInstance) => {
  const data = entity.getData();
  const items = data.items as { url: string; loading?: boolean }[];
  return (
    entity.getType() === GALLERY_TYPE &&
    (items?.length === 0 ||
      items.some?.(item => item.url?.includes('base64') || !!item.loading) ||
      data.loading)
  );
};

const getAtomicBlocksMap = (contentState: ContentState) =>
  contentState.getBlockMap().filter(block => block?.getType() === 'atomic');

const getEntityKeys = (blockMap: Iterable<string, ContentBlock>) =>
  blockMap
    .map(block => block?.getEntityAt(0))
    .filter(x => !!x)
    .toSetSeq();

const hasActiveUploads = (contentState: ContentState) => {
  const atomicBlocksMap = getAtomicBlocksMap(contentState);
  const entityKeys = getEntityKeys(atomicBlocksMap);
  return entityKeys.some((entityKey: string) => {
    const entity = contentState.getEntity(entityKey);
    return (
      isUploadingImage(entity) ||
      isUploadingVideo(entity) ||
      isUploadingFile(entity) ||
      isUploadingGallery(entity)
    );
  });
};

export { hasActiveUploads };
