import { Decoration_Type } from 'ricos-schema';
import type { TiptapMarkConverter } from '../types';

export const colorConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: Decoration_Type.COLOR,
    convert: mark => {
      const { attrs } = mark;
      return {
        type: Decoration_Type.COLOR,
        colorData: { ...attrs },
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.COLOR,
    convert: decoration => {
      const { colorData } = decoration;
      return {
        type: Decoration_Type.COLOR,
        attrs: { ...colorData },
      };
    },
  },
};
