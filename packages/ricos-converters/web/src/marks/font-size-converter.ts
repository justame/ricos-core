import type { FontSizeData } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import type { TiptapMarkConverter } from '../types';

export const fontSizeConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: Decoration_Type.FONT_SIZE,
    convert: mark => {
      const { attrs } = mark;
      return {
        type: Decoration_Type.FONT_SIZE,
        fontSizeData: { ...attrs } as FontSizeData,
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.FONT_SIZE,
    convert: decoration => {
      const { fontSizeData } = decoration;
      return {
        type: Decoration_Type.FONT_SIZE,
        attrs: { ...fontSizeData },
      };
    },
  },
};
