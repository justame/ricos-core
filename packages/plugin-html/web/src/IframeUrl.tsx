import type { FunctionComponent } from 'react';
import React from 'react';
import Iframe from './Iframe';

const IframeUrl: FunctionComponent = props => (
  <Iframe
    {...props}
    sandbox="allow-popups allow-presentation allow-forms allow-same-origin allow-scripts"
  />
);

export default IframeUrl;
