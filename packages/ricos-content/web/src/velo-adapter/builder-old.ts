import { setupContentBuilder } from '../RicosContentAPI/RicosContentBuilder';
import { generateId } from '../converters/generateRandomId';
import { flow } from 'lodash';
import { pipe } from 'fp-ts/function';
import { applyContent } from './consts';
import type { RichContent } from '@justame-ricos/ricos-schema';
import type { ContentBuilderAdapterOld, CreateBuilderOld } from './types';
import type { ContentBuilder } from '../types';
import { addImage } from './nativeElements/addImage';

const extractBuilderMethods: (
  builder: ReturnType<typeof setupContentBuilder>
) => ContentBuilder = ({ RicosContentBuilder: _, ...rest }) => rest;

const notify: CreateBuilderOld = (content, callback) => {
  callback?.(content);
  return createBuilder(content, callback);
};

const applyBuilderPattern: (
  content: RichContent,
  callback?: (content: RichContent) => void
) => (methods: ContentBuilder) => ContentBuilderAdapterOld = (content, callback) => methods =>
  Object.entries(methods).reduce(
    (prev, [key, func]: [string, (arg) => RichContent]) => ({
      ...prev,
      [key]: flow(applyContent(content), func, newContent => notify(newContent, callback)),
    }),
    {} as ContentBuilderAdapterOld
  );

export const createBuilder: CreateBuilderOld = (content, callback?) => {
  const originalMethods = pipe(generateId, setupContentBuilder, extractBuilderMethods);
  const adapterMethods = pipe(originalMethods, applyBuilderPattern(content, callback));
  return {
    ...adapterMethods,
    addImage: flow(addImage, applyContent(content), originalMethods.addImage, newContent =>
      notify(newContent, callback)
    ),
    get: () => content,
  };
};
