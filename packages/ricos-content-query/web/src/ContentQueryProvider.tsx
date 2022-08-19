import React, { useContext } from 'react';
import type { Editor } from '@tiptap/react';
import type { FC, ReactNode } from 'react';
import { ContentQueryContext } from './ContentQueryContext';

export type ContentQueryProviderProps = {
  editor: Editor;
  children: ReactNode;
};

export const ContentQueryProvider: FC<ContentQueryProviderProps> = (
  props: ContentQueryProviderProps
) => {
  const { children, editor } = props;
  const contentQueryService = useContext(ContentQueryContext);

  contentQueryService.setEditor(editor);

  return (
    <ContentQueryContext.Provider value={contentQueryService}>
      {children}
    </ContentQueryContext.Provider>
  );
};
