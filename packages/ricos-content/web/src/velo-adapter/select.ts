import { get } from 'lodash';
import type { RichContent, Node } from 'ricos-schema';
import type { Extractor } from '../extractor-infra';
import type { Modifier } from '../modifier-infra';
import type { RichContentModifier } from '../RicosContentAPI/modify';
import { modify } from '../RicosContentAPI/modify';
import { extract } from '../RicosContentAPI/extract';
import { compare } from './utils';

class Select {
  private extractor: Extractor<Node>;

  private modifier: RichContentModifier;

  private content: RichContent;

  private onSet?: (content: RichContent) => void;

  private _limit: number;

  constructor(content: RichContent, onSet?: (content: RichContent) => void) {
    this.extractor = extract(content.nodes);
    this.modifier = modify(content);
    this.content = content;
    this.onSet = onSet;
    this._limit = -1;
  }

  private filter(predicate: (node: Node) => boolean) {
    this.extractor = this.extractor.filter(predicate);
    this.modifier = this.modifier.filter(predicate);
    return this;
  }

  /**
   * executes query selection
   * @returns query result
   */
  private get() {
    const results = this.extractor.get();
    if (this._limit >= 0) {
      return results.slice(0, this._limit);
    }
    return results;
  }

  eq(path: string, value: unknown) {
    return this.filter(node => get(node, path) === value);
  }

  gt(path: string, value: string | number) {
    return this.filter(node => compare(value, get(node, path)) > 0);
  }

  lt(path: string, value: string | number) {
    return this.filter(node => compare(value, get(node, path)) < 0);
  }

  isEmpty(path: string) {
    return this.filter(node => get(node, path) === undefined);
  }

  isNotEmpty(path: string) {
    return this.filter(node => get(node, path) !== undefined);
  }

  startsWith(path: string, value: string) {
    return this.filter(node => get(node, path)?.startsWith?.(value));
  }

  endsWith(path: string, value: string) {
    return this.filter(node => get(node, path)?.endsWith?.(value));
  }

  contains(path: string, value: string) {
    return this.filter(node => get(node, path)?.includes?.(value));
  }

  limit(count: number) {
    this._limit = count;
    return this;
  }

  count() {
    return this.get().length;
  }

  find() {
    return this.get();
  }

  modify(setter: Parameters<Modifier<Node>['set']>[0]): RichContent {
    const root = this.modifier.set(setter);
    const modifiedContent = { ...this.content, nodes: root.nodes };
    this.onSet?.(modifiedContent);
    return modifiedContent;
  }
}

export const select = (content: RichContent, onSet?: (content: RichContent) => void) =>
  new Select(content, onSet);
