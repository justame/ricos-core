import type { RefinedNode } from 'ricos-content';
import type { Editables } from './editable-content';

/**
 *
 * Represents any Editor command.
 *
 *  Example:
 *  ```ts
 *  const command: CommandDescriptor<Divider_Style> = {
 *    name: appendDividersToImages,
 *    execute: (style: Divider_Style) => (model: RicosContent) =>
 *       model
 *         .filter(byType(Node_Type.IMAGE))
 *         .modify(n => [n, Divider.create(style)]);
 *  }
 *  ```
 *
 * @template Args usually RichContent-related data item handled by this Command
 */
export interface CommandDescriptor<Args = never> {
  /**
   * The command name
   *
   * @type {string}
   * @memberof CommandDescriptor
   */
  name: string;
  /**
   * Describes the command logic over provided content model, while optionally utilizing predefined commands
   *
   * @param {Editables<RefinedNode>} model
   * @param { [key: CommandDescriptor['name']]: Command } commands
   * @returns  {Editables<RefinedNode>}
   * @memberof CommandDescriptor
   */
  execute({
    model,
    commands,
  }: {
    model: Editables<RefinedNode>;
    commands: CommandDescriptors;
  }): (args: Args) => Editables<RefinedNode>;
}

declare class CommandDescriptors {
  static of(descriptors: CommandDescriptor[]): CommandDescriptors;
}

/**
 * A map of partially applied command executions
 *
 *  Example:
 *  ```ts
 *  const commands: Commands = {
 *    appendDividersToImages:
 *      (style: Divider_Style) => appendDividersToImages.execute(style),
 *    setAlignmentToDividers:
 *      (alignment: Alignment) => setAlignmentToDividers.execute(alignment)
 *  };
 *
 *  ...
 *
 *  const composedCommand: CommandDescriptor<{ style: Divider_Style, alignment: Alignment }> = {
 *    name: appendAlignedDividersToImages,
 *    execute = ({ style, alignment }) => (model, commands) =>
 *      pipe(
 *        model,
 *        commands.appendDividersToImages(style),
 *        commands.setAlignmentToDividers(alignment)
 *      )
 *  }
 *
 *  ```
 */
export interface Commands {
  [name: CommandDescriptor['name']]: <Args>(args: Args) => void;
}
