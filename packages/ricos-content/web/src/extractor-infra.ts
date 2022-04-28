import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { fromPredicate } from 'fp-ts/Option';
import * as T from 'fp-ts/Tree';
import type { Traversal } from 'monocle-ts';
import { fromTraversable, Lens, Prism } from 'monocle-ts';

/**
 *
 *
 * Tree-like structure feature extractor
 * @template DT extraction unit data type
 */
export interface Extractor<DT> {
  filter: (predicate: (data: DT) => boolean) => Extractor<DT>;
  map: <MT>(mapper: (data: DT) => MT) => Extractor<MT>;
  chain: <CT>(mapper: (data: DT) => Extractor<CT>) => Extractor<CT>[];
  get: () => DT[];
}

/**
 *
 *
 * @template NodeT tree node type
 * @param {(node: NodeT) => NodeT[]} nodesAccessor how to access child nodes
 * @param {(root: NodeT)} root tree root (curried)
 */
export const getExtractor =
  <NodeT>(nodesAccessor: (node: NodeT) => NodeT[]) =>
  (root: NodeT): Extractor<NodeT> => {
    class TraversalExtractor<DT> implements Extractor<DT> {
      traversal: Traversal<T.Tree<NodeT>, DT>;

      tree: T.Tree<NodeT>;

      constructor(traversal: Traversal<T.Tree<NodeT>, DT>, tree: T.Tree<NodeT>) {
        this.traversal = traversal;
        this.tree = tree;
      }

      filter(predicate: (data: DT) => boolean) {
        return new TraversalExtractor<DT>(
          this.traversal.composePrism(Prism.fromPredicate(predicate)),
          this.tree
        );
      }

      map<MT>(mapper: (data: DT) => MT) {
        return new TraversalExtractor<MT>(
          this.traversal.composeLens(new Lens<DT, MT>(mapper, () => (dt: DT) => dt)),
          this.tree
        );
      }

      chain<CT>(mapper: (data: DT) => TraversalExtractor<CT>): Extractor<CT>[] {
        return pipe(this.get(), A.map(mapper));
      }

      get() {
        return pipe(
          this.traversal.asFold().getAll(this.tree),
          A.map(fromPredicate(Boolean)),
          A.compact
        );
      }
    }

    const tree = T.unfoldTree<NodeT, NodeT>(root, node => [node, nodesAccessor(node)]);
    return new TraversalExtractor(fromTraversable(T.tree)<NodeT>(), tree);
  };
