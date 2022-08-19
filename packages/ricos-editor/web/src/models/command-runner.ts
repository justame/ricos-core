import type { CommandDescriptor, Commands } from 'ricos-types';

/**
 * Manages and runs Commands
 *
 */
export interface CommandRunner {
  /**
   * Registers Command defined by descriptor, validates name uniqueness
   *
   * @param {CommandDescriptor} descriptor
   * @memberof CommandRunner
   */
  register(descriptor: CommandDescriptor): void;
  /**
   * Gets registered commands, mapped by name
   *
   * @returns  {Commands}
   * @memberof CommandRunner
   */
  getCommands(): Commands;
}
