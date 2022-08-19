import { version as VERSION } from '../../package.json';
import { getEmptyDraftContent } from 'wix-rich-content-editor-common';
import { createDataConverter } from './editorUtils';
import type { DraftContent } from 'wix-rich-content-common';

const content: DraftContent = { ...getEmptyDraftContent(), VERSION };

describe('editorUtils', () => {
  it('should preserve content after init phase', () => {
    const dataConverter = createDataConverter([undefined, undefined], content);
    const newContent = dataConverter.getContentState();
    expect(content).toStrictEqual(newContent);
  });

  it('should create ID & VERSION in init phase, if not exist', () => {
    const { ID: _, VERSION: __, ...partialContent } = content;
    const dataConverter = createDataConverter([undefined, undefined], partialContent);
    const newContent = dataConverter.getContentState();
    expect(newContent).toEqual(expect.objectContaining(partialContent));
    expect(newContent).toHaveProperty('ID');
    expect(newContent.ID).toBeTruthy();
    expect(newContent).toHaveProperty('VERSION');
    expect(newContent.VERSION).toBeTruthy();
  });
});
