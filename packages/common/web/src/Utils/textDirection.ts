import type { EditorProps } from 'draft-js';
import type { TextDirection } from 'ricos-types';

export const getDirectionFromAlignmentAndTextDirection = (
  textAlignment: EditorProps['textAlignment'],
  textDirection: TextDirection
): TextDirection => {
  if (textAlignment === 'right') {
    return 'rtl';
  } else if (textAlignment === 'left') {
    return 'ltr';
  } else {
    return textDirection && textDirection === 'rtl' ? textDirection : 'ltr';
  }
};
