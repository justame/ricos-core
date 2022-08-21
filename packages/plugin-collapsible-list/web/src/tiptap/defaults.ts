import {
  TIPTAP_COLLAPSIBLE_ITEM_TYPE,
  TIPTAP_COLLAPSIBLE_ITEM_TITLE_TYPE,
  TIPTAP_COLLAPSIBLE_ITEM_BODY_TYPE,
} from 'ricos-content';
import { Node_Type } from 'wix-rich-content-common';

export const defaultCollapsibleItem = [
  {
    type: TIPTAP_COLLAPSIBLE_ITEM_TYPE,
    content: [
      {
        type: TIPTAP_COLLAPSIBLE_ITEM_TITLE_TYPE,
        content: [
          {
            type: Node_Type.PARAGRAPH,
            content: [],
          },
        ],
      },
      {
        type: TIPTAP_COLLAPSIBLE_ITEM_BODY_TYPE,
        content: [
          {
            type: Node_Type.PARAGRAPH,
            content: [],
          },
        ],
      },
    ],
  },
];
