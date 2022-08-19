import type { RichContent } from 'ricos-schema';
import { Node_Type, TextStyle_TextAlignment, Decoration_Type } from 'ricos-schema';
import { DraftEditorStateTranslator } from './draft-editor-state-translator';
import { toDraft } from 'ricos-content/libs/toDraft';
import { EditorState } from 'draft-js';
import { fromDraft } from 'ricos-content/libs/fromDraft';
import { convertToRaw, convertFromRaw } from 'wix-rich-content-editor/libs/editorStateConversion';

describe('Draft Editor State Translator', () => {
  const richContent = {
    nodes: [
      {
        type: Node_Type.PARAGRAPH,
        id: 'foo',
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
              decorations: [
                {
                  type: Decoration_Type.UNDERLINE,
                  underlineData: true,
                },
              ],
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
        id: 'ddi6b',
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
              decorations: [
                {
                  type: Decoration_Type.BOLD,
                  fontWeightValue: 700,
                },
              ],
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
        type: 'IMAGE',
        id: '6t3f0',
        nodes: [],
        imageData: {
          containerData: {
            alignment: 'CENTER',
            width: {
              size: 'CONTENT',
            },
            textWrap: true,
          },
          image: {
            src: {
              id: '8bb438_6ea01262e7a94b2490ab1c6d8b889122.jpg',
            },
            width: 5600,
            height: 3737,
          },
        },
      },
    ],
  };

  const draftContent = toDraft(richContent as unknown as RichContent);
  const editorState = EditorState.createWithContent(convertFromRaw(draftContent));
  const editor = new DraftEditorStateTranslator();
  let data: RichContent | undefined;
  editor.setEditorState = editorState =>
    (data = fromDraft(convertToRaw(editorState.getCurrentContent())));

  it('Should set paragraph block', () => {
    editor.onChange(draftContent, editorState);
    const newRichContent = {
      nodes: [
        {
          type: Node_Type.PARAGRAPH,
          id: 'foo',
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
                decorations: [
                  {
                    type: Decoration_Type.UNDERLINE,
                    underlineData: true,
                  },
                  {
                    type: Decoration_Type.BOLD,
                    fontWeightValue: 700,
                  },
                ],
              },
            },
          ],
          paragraphData: {
            textStyle: {
              textAlignment: TextStyle_TextAlignment.LEFT,
            },
            indentation: 0,
          },
        },
      ],
    };
    editor.setBlocks(toDraft(newRichContent as unknown as RichContent));
    const nodes = data?.nodes.filter(node => node.id === 'foo') || [];
    const hasBoldDecoration = nodes[0].nodes[1].textData?.decorations.some(
      decoration => decoration.type === 'BOLD'
    );
    const alignmentChanged = nodes[0].paragraphData?.textStyle?.textAlignment === 'LEFT';
    const actual = hasBoldDecoration && alignmentChanged;
    expect(actual).toBeTruthy();
  });

  it('Should set image block', () => {
    editor.onChange(draftContent, editorState);
    const newRichContent = {
      nodes: [
        {
          type: 'IMAGE',
          id: '6t3f0',
          nodes: [],
          imageData: {
            containerData: {
              alignment: 'LEFT',
              width: {
                size: 'CONTENT',
              },
              textWrap: true,
            },
            image: {
              src: {
                id: '8bb438_6ea01262e7a94b2490ab1c6d8b889122.jpg',
              },
              width: 300,
              height: 300,
            },
          },
        },
      ],
    };
    editor.setBlocks(toDraft(newRichContent as unknown as RichContent));
    const nodes = data?.nodes.filter(node => node.id === '6t3f0') || [];
    const alignmentChanged = nodes[0].imageData?.containerData?.alignment === 'LEFT';
    const widthHeightChanged =
      nodes[0].imageData?.image?.height === 300 && nodes[0].imageData?.image?.width === 300;
    const actual = alignmentChanged && widthHeightChanged;
    expect(actual).toBeTruthy();
  });
});
