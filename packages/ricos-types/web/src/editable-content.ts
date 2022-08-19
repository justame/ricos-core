import type { RefinedNode } from 'ricos-content';

/**
 * Represents Editor content node in editing context.
 * Adds functionality on top of RefinedNode (which, on turn, is based on proto-derived Node)
 *
 * @template T specific Refined Node
 */
export interface Editable<T extends RefinedNode> {
  getId(): T['id'];
  getSelection(): boolean;
  setSelection(selection: boolean): Editable<T>;
  getRefinedNode(): T;
  getNodes(): Editables<T['nodes'][number] & RefinedNode>;
  // style: NodeStyle; TODO: need to address it (getStyle, setStyle)
}

/**
 * Basic aggregate over Editable
 *
 */
export interface Editables<T extends RefinedNode> {
  /**
   * Filters nodes according to predicate
   *
   * @param {(node: Editable<T>) => boolean} predicate
   * @returns  {Editables<T>}
   * @memberof Editables
   */
  filter(predicate: (node: Editable<T>) => boolean): Editables<T>;

  /**
   * Appends a new node to nodes
   *
   * @param {T} node
   * @returns  {Editables<T>}
   * @memberof Editables
   */
  // to be expanded to insertBefore/insertAfter/append/insertAt
  insert(node: T): Editables<T>;

  /**
   * Modifies the Editable collection according to modification
   *
   * @param {(node: Editable<T>) => Editable<T>} modification
   * @returns  {Editables<T>}
   * @memberof Editables
   */
  modify(modification: (node: Editable<T>) => Editable<T>): Editables<T>;

  /**
   * Deletes nodes
   *
   * @returns  {Editables<T>}
   * @memberof Editables
   */
  delete(): Editables<T>;

  /**
   * Gets node array
   *
   * @returns  {Editable<T>[]}
   * @memberof Editables
   */
  asArray(): Editable<T>[];

  /**
   * Gets RefinedNode subtree
   *
   * @returns  {T[]}
   * @memberof Editables
   */
  getRefinedNodes(): T[];
}
