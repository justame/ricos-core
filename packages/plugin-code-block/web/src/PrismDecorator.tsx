import type { FunctionComponent } from 'react';
import React from 'react';
import { range, reduce as _reduce } from 'lodash';
import Prism from 'prismjs';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { hasLinksInBlock } from 'wix-rich-content-common';
import highlightingTheme from '../statics/styles/highlighting-theme.scss';
import type { CompositeDecorator } from '@wix/draft-js';
import type { List } from 'immutable'; // eslint-disable-line prettier/prettier

const DEFAULT_SYNTAX = 'javascript';
const CODE_TOKEN_CLASS_NAMES = highlightingTheme;

const PrismToken: FunctionComponent<{
  className: string;
  offsetKey?: string;
}> = ({ className, children, offsetKey }) => (
  <span key={`codeBlock_${offsetKey}`} children={children} className={className} />
);

export default class PrismDecorator implements CompositeDecorator {
  highlighted = {};

  theme: RichContentTheme;

  constructor(theme = {}) {
    this.theme = theme;
  }

  getDecorations(block, contentState) {
    const blockKey = block.getKey();
    const blockText = block.getText();
    const decorations = Array(blockText.length).fill(null) as unknown as List<string>;

    this.highlighted[blockKey] = {};

    if (block.getType() !== 'code-block' || hasLinksInBlock(block, contentState)) {
      return decorations;
    }

    // Parse text using Prism
    const grammar = Prism.languages[DEFAULT_SYNTAX];
    const tokens = Prism.tokenize(blockText, grammar);
    let offset = 0;

    tokens.forEach(token => {
      if (typeof token === 'string') {
        offset += token.length;
      } else {
        const tokenId = `tok${offset}`;
        const resultId = `${blockKey}-${tokenId}`;

        this.highlighted[blockKey][tokenId] = token;

        addDecorations(decorations, offset, offset + getTokenLength(token), resultId);
        offset += getTokenLength(token);
      }
    });

    return decorations;
  }

  getComponentForKey() {
    return PrismToken;
  }

  getPropsForKey(key) {
    const parts = key.split('-');
    const blockKey = parts[0];
    const tokId = parts[1];
    const { type } = this.highlighted[blockKey][tokId];
    return {
      className: classNames(CODE_TOKEN_CLASS_NAMES[type], this.theme[`codeBlock_${type}`]),
    };
  }
}

function getTokenLength(token) {
  const tokenContent = token.content || token;
  if (typeof tokenContent === 'string') {
    return tokenContent.length;
  }

  return _reduce(token.content, (acc, token) => getTokenLength(token) + acc, 0);
}

function addDecorations(decorations, start, end, componentKey) {
  const numRange = range(start, end, 1);
  numRange.forEach(i => (decorations[i] = componentKey));
}
