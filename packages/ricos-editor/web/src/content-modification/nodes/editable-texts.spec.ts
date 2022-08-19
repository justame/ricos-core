import type { Decoration } from 'ricos-schema';
import { Node_Type, Decoration_Type } from 'ricos-schema';
import { EditableTexts } from './editable-texts';
import type { TextNode } from 'ricos-content';

const decoration: Decoration = { type: Decoration_Type.BOLD, fontWeightValue: 700 };

describe('Ricos Text Nodes Aggregator', () => {
  const textNodes: TextNode[] = [
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
  ];
  const ricosTextNodes = EditableTexts.of(textNodes);

  it('Should filter nodes correctly', () => {
    const actual = ricosTextNodes
      .filter(node => node.getData().text === 'World')
      .asArray()[0]
      .getData();
    expect(actual).toStrictEqual({ text: 'World', decorations: [] });
  });

  it('Should getData match the expected', () => {
    const textNode: TextNode = {
      type: Node_Type.TEXT,
      id: '',
      nodes: [],
      textData: {
        text: 'Bla',
        decorations: [],
      },
    };
    const actual = ricosTextNodes.insert(textNode).asArray()[2].getData();
    expect(actual).toStrictEqual({ text: 'Bla', decorations: [] });
  });

  it('Should setDecoration to all nodes', () => {
    const nodesWithDecoration = ricosTextNodes.setDecoration(decoration);
    const nodesData = nodesWithDecoration.asArray().map(node => node.getData());
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

  it('Should unsetDecoration to all nodes', () => {
    const nodesWithDecoration = ricosTextNodes.setDecoration(decoration);
    const nodesWithoutDecoration = nodesWithDecoration.unsetDecoration({
      type: Decoration_Type.BOLD,
    });
    const nodesData = nodesWithoutDecoration.asArray().map(node => node.getData());
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
