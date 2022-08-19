import classNames from 'classnames';
import type { AvailableExperiments, EditorStyleClasses } from 'wix-rich-content-common';

interface EditorStyleCreatorArgs {
  cssOverride?: Record<string, string>;
  isMobile?: boolean;
  draftStyles?: Record<string, string>;
  editorCss?: Record<string, string>;
  experiments?: AvailableExperiments;
}

type CreateEditorStyleClasses = (args: EditorStyleCreatorArgs) => EditorStyleClasses;

export const createEditorStyleClasses: CreateEditorStyleClasses = ({
  isMobile,
  cssOverride = {},
  editorCss = {},
  experiments = {},
}) => {
  const themeDesktopStyle = cssOverride.desktop
    ? { [cssOverride.desktop]: !isMobile && cssOverride && cssOverride.desktop }
    : {};
  const containerClassName = classNames(editorCss.wrapper, cssOverride.wrapper, {
    [editorCss.desktop]: !isMobile,
    ...themeDesktopStyle,
  });
  return {
    editorClassName: classNames(editorCss.editor, cssOverride.editor, {
      [editorCss.fixedTabSize]: experiments?.fixedTabSize?.enabled,
    }),
    containerClassName,
  };
};
