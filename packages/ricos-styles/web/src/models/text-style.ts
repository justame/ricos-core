import type { TextStyle as TextStyleRichContent } from 'ricos-schema';
import type { CustomTextualStyle } from 'ricos-types';

export interface TextStyle {
  getTextStyle: () => Omit<TextStyleRichContent, 'textAlignment'>;
  toCustomStyle: () => CustomTextualStyle;
  overrideWith: (textStyle: Omit<TextStyleRichContent, 'textAlignment'>) => TextStyle;
}
