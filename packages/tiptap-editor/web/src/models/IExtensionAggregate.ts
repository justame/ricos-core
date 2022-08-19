import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import * as N from 'fp-ts/number';
import * as O from 'fp-ts/Ord';
import type { Aggregate, IExtension } from './domain-types';

const byPriority: O.Ord<IExtension> = pipe(
  N.Ord,
  O.contramap((ext: IExtension) => ext.priority)
);

export class IExtensionAggregate<T extends IExtension> implements Aggregate<IExtension> {
  extensions: T[];

  constructor(extensions: T[]) {
    this.extensions = extensions;
  }

  sort() {
    return new IExtensionAggregate(pipe(this.extensions, A.sort(byPriority)));
  }

  filter(predicate: (ext: T) => boolean) {
    return new IExtensionAggregate(this.extensions.filter(predicate));
  }

  asArray() {
    return this.sort().extensions;
  }
}
