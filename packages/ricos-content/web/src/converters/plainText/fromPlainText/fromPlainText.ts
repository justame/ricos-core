import type { Node } from '@justame-ricos/ricos-schema';
import { RichContent } from '@justame-ricos/ricos-schema';
import { createParagraphNode, createTextNode, initializeMetadata } from '../../nodeUtils';

export const fromPlainText = (text: string): RichContent => {
  const paragraphs = text
    .split('\n')
    .map(
      (paragraph: string): Node => createParagraphNode(paragraph ? [createTextNode(paragraph)] : [])
    );

  const content: RichContent = {
    nodes: paragraphs,
    metadata: initializeMetadata(),
  };

  return RichContent.fromJSON(content);
};
