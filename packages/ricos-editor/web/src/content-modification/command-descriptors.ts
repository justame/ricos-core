import type { CommandDescriptor } from 'ricos-types';

/**
 * Aggregates the CommandDescriptor.
 * Exposes the descriptors in forms of array and map by name.
 *
 */
export class CommandDescriptors {
  private descriptors: CommandDescriptor<unknown>[];

  /**
   * Instantiates CommandDescriptors
   *
   * @static
   * @param {CommandDescriptor[]} descriptors
   * @returns
   * @memberof CommandDescriptors
   */
  static of(descriptors: CommandDescriptor[]) {
    return new CommandDescriptors(descriptors);
  }

  private constructor(descriptors: CommandDescriptor<unknown>[]) {
    this.descriptors = descriptors;
  }

  /**
   * Appends a descriptor to aggregate
   *
   * @param {CommandDescriptor<unknown>} descriptor
   * @returns
   * @memberof CommandDescriptors
   */
  append(descriptor: CommandDescriptor<unknown>) {
    return new CommandDescriptors([...this.descriptors, descriptor]);
  }

  /**
   * Exposes descriptors as CommandDescriptor[]
   *
   * @returns
   * @memberof CommandDescriptors
   */
  asArray() {
    return this.descriptors;
  }

  /**
   * Exposes descriptors as map-by-name with swapped args for easier composition
   *
   * @returns  {{ [name: CommandDescriptor<unknown>['name']]: CommandDescriptor<unknown> }}
   * @memberof CommandDescriptors
   */
  asMap(): { [name: CommandDescriptor<unknown>['name']]: CommandDescriptor<unknown> } {
    return this.descriptors.reduce(
      (map, descriptor) => ({
        ...map,
        [descriptor.name]:
          <Args>(args: Args) =>
          ({ model, commands }) =>
            descriptor.execute({ model, commands })(args),
      }),
      {}
    );
  }
}
