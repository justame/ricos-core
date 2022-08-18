import type { DraftContent, RicosContentBlock, RicosEntityMap } from 'ricos-content';

/* eslint-disable fp/no-loops */
export const getBlocksFromContentState = (contentState: DraftContent): RicosContentBlock[] => {
  const innerRCEBlocks = isInnerRCEExists(contentState.entityMap)
    ? getInnerRCEBlocks(contentState.entityMap)
    : [];
  return [...contentState.blocks, ...innerRCEBlocks];
};

function getInnerRCEBlocks(object): RicosContentBlock[] {
  let result: RicosContentBlock[] = [];
  if (object instanceof Array) {
    Array.prototype.forEach.call(object, arrayElement => {
      const innerBlocks = getInnerRCEBlocks(arrayElement);
      if (innerBlocks) {
        result = [...result, ...innerBlocks];
      }
    });
  } else {
    for (const [key, value] of Object.entries(object)) {
      if (key === 'blocks') {
        return value as RicosContentBlock[];
      }
      if (value instanceof Object || value instanceof Array) {
        const innerBlocks = getInnerRCEBlocks(value);
        if (innerBlocks) {
          result = [...result, ...innerBlocks];
        }
      }
    }
  }
  return result;
}

function isInnerRCEExists(entityMap: RicosEntityMap) {
  const rceInRcePlugins = [
    'wix-rich-content-plugin-table',
    'wix-rich-content-plugin-collapsible-list',
  ];
  return Object.values(entityMap).some(entity => rceInRcePlugins.includes(entity.type));
}
