import { RichContent } from 'ricos-schema';
import type { IDraftEditorStateTranslator } from '../../models/draft-editor-state-translator';
import { DraftEditablesRepository } from './draft-editables-repository';

const richContent = RichContent.fromJSON({
  nodes: [
    {
      type: 'PARAGRAPH',
      id: 'foo',
      nodes: [
        {
          type: 'TEXT',
          id: '',
          nodes: [],
          textData: {
            text: 'Hello World',
            decorations: [],
          },
        },
      ],
      paragraphData: {
        textStyle: {
          textAlignment: 'AUTO',
        },
        indentation: 0,
      },
    },
  ],
  metadata: {
    version: 1,
    createdTimestamp: '2022-02-25T10:24:25.766Z',
    updatedTimestamp: '2022-02-25T10:24:25.766Z',
    id: 'ae1d1b1c-8080-4a04-9287-3305479ff8d0',
  },
  documentStyle: {},
});

const draftContent = {
  blocks: [
    {
      key: 'foo',
      text: 'Hello World',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

const toDraft = () => draftContent;
const fromDraft = () => richContent;

const translator: IDraftEditorStateTranslator = {
  getDraftContent: () => draftContent,
  getSelectedBlocksKeys: () => ['foo'],
  setBlocks() {},
  setEditorState() {},
  onChange() {},
};

describe('Draft Content Repository', () => {
  it('getEditables should return a model with selection', () => {
    // Arrange
    const repo = new DraftEditablesRepository(translator, toDraft, fromDraft);

    // Act
    const actual = repo
      .getEditables()
      .filter(n => n.getSelection())
      .getRefinedNodes()
      .map(({ id }) => id);

    // Assert
    expect(actual).toStrictEqual(['foo']);
  });
});
