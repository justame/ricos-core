import type { FC } from 'react';
import React from 'react';

export const renderSideBlockComponent = (
  id: string,
  dir: string,
  Component: FC<{ id: string }>
) => {
  const node = document.querySelectorAll(`[data-offset-key="${id}-0-0"]`)[0] as HTMLElement;
  if (node?.offsetParent) {
    const { top } = node.getBoundingClientRect();
    const { top: parentTop, width } = node.offsetParent.getBoundingClientRect();
    const insetInlineStart = (dir === 'ltr' ? width : 0) + 10;
    return (
      <div
        style={{
          position: 'absolute',
          top: top - parentTop,
          insetInlineStart,
        }}
      >
        <Component id={id} />
      </div>
    );
  }
};
