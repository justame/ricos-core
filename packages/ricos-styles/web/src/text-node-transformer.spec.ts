import { TextNodeTransformer } from './text-node-transformer';
import type { HeadingNode, ParagraphNode } from 'ricos-content';
import type { DocumentStyle } from 'ricos-schema';
import { paragraphNode, headingNode, complexHeadingNode } from './tests/test-cases';

describe('Text Node Transformer', () => {
  it('Should toDocumentStyle (paragraph) match expected', () => {
    const textNodeTransformer = new TextNodeTransformer(paragraphNode as ParagraphNode);
    const expected = {
      paragraph: {
        decorations: [
          {
            type: 'COLOR',
            colorData: {
              foreground: 'color4',
            },
          },
        ],
        nodeStyle: {
          paddingTop: '2px',
          paddingBottom: '3px',
        },
        lineHeight: '2.5',
      },
    } as DocumentStyle;
    expect(textNodeTransformer.toDocumentStyle()).toStrictEqual(expected);
  });

  it('Should toDocumentStyle (heading) match expected', () => {
    const textNodeTransformer = new TextNodeTransformer(headingNode as HeadingNode);
    const expected = {
      headerThree: {
        decorations: [
          {
            type: 'COLOR',
            colorData: {
              foreground: '#818181',
            },
          },
          {
            type: 'BOLD',
            fontWeightValue: 700,
          },
        ],
        nodeStyle: {
          paddingTop: '5px',
          paddingBottom: '2px',
        },
        lineHeight: '3',
      },
    } as DocumentStyle;
    expect(textNodeTransformer.toDocumentStyle()).toStrictEqual(expected);
  });

  it('Should toDocumentStyle (heading with multiple text nodes) match expected', () => {
    const textNodeTransformer = new TextNodeTransformer(complexHeadingNode as HeadingNode);
    const expected = {
      headerOne: {
        decorations: [
          {
            type: 'BOLD',
            fontWeightValue: 700,
          },
          {
            type: 'COLOR',
            colorData: {
              foreground: '#1d38d0',
            },
          },
        ],
        nodeStyle: {
          paddingTop: '2px',
          paddingBottom: '3px',
        },
        lineHeight: '3',
      },
    } as DocumentStyle;
    expect(textNodeTransformer.toDocumentStyle()).toStrictEqual(expected);
  });
});
