import { anchorScroll } from 'wix-rich-content-common';

export const scrollToBlock = (blockKey: string) => {
  const nodeListOfAllblocks = document.querySelectorAll(`[data-editor]`);
  // eslint-disable-next-line prefer-spread
  const arrayOfAllblocks = Array.apply(null, nodeListOfAllblocks);
  const element = arrayOfAllblocks.find(block => block.dataset.offsetKey === `${blockKey}-0-0`);
  if (element) {
    anchorScroll(element);
  }
};
