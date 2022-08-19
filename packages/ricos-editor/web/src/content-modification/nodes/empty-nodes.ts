import type { Editables } from 'ricos-types';
export default class EmptyNodes implements Editables<never> {
  filter(): EmptyNodes {
    return this;
  }

  insert(): EmptyNodes {
    return this;
  }

  modify(): EmptyNodes {
    return this;
  }

  delete(): EmptyNodes {
    return this;
  }

  asArray() {
    return [] as never[];
  }

  getRefinedNodes() {
    return [] as never[];
  }

  static of(_: never[]): EmptyNodes {
    return new EmptyNodes();
  }
}
