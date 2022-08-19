import type { Decoration } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import type { CustomTextualStyle } from 'ricos-types';
import type { TextDecoration } from '../models/decoration';

export class EmptyDecoration implements TextDecoration {
  type = Decoration_Type.UNRECOGNIZED;

  getDecoration(): Decoration {
    return {} as Decoration;
  }

  fromCustomStyle(_customStyle: CustomTextualStyle): TextDecoration {
    return new EmptyDecoration();
  }

  toCustomStyle(): CustomTextualStyle {
    return {};
  }

  overrideWith(decoration: TextDecoration): TextDecoration {
    return decoration;
  }
}
