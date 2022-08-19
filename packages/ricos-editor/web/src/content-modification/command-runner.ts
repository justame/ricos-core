import type { CommandDescriptor, Commands } from 'ricos-types';
import type { CommandRunner } from '../models/command-runner';
import type { EditablesRepository } from '../models/editable-repository';
import type { NodeDescriptorManager } from '../models/editable-node-descriptor';

export class CommandDescriptors {
  private descriptors: CommandDescriptor<unknown>[];

  static of(descriptors: CommandDescriptor[]) {
    return new CommandDescriptors(descriptors);
  }

  private constructor(descriptors: CommandDescriptor<unknown>[]) {
    this.descriptors = descriptors;
  }

  append(descriptor: CommandDescriptor<unknown>) {
    return new CommandDescriptors([...this.descriptors, descriptor]);
  }

  asArray() {
    return this.descriptors;
  }

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

export class EditorCommandRunner implements CommandRunner {
  private descriptors: CommandDescriptors;

  repository: EditablesRepository;

  constructor(repository: EditablesRepository) {
    this.repository = repository;
    this.descriptors = CommandDescriptors.of([]);
  }

  register(descriptor: CommandDescriptor<unknown>) {
    this.descriptors = this.descriptors.append(descriptor);
  }

  getCommands(): Commands {
    return this.descriptors.asArray().reduce(
      (commands, descriptor) => ({
        ...commands,
        [descriptor.name]: <Args>(args: Args) => {
          const model = this.repository.getEditables();
          const modifiedModel = descriptor.execute({
            model,
            commands: this.descriptors.asMap(),
          })(args);
          this.repository.commit(modifiedModel as unknown as NodeDescriptorManager);
        },
      }),
      {}
    );
  }
}
