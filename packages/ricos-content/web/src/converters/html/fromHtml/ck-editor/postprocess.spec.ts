import { RichContent } from '@justame-ricos/ricos-schema';
import { compare } from '../../../../comparision/compare';
import postprocess from './postprocess';

describe('CKEditor postprocess', () => {
  it('<li><p><p></li> => <li><p></li>', () => {
    const content: RichContent = RichContent.fromJSON({
      nodes: [
        {
          type: 'BULLETED_LIST',
          id: 'cjdfa',
          nodes: [
            {
              type: 'LIST_ITEM',
              id: '6s1ga',
              nodes: [
                {
                  type: 'PARAGRAPH',
                  id: 'para1',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: 'paragraph1 ',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'CENTER',
                      lineHeight: '1.5em',
                    },
                  },
                },
                {
                  type: 'PARAGRAPH',
                  id: 'para2',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: ' paragraph2',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'RIGHT',
                      lineHeight: '3em',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    const expected: RichContent = RichContent.fromJSON({
      nodes: [
        {
          type: 'BULLETED_LIST',
          id: 'cjdfa',
          nodes: [
            {
              type: 'LIST_ITEM',
              id: '6s1ga',
              nodes: [
                {
                  type: 'PARAGRAPH',
                  id: 'para1',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: 'paragraph1 ',
                        decorations: [],
                      },
                    },
                    { type: 'TEXT', id: '', textData: { text: '\n', decorations: [] }, nodes: [] },
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: ' paragraph2',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'CENTER',
                      lineHeight: '1.5em',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    const actual = postprocess(content);

    expect(RichContent.fromJSON(actual)).toStrictEqual(expected);
  });

  it('should split lists and list items containing list-unsupported nodes in draft', () => {
    const content = RichContent.fromJSON({
      nodes: [
        {
          type: 'ORDERED_LIST',
          id: 'cjdfa',
          nodes: [
            {
              type: 'LIST_ITEM',
              id: '6s1ga',
              nodes: [
                {
                  type: 'PARAGRAPH',
                  id: '3um32',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: 'para1',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'AUTO',
                    },
                  },
                },
              ],
            },
            {
              type: 'LIST_ITEM',
              id: 'c4gcn',
              nodes: [
                {
                  type: 'PARAGRAPH',
                  id: '3um32',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: 'para2',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'AUTO',
                    },
                  },
                },
                {
                  type: 'IMAGE',
                  id: '5u2v2',
                  nodes: [],
                  imageData: {
                    image: {
                      src: { url: 'https://host.com/image.png' },
                    },
                  },
                },
                {
                  type: 'PARAGRAPH',
                  id: '3um32',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: 'para3',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'AUTO',
                    },
                  },
                },
              ],
            },
            {
              type: 'LIST_ITEM',
              id: 'f62ja',
              nodes: [
                {
                  type: 'PARAGRAPH',
                  id: '2u96f',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: 'para4',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'AUTO',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    const expected = RichContent.fromJSON({
      nodes: [
        {
          type: 'BULLETED_LIST',
          id: 'cjdfa',
          nodes: [
            {
              type: 'LIST_ITEM',
              id: '6s1ga',
              nodes: [
                {
                  type: 'PARAGRAPH',
                  id: '3um32',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: 'para1',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'AUTO',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'BULLETED_LIST',
          id: 'cjdfa',
          nodes: [
            {
              type: 'LIST_ITEM',
              id: '6s1ga',
              nodes: [
                {
                  type: 'PARAGRAPH',
                  id: '3um32',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: 'para2',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'AUTO',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'IMAGE',
          id: '5u2v2',
          nodes: [],
          imageData: {
            image: {
              src: { url: 'https://host.com/image.png' },
            },
          },
        },
        {
          type: 'BULLETED_LIST',
          id: 'cjdfa',
          nodes: [
            {
              type: 'LIST_ITEM',
              id: '6s1ga',
              nodes: [
                {
                  type: 'PARAGRAPH',
                  id: '3um32',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: 'para3',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'AUTO',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'BULLETED_LIST',
          id: 'cjdfa',
          nodes: [
            {
              type: 'LIST_ITEM',
              id: 'f62ja',
              nodes: [
                {
                  type: 'PARAGRAPH',
                  id: '2u96f',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '',
                      nodes: [],
                      textData: {
                        text: 'para4',
                        decorations: [],
                      },
                    },
                  ],
                  paragraphData: {
                    textStyle: {
                      textAlignment: 'AUTO',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    const actual = postprocess(content);
    expect(compare(RichContent.fromJSON(actual), expected, { ignoredKeys: ['id'] })).toEqual({});
  });
});
