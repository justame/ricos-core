import { Node_Type } from 'ricos-schema';
import { fromTiptap } from './index';

describe('from Tiptap', () => {
  it('should convert image', () => {
    const content = {
      type: 'doc',
      attrs: {
        metadata: {
          version: 1,
          createdTimestamp: '2022-05-28T14:09:10.655Z',
          updatedTimestamp: '2022-05-28T14:09:10.655Z',
          id: '1dda5bc8-0920-4ccd-b4b3-331bcda058f9',
        },
        documentStyle: {},
      },
      content: [
        {
          type: Node_Type.IMAGE,
          content: [],
          attrs: {
            id: 'foo',
            containerData: {
              width: {
                size: 'SMALL',
              },
              alignment: 'LEFT',
              textWrap: true,
            },
            image: {
              src: {
                id: '8bb438_e353d9a6ec324041a17a28d10e21819d.jpg',
              },
              width: 5600,
              height: 3727,
            },
          },
        },
      ],
    };

    const expected = {
      nodes: [
        {
          type: Node_Type.IMAGE,
          id: 'foo',
          nodes: [],
          imageData: {
            containerData: {
              width: {
                size: 'SMALL',
              },
              alignment: 'LEFT',
              textWrap: true,
            },
            image: {
              src: {
                id: '8bb438_e353d9a6ec324041a17a28d10e21819d.jpg',
              },
              width: 5600,
              height: 3727,
            },
          },
        },
      ],
      metadata: {
        version: 1,
        createdTimestamp: '2022-05-28T14:09:10.655Z',
        updatedTimestamp: '2022-05-28T14:09:10.655Z',
        id: '1dda5bc8-0920-4ccd-b4b3-331bcda058f9',
      },
      documentStyle: {},
    };
    const actual = fromTiptap(content);
    expect(actual).toStrictEqual(expected);
  });
});
