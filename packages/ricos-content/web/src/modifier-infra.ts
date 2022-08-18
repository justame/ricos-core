import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import * as T from 'fp-ts/Tree';
import type { Traversal } from 'monocle-ts';
import { fromTraversable, Prism } from 'monocle-ts';
import { generateId } from './converters/generateRandomId';

/**
 *
 *
 * Tree-like structure modification API, parametrized by node type
 * @template NodeT tree node type
 */
export interface Modifier<NodeT> {
  filter: (predicate: (node: NodeT) => boolean) => Modifier<NodeT>;
  set: (setter: (node: NodeT) => NodeT | NodeT[]) => NodeT;
}

type ModTreeNode<T> = T & {
  _modId: string;
};

/**
 * Creates a tree modifier parametrized by node type
 *
 * @template NodeT tree node type
 * @param {(node: NodeT) => NodeT[]} nodesAccessor how to get to child nodes
 * @param {(nodes: NodeT[]) => { [key: string]: NodeT[] }} nodesSetter how to add inner nodes into a parent
 * @param {(root: NodeT)} root tree root (curried)
 */
export const getModifier =
  <NodeT>(
    nodesAccessor: (node: NodeT) => NodeT[],
    nodesSetter: (nodes: NodeT[]) => { [key: string]: NodeT[] }
  ) =>
  (root: NodeT): Modifier<NodeT> => {
    class TraversalModifier implements Modifier<NodeT> {
      traversal: Traversal<T.Tree<ModTreeNode<NodeT>>, NodeT>;

      tree: T.Tree<ModTreeNode<NodeT>>;

      constructor(
        tree: T.Tree<ModTreeNode<NodeT>>,
        traversal: Traversal<T.Tree<ModTreeNode<NodeT>>, NodeT>
      ) {
        this.tree = tree;
        this.traversal = traversal;
      }

      filter(predicate: (node: NodeT) => boolean) {
        return new TraversalModifier(
          this.tree,
          this.traversal.composePrism(Prism.fromPredicate(predicate))
        );
      }

      set(setter: (node: NodeT) => NodeT | NodeT[]) {
        return pipe(
          this.traversal.asFold().getAll(this.tree),
          A.map((node: ModTreeNode<NodeT>) => node._modId),
          foldTree(this.tree, setter)
        );
      }
    }

    const modifyById =
      (idsToSet: string[], setter: (node: NodeT) => NodeT | NodeT[]) =>
      (modTreeNode: ModTreeNode<NodeT>) => {
        const { _modId, ...rest } = modTreeNode;
        const node = rest as unknown as NodeT;
        return idsToSet.includes(_modId) ? setter(node) : node;
      };

    const mergeWith = (prefix: NodeT[]) => (suffix: NodeT[]) => [...prefix, ...suffix];

    const toArray = (node: NodeT) => (Array.isArray(node) ? node : A.of(node));

    const foldTree =
      (tree: T.Tree<ModTreeNode<NodeT>>, setter: (node: NodeT) => NodeT | NodeT[]) =>
      (idsToSet: string[]): NodeT =>
        T.fold<ModTreeNode<NodeT>, NodeT>((root, forest) => ({
          ...root,
          ...nodesSetter(
            forest.reduce(
              (modifiedForest, node) =>
                pipe(node, modifyById(idsToSet, setter), toArray, mergeWith(modifiedForest)),
              [] as NodeT[]
            )
          ),
        }))(tree);

    const tree = T.unfoldTree<ModTreeNode<NodeT>, NodeT>(root, node => [
      { ...node, _modId: generateId() },
      nodesAccessor(node),
    ]);

    return new TraversalModifier(tree, fromTraversable(T.tree)<ModTreeNode<NodeT>>());
  };
