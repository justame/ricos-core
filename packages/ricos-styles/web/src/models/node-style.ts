import type { NodeStyle as NodeStyleRichContent } from 'ricos-schema';
import type { CustomTextualStyle } from 'ricos-types';

export interface NodeStyle {
  getNodeStyle: () => NodeStyleRichContent;
  toCustomStyle: () => CustomTextualStyle;
  overrideWith: (nodeStyle: NodeStyleRichContent) => NodeStyle;
}
