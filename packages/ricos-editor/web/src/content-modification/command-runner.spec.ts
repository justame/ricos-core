import type { CommandDescriptor } from 'ricos-types';
import type { ParagraphNode } from 'ricos-content';
import { Decoration_Type } from 'ricos-schema';
import type { EditablesRepository } from '../models/editable-repository';
import type { NodeDescriptorManager } from '../models/editable-node-descriptor';
import { EditorCommandRunner } from './command-runner';
import type { EditableParagraph } from './nodes/editable-paragraph';
import { EditableParagraphs } from './nodes/editable-paragraphs';

const paragraph = {
  nodes: [
    {
      type: 'PARAGRAPH',
      nodes: [
        {
          type: 'TEXT',
          textData: {
            text: 'Hello World',
            decorations: [],
          },
        },
      ],
    },
  ],
};

const paragraphWithBold = {
  type: 'PARAGRAPH',
  nodes: [
    {
      type: 'TEXT',
      textData: {
        text: 'Hello World',
        decorations: [{ type: 'BOLD' }],
      },
    },
  ],
};

const mockedTranslate = jest.fn();

const repository: EditablesRepository = {
  commit: (descriptorManager: NodeDescriptorManager) => {
    mockedTranslate(
      descriptorManager
        .getDescriptors()
        .getModified()
        .getNodes()
        .map(n => n.getRefinedNode())[0]
    );
  },
  // TODO: RicosParagraphNodes to be exposed as RicosContent.getParagraphs API
  // TODO: RefinedNode.of should involve validation/type guards
  getEditables: () => EditableParagraphs.of(paragraph.nodes as unknown as ParagraphNode[]),
};

const setBoldCommand: CommandDescriptor = {
  name: 'setBold',
  execute:
    ({ model }) =>
    () =>
      model.modify((n: EditableParagraph) => n.setDecoration({ type: Decoration_Type.BOLD })),
};

// TODO: command composition test
describe('EditorCommandRunner', () => {
  it('should allow to run setBold command', () => {
    const runner = new EditorCommandRunner(repository);
    runner.register(setBoldCommand);
    const commands = runner.getCommands();
    // TODO: support commands autocomplete like in tiptap (name, args)
    // TODO: no parameter should be passed
    commands.setBold('');
    expect(mockedTranslate).lastCalledWith(paragraphWithBold);
  });
});
