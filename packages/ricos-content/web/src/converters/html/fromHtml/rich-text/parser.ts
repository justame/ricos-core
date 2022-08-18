import { flow } from 'fp-ts/function';
import type { TextNode } from 'parse5';
import { preprocess } from './preprocess';
import parse from '../core/parser';
import {
  pToParagraph,
  lToList,
  hToHeading,
  strongEmUToDecoration,
  colorStyleToTextColor,
  backgroundStyleToTextHighlight,
  aToLink,
  textToText,
  spanToMention,
  spanToSpoiler,
  aToAnchor,
} from '../core/rules';
import type { Rule } from '../core/models';

const noEmptyLineText: Rule = [
  node => textToText[0](node) && (node as TextNode).value !== '\n',
  textToText[1],
];

export default flow(
  preprocess,
  parse([
    noEmptyLineText,
    pToParagraph,
    lToList,
    hToHeading,
    aToLink,
    aToAnchor,
    strongEmUToDecoration,
    colorStyleToTextColor,
    spanToMention,
    spanToSpoiler,
    backgroundStyleToTextHighlight,
  ])
);
