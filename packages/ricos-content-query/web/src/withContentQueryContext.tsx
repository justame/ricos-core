import React from 'react';
import { ContentQueryContext } from './ContentQueryContext';

export const withContentQueryContext = WrappedComponent => {
  return function (props) {
    return (
      <ContentQueryContext.Consumer>
        {contentQueryService => (
          <WrappedComponent {...props} contentQueryService={contentQueryService} />
        )}
      </ContentQueryContext.Consumer>
    );
  };
};
