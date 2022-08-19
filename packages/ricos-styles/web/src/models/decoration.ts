import type { Decoration, Decoration_Type } from 'ricos-schema';
import type { CustomTextualStyle } from 'ricos-types';

export interface TextDecoration {
  type: Decoration_Type;
  getDecoration: () => Decoration;
  fromCustomStyle: (customStyle: CustomTextualStyle) => TextDecoration;
  toCustomStyle: () => CustomTextualStyle;
  overrideWith: (decoration: TextDecoration) => TextDecoration;
}

export interface TextDecorations {
  toCustomStyle: () => CustomTextualStyle;
  byType: (type: Decoration_Type) => TextDecoration;
  toDecorationArray: () => Decoration[];
}
