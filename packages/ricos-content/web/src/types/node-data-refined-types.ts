import type { TextData, Decoration, ParagraphData } from '@justame-ricos/ricos-schema';
import { Decoration_Type, TextStyle_TextAlignment } from '@justame-ricos/ricos-schema';

export const isTextData = (data: TextData | undefined): data is TextData =>
  typeof data?.text === 'string' &&
  Array.isArray(data?.decorations) &&
  data.decorations.every(isDecoration);

const DECORATION_TYPES = [
  Decoration_Type.ANCHOR,
  Decoration_Type.BOLD,
  Decoration_Type.COLOR,
  Decoration_Type.EXTERNAL,
  Decoration_Type.FONT_SIZE,
  Decoration_Type.ITALIC,
  Decoration_Type.LINK,
  Decoration_Type.MENTION,
  Decoration_Type.SPOILER,
  Decoration_Type.UNDERLINE,
];

const isDecoration = (data: Decoration): data is Decoration => DECORATION_TYPES.includes(data.type);

// TODO: does not validate lineHeight
export const isParagraphData = (data: ParagraphData | undefined): data is ParagraphData =>
  !!data &&
  (!data.indentation || typeof data.indentation === 'number') &&
  (!data.textStyle ||
    [
      TextStyle_TextAlignment.AUTO,
      TextStyle_TextAlignment.CENTER,
      TextStyle_TextAlignment.JUSTIFY,
      TextStyle_TextAlignment.LEFT,
      TextStyle_TextAlignment.RIGHT,
    ].includes(data.textStyle.textAlignment));
