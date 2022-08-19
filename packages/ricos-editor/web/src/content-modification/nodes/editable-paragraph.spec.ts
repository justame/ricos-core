import type { Decoration } from 'ricos-schema';
import { Node_Type, TextStyle_TextAlignment, Decoration_Type } from 'ricos-schema';
import { EditableParagraph } from './editable-paragraph';
import type { ParagraphNode } from 'ricos-content';

const decoration: Decoration = { type: Decoration_Type.BOLD, fontWeightValue: 700 };

describe('Ricos Text Node', () => {
  const paragraphNode: ParagraphNode = {
    type: Node_Type.PARAGRAPH,
    id: 'bsc9i',
    nodes: [
      {
        type: Node_Type.TEXT,
        id: '',
        nodes: [],
        textData: {
          text: 'Hello',
          decorations: [],
        },
      },
      {
        type: Node_Type.TEXT,
        id: '',
        nodes: [],
        textData: {
          text: 'World',
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

  const node = EditableParagraph.of(paragraphNode);

  it('Should getSelection return false', () => {
    const actual = node.getSelection();
    expect(actual).toStrictEqual(false);
  });

  it('Should getData match the expected', () => {
    const actual = node.getRefinedNode().paragraphData;
    expect(actual).toStrictEqual({
      textStyle: {
        textAlignment: TextStyle_TextAlignment.AUTO,
      },
      indentation: 0,
    });
  });

  it('Should getData of RicosTextNodes match the expected', () => {
    const actual = node.getNodes().asArray()[1].getData();
    expect(actual).toStrictEqual({
      text: 'World',
      decorations: [],
    });
  });

  it('Should setDecoration to node', () => {
    const nodeWithDecoration = node.setDecoration(decoration);
    const nodesData = nodeWithDecoration
      .getNodes()
      .asArray()
      .map(node => node.getData());
    expect(nodesData).toStrictEqual([
      {
        text: 'Hello',
        decorations: [{ type: Decoration_Type.BOLD, fontWeightValue: 700 }],
      },
      {
        text: 'World',
        decorations: [{ type: Decoration_Type.BOLD, fontWeightValue: 700 }],
      },
    ]);
  });

  it('Should unsetDecoration to node', () => {
    const nodeWithDecoration = node.setDecoration(decoration);
    const nodeWithoutDecoration = nodeWithDecoration.unsetDecoration({
      type: Decoration_Type.BOLD,
    });
    const nodesData = nodeWithoutDecoration
      .getNodes()
      .asArray()
      .map(node => node.getData());
    expect(nodesData).toStrictEqual([
      {
        text: 'Hello',
        decorations: [],
      },
      {
        text: 'World',
        decorations: [],
      },
    ]);
  });
});
