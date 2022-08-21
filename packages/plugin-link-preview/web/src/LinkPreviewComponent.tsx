import type { FunctionComponent } from 'react';
import React from 'react';
import LinkPreviewViewer from './LinkPreviewViewer';
import type { LinkPreviewPluginEditorConfig } from './types';
import type { RichContentTheme } from 'wix-rich-content-common';

interface LinkPreviewComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blockProps: Record<string, any>;
  settings: LinkPreviewPluginEditorConfig;
  theme: RichContentTheme;
  isMobile: boolean;
  iframeSandboxDomain: string;
}

const LinkPreviewComponent: FunctionComponent<LinkPreviewComponentProps> = ({
  blockProps,
  settings,
  theme,
  isMobile,
  iframeSandboxDomain,
}) => {
  return (
    <LinkPreviewViewer
      componentData={blockProps.getData()}
      settings={settings}
      theme={theme}
      isMobile={isMobile}
      iframeSandboxDomain={iframeSandboxDomain}
    />
  );
};

export default LinkPreviewComponent;
