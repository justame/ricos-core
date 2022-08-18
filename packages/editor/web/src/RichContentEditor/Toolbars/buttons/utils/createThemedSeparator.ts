import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { Separator } from 'wix-rich-content-ui-components';
import type { RichContentTheme } from 'wix-rich-content-common';

export default ({ theme = {} }: { theme: RichContentTheme }) => {
  const separatorProps: { name: string; horizontal: boolean; className?: string } = {
    name: 'Separator',
    horizontal: false,
  };
  const { separatorStyles } = theme;
  if (separatorStyles && separatorStyles.inlineToolbarSeparator) {
    separatorProps.className = separatorStyles.inlineToolbarSeparator;
  }
  if (separatorStyles && separatorStyles.separator) {
    separatorProps.className = separatorStyles.separator;
  }
  return decorateComponentWithProps(Separator, separatorProps);
};
