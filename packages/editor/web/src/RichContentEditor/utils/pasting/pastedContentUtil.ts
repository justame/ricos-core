import { OrderedSet } from 'immutable';
import rgbToHex from './rgbToHex';
import type { ContentState } from 'wix-rich-content-editor-common';
import { Modifier, SelectionState } from 'wix-rich-content-editor-common';
import htmlToBlock from './htmlToBlock';
import { colorNameToHex } from './colorNameToHex';
import { reduce } from 'lodash';
import type { IConvertFromHTMLConfig } from 'draft-convert';

const isBlack = (color: string) => color === '#000000';

const shouldIncludeColor = (color: string | null) => {
  if (color && !isBlack(color)) {
    return true;
  }
  return false;
};

const getInlineColors = (style: CSSStyleDeclaration) => {
  const styles: string[] = [];
  if (style.color) {
    const FG = colorNameToHex(style.color) || rgbToHex(style.color);
    if (shouldIncludeColor(FG)) {
      styles.push(`{"FG":"${FG}"}`);
    }
  }

  if (style.backgroundColor) {
    const BG = colorNameToHex(style.backgroundColor) || rgbToHex(style.backgroundColor);
    if (shouldIncludeColor(BG)) {
      styles.push(`{"BG":"${BG}"}`);
    }
  }
  return styles;
};

export const pastedContentConfig = (customHeadings: string[]): IConvertFromHTMLConfig => {
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Should be Immutable.OrderedSet, not Set
    htmlToStyle: (nodeName, node, currentStyle: OrderedSet<string>) => {
      if (nodeName === 'span') {
        const styles: string[] = [];
        styles.push(...getInlineColors(node.style));
        parseInt(node.style.fontWeight, 10) > 500 && styles.push('BOLD');
        // fixes pasting text from google docs
        if (node.style.fontWeight === '400' && currentStyle?.toJS?.()?.includes?.('BOLD')) {
          // eslint-disable-next-line no-param-reassign
          currentStyle = currentStyle.delete('BOLD');
        }
        return OrderedSet.of<string>(...styles).merge(currentStyle);
      } else {
        const styles: string[] = [];
        return OrderedSet.of<string>(...styles).merge(currentStyle);
      }
    },
    htmlToEntity: (nodeName, node, createEntity) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: tagName doesn't exist in parentNode
      if (nodeName === 'a' && node.parentNode.tagName !== 'LI') {
        return createEntity('LINK', 'MUTABLE', {
          url: node.href,
        });
      }
      return undefined;
    },
    htmlToBlock: htmlToBlock(customHeadings),
  };
};

export const clearUnnecessaryInlineStyles = (contentState: ContentState) => {
  const selection = selectAllContent(contentState);

  return reduce(
    unnecessaryInlineStyles,
    (newContentState, style) => Modifier.removeInlineStyle(newContentState, selection, style),
    contentState
  );
};

const unnecessaryInlineStyles = ['CODE'];

const selectAllContent = (contentState: ContentState) => {
  const firstBlock = contentState.getBlockMap().first();
  const lastBlock = contentState.getBlockMap().last();
  const firstBlockKey = firstBlock.getKey();
  const lastBlockKey = lastBlock.getKey();
  const lengthOfLastBlock = lastBlock.getLength();

  return new SelectionState({
    anchorKey: firstBlockKey,
    anchorOffset: 0,
    focusKey: lastBlockKey,
    focusOffset: lengthOfLastBlock,
  });
};
