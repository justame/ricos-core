import classNames from 'classnames';
import editorStyles from '../../statics/styles/rich-content-editor.scss';
import alignmentStyles from '../../statics/styles/rich-content-editor-alignment.rtlignore.scss';
import type { TextDirection, RichContentTheme } from 'wix-rich-content-common';
import {
  depthClassName,
  getTextDirection,
  getDirectionFromAlignmentAndTextDirection,
  DRAFT_TO_DOC_TYPE,
} from 'wix-rich-content-common';
import { isListType } from 'ricos-content';
import type { ContentBlock, EditorProps } from '@wix/draft-js';
import { DOC_STYLE_CLASSES } from './utils/consts';

const styles = { ...editorStyles, ...alignmentStyles };
const types = {
  blockquote: 'quote',
  'header-one': 'headerOne',
  'header-two': 'headerTwo',
  'header-three': 'headerThree',
  'header-four': 'headerFour',
  'header-five': 'headerFive',
  'header-six': 'headerSix',
  atomic: 'atomic',
  'code-block': 'codeBlock',
  'ordered-list-item': 'orderedList',
  'unordered-list-item': 'unorderedList',
};

const listAlignmentClass = (
  textAlignment: EditorProps['textAlignment'],
  textDirection: TextDirection
) => {
  const direction = getDirectionFromAlignmentAndTextDirection(textAlignment, textDirection);
  return `public-DraftStyleDefault-list-${direction}`;
};

const textBlockAlignmentClass = (
  textAlignment: EditorProps['textAlignment'],
  textDirection: TextDirection
) => {
  const direction = getDirectionFromAlignmentAndTextDirection(textAlignment, textDirection);
  return `public-DraftStyleDefault-text-${direction}`;
};

export default (
  theme: RichContentTheme,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styleToClass: ([key, val]: [string, any]) => string,
  defaultTextAlignment?: EditorProps['textAlignment'],
  fixedTabSize?: boolean
) => {
  return (contentBlock: ContentBlock) => {
    const {
      type,
      depth,
      text,
      data: { textAlignment = defaultTextAlignment, dynamicStyles = {} },
    } = contentBlock.toJS();

    const textDirection = getTextDirection(text);

    const key = types[type] || 'text';
    const classList = [styles[key], theme[key]];

    if (type !== 'atomic') {
      classList.push(
        styles[textAlignment],
        theme[textAlignment],
        isListType(type)
          ? listAlignmentClass(textAlignment, textDirection)
          : [
              depthClassName(depth),
              textBlockAlignmentClass(textAlignment, textDirection),
              fixedTabSize ? 'fixed-tab-size' : '',
            ]
      );
    }

    const docStyleClass = DOC_STYLE_CLASSES[DRAFT_TO_DOC_TYPE[type] || type];
    const dynamicClasses = [...Object.entries(dynamicStyles).map(styleToClass), docStyleClass];

    return classNames(...classList, ...dynamicClasses);
  };
};
