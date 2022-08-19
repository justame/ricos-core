import type { ParagraphNode } from 'ricos-content';
import { Node_Type, TextStyle_TextAlignment } from 'ricos-schema';
import { ricosNodeVisitor, tiptapNodeVisitor } from '../tiptap-converters';
import { paragraphConverter } from './paragraph-converter';

describe('Paragraph converter', () => {
  const tiptapNode = {
    type: Node_Type.PARAGRAPH,
    attrs: {
      textStyle: {
        textAlignment: TextStyle_TextAlignment.AUTO,
      },
      indentation: 0,
      id: '55',
    },
    content: [
      {
        type: 'text',
        text: 'Nunc scelerisque fringilla aliquet.',
        marks: [],
        attrs: {
          id: '',
        },
      },
    ],
  };

  const paragraphNode: ParagraphNode = {
    type: Node_Type.PARAGRAPH,
    id: '55',
    nodes: [
      {
        type: Node_Type.TEXT,
        id: '',
        nodes: [],
        textData: {
          text: 'Nunc scelerisque fringilla aliquet.',
          decorations: [],
        },
      },
    ],
    paragraphData: {
      textStyle: {
        textAlignment: TextStyle_TextAlignment.AUTO,
      },
      indentation: 0,
    },
  };

  it('should convert ParagraphNode to TiptapNode', () => {
    const actual = paragraphConverter.toTiptap.convert(paragraphNode, ricosNodeVisitor);
    expect(actual).toEqual(tiptapNode);
  });

  it('should convert TiptapNode to ParagraphNode', () => {
    const actual = paragraphConverter.fromTiptap.convert(tiptapNode, tiptapNodeVisitor);
    expect(actual).toEqual(paragraphNode);
  });
});
