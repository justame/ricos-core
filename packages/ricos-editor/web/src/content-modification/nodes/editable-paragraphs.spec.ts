import type { Decoration } from 'ricos-schema';
import { Node_Type, TextStyle_TextAlignment, Decoration_Type } from 'ricos-schema';
import { EditableParagraphs } from './editable-paragraphs';
import type { ParagraphNode } from 'ricos-content';
import type { EditableText } from './editable-text';

const decoration: Decoration = { type: Decoration_Type.BOLD, fontWeightValue: 700 };

const containsText = (text: string) => (node: EditableText) => node.getData().text === text;

describe('Ricos Paragraph Nodes aggregator', () => {
  const paragraphNodes: ParagraphNode[] = [
    {
      type: Node_Type.PARAGRAPH,
      id: '3qqn6',
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
            text: 'Shalom',
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
    },
    {
      type: Node_Type.PARAGRAPH,
      id: 'bsc9i',
      nodes: [
        {
          type: Node_Type.TEXT,
          id: '',
          nodes: [],
          textData: {
            text: 'World',
            decorations: [],
          },
        },
        {
          type: Node_Type.TEXT,
          id: '',
          nodes: [],
          textData: {
            text: 'Globe',
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
    },
  ];

  const nodes = EditableParagraphs.of(paragraphNodes);

  it('Should filter only selected nodes', () => {
    const actual = nodes.filter(node => node.getSelection()).asArray();
    expect(actual).toStrictEqual([]);
  });

  it('Should filter only node with World text', () => {
    const actual = nodes.filter(
      paragraph => paragraph.getNodes().filter(containsText('World')).asArray().length > 0
    );
    expect(actual.asArray()[0].getNodes().asArray()[0].getData().text).toStrictEqual('World');
  });

  it('Should setDecoration to all nodes', () => {
    const nodesWithDecoration = nodes.setDecoration(decoration);
    const nodesData = nodesWithDecoration
      .asArray()
      .map(node =>
        node
          .getNodes()
          .asArray()
          .map(node => node.getData())
      )
      .flat();
    expect(nodesData).toStrictEqual([
      {
        text: 'Hello',
        decorations: [{ type: Decoration_Type.BOLD, fontWeightValue: 700 }],
      },
      {
        text: 'Shalom',
        decorations: [{ type: Decoration_Type.BOLD, fontWeightValue: 700 }],
      },
      {
        text: 'World',
        decorations: [{ type: Decoration_Type.BOLD, fontWeightValue: 700 }],
      },
      {
        text: 'Globe',
        decorations: [{ type: Decoration_Type.BOLD, fontWeightValue: 700 }],
      },
    ]);
  });

  it('Should unsetDecoration to all nodes', () => {
    const nodesWithDecoration = nodes.setDecoration(decoration);
    const nodesWithoutDecoration = nodesWithDecoration.unsetDecoration(decoration);
    const nodesData = nodesWithoutDecoration
      .asArray()
      .map(node =>
        node
          .getNodes()
          .asArray()
          .map(node => node.getData())
      )
      .flat();
    expect(nodesData).toStrictEqual([
      {
        text: 'Hello',
        decorations: [],
      },
      {
        text: 'Shalom',
        decorations: [],
      },

      {
        text: 'World',
        decorations: [],
      },
      {
        text: 'Globe',
        decorations: [],
      },
    ]);
  });
});
