import { pipe } from 'fp-ts/function';
import type { Node, RichContent } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import type { Modifier } from '../modifier-infra';
import { getModifier } from '../modifier-infra';

export type RichContentModifier = {
  filter: (predicate: (node: Node) => boolean) => RichContentModifier;
  set: (setter: (node: Node) => Node | Node[]) => RichContent;
};

const nodesAccessor = (node: Node) => node.nodes;

const nodesSetter = (nodes: Node[]) => ({ nodes });

const getRootNode = (content: RichContent): Node => ({
  id: 'root',
  type: Node_Type.UNRECOGNIZED,
  nodes: content.nodes,
});

/**
 * Utilizes function binding and scope to override Modifier.set behavior
 */
const toRichContentModifier = (content: RichContent) =>
  function (modifier: Modifier<Node>): RichContentModifier {
    const self: { modifier: RichContentModifier } = { modifier };
    return {
      filter(predicate: Parameters<Modifier<Node>['filter']>[0]) {
        self.modifier = modifier.filter.bind(self.modifier)(predicate);
        self.modifier.set = this.set;
        self.modifier.filter = this.filter;
        return self.modifier;
      },
      set(setter: Parameters<Modifier<Node>['set']>[0]) {
        const root = modifier.set.bind(self.modifier)(setter);
        return { ...content, nodes: root.nodes };
      },
    };
  };

export const modify = (content: RichContent): RichContentModifier =>
  pipe(
    content,
    getRootNode,
    getModifier<Node>(nodesAccessor, nodesSetter),
    toRichContentModifier(content)
  );
