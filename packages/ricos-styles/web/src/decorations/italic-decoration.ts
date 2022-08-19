import type { Decoration } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import type { CustomTextualStyle } from 'ricos-types';
import { EmptyDecoration } from './empty-decoration';
import type { TextDecoration } from '../models/decoration';

export class ItalicDecoration implements TextDecoration {
  type = Decoration_Type.ITALIC;

  private readonly customStyle: CustomTextualStyle;

  private constructor(customStyle: CustomTextualStyle) {
    this.customStyle = customStyle;
  }

  static of(decoration: Decoration) {
    if (decoration.type !== Decoration_Type.ITALIC) {
      throw new TypeError(`invalid decoration initializer ${decoration}`);
    }

    return new ItalicDecoration(decoration.italicData ? { fontStyle: 'italic' } : {});
  }

  getDecoration(): Decoration {
    return {
      type: this.type,
      italicData: this.customStyle.fontStyle?.includes('italic'),
    };
  }

  static fromCustomStyle(customStyle: CustomTextualStyle): TextDecoration {
    return new ItalicDecoration(customStyle);
  }

  fromCustomStyle(customStyle: CustomTextualStyle): TextDecoration {
    return ItalicDecoration.fromCustomStyle(customStyle);
  }

  toCustomStyle(): CustomTextualStyle {
    return this.customStyle;
  }

  overrideWith(decoration: TextDecoration): TextDecoration {
    if (!(decoration instanceof ItalicDecoration || decoration instanceof EmptyDecoration)) {
      throw new TypeError(`invalid merge decoration ${decoration}`);
    }
    const customStyle = { ...this.customStyle, ...decoration.toCustomStyle() };
    return new ItalicDecoration(customStyle);
  }
}
