import type { DraftContent, RefinedNode } from 'ricos-content';

export interface NodeDraftConverter {
  of(node: RefinedNode): NodeDraftConverter;
  toDraftContent(): DraftContent;
}

export interface NodeDraftConverters {
  of(nodes: RefinedNode[]): NodeDraftConverter;
  toDraftContent(): DraftContent;
}
