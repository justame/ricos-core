import type { FunctionComponent, ReactNodeArray } from 'react';
import React from 'react';
import type { DraftDecorator } from 'draft-js';

function findWithRegex(
  text: string,
  regex: RegExp,
  callback: (start: number, end: number) => void
) {
  let matchArr, start;
  // eslint-disable-next-line fp/no-loops
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const headersRegEx = /{\$h\d}.*?{\$h}/g;

const headersMarkdownStrategy: DraftDecorator['strategy'] = (contentBlock, callback) => {
  findWithRegex(contentBlock.getText(), headersRegEx, callback);
};

const Headers: FunctionComponent<{
  children: ReactNodeArray;
  hideMarkdown?: boolean;
  decoratedText: string;
}> = ({ children, hideMarkdown, decoratedText }) => {
  const sliceElementText = (element, start: number, end?: number) => {
    if (typeof element === 'string') {
      return element.slice(start, end);
    } else if (element.props && element.props.text) {
      const text = element.props.text.slice(start, end);
      return React.cloneElement(element, { text });
    } else {
      return element;
    }
  };

  const Type = (decoratedText.match(/h\d/) as RegExpMatchArray)[0];

  if (hideMarkdown) {
    const lastIndex = children.length - 1;
    children[0] = sliceElementText(children[0], 5);
    children[lastIndex] = sliceElementText(children[lastIndex], 0, -4);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Type>{children}</Type>;
};

export { headersMarkdownStrategy as strategy, Headers as component };
