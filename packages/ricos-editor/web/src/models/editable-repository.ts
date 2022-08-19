import type { RefinedNode } from 'ricos-content';
import type { Editables } from 'ricos-types';
import type { NodeDescriptorManager } from './editable-node-descriptor';
/**
 * Translates underlying editor state to Editable based model, back and forth
 *
 * @category internal
 */
export interface EditablesRepository {
  /**
   * Constructs Editable based model
   *
   * @returns  Editables model
   * @memberof EditablesRepository
   */
  getEditables(): Editables<RefinedNode>;

  /**
   * Commits the altered nodes to the underlying editor state
   *
   * @param {NodeDescriptorManager} descriptors
   * @memberof EditablesRepository
   */
  commit(descriptors: NodeDescriptorManager): void;
}
