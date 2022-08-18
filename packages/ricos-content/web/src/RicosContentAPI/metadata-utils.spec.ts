import { duplicate, ensureContentId, extractIdFromContent } from './metadata-utils';
import migrationContent from '../../../../../e2e/tests/fixtures/migration-content.json';
import { fromDraft } from '../converters/draft';
import { compare } from '..';
import type { RichContent } from '@justame-ricos/ricos-schema';

describe('duplicate', () => {
  const content = fromDraft(migrationContent);
  const newContent = duplicate(content);
  it('should duplicate content', () => {
    expect(compare(newContent, content, { ignoredKeys: ['id'] })).toStrictEqual({});
  });
  it('should not duplicate content id', () => {
    expect(content.metadata?.id).toBeTruthy();
    expect(newContent.metadata?.id).toBeTruthy();
    expect(newContent.metadata?.id).not.toStrictEqual(content.metadata?.id);
  });
});

describe('ensureContentId', () => {
  it('should create new content if param is undefined', () => {
    const content = ensureContentId();
    expect(content).toBeTruthy();
    expect(content.metadata).toBeTruthy();
    expect(content.metadata?.id).toBeTruthy();
  });
  it('should generate id for content with empty id', () => {
    const content = ensureContentId({
      nodes: [],
    });
    expect(content).toBeTruthy();
    expect(content.metadata).toBeTruthy();
    expect(content.metadata?.id).toBeTruthy();
  });
  it('should keep content unchanged if contains id', () => {
    const contentMock = {
      nodes: [],
      metadata: { id: '123', version: 1 },
    };
    const content = ensureContentId(contentMock);
    expect(content).toStrictEqual(contentMock);
  });
});

describe('extractIdFromContent', () => {
  it('should extract id from content', () => {
    const content: RichContent = {
      nodes: [],
      metadata: { id: '123', version: 1 },
    };
    const id = extractIdFromContent(content);
    expect(id).toEqual('123');
  });
  it('should return `undefined` if `id` does not exist', () => {
    const content: RichContent = {
      nodes: [],
      metadata: { version: 1 },
    };
    const id = extractIdFromContent(content);
    expect(id).toEqual(undefined);
  });
});
