import type { ComponentType } from 'react';
import React from 'react';
import { INTERACTIONS } from 'ricos-content/libs/preview';
import ReadMore from '../Components/ReadMore';
import SeeFullPost from '../Components/SeeFullPost';
import ImageCounter from '../Components/ImageCounter';
import type { PreviewConfig } from '..';

export const interactionMap = (onPreviewExpand: PreviewConfig['onPreviewExpand']) =>
  Object.entries({
    [INTERACTIONS.READ_MORE]: ReadMore,
    [INTERACTIONS.SEE_FULL_CONTENT]: SeeFullPost,
    [INTERACTIONS.IMAGE_COUNTER]: ImageCounter,
  }).reduce(
    (map, [key, Component]: [string, ComponentType]) => ({
      ...map,
      [key]: ({ children, ...props }) => (
        <Component {...{ onPreviewExpand, ...props }}>{children}</Component>
      ),
    }),
    {}
  );
