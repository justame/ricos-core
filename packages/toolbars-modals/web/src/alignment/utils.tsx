import { AlignLeftIcon, AlignTextCenterIcon, AlignRightIcon, AlignJustifyIcon } from './icons';
import type { EditorCommands, TextAlignment } from 'ricos-types';

export const getCurrentTextAlignment = (editorCommands: EditorCommands): TextAlignment => {
  return editorCommands?.getTextAlignment() || 'left';
};

export const alignmentIconsMap = {
  left: AlignLeftIcon,
  center: AlignTextCenterIcon,
  right: AlignRightIcon,
  justify: AlignJustifyIcon,
};

export const getCurrentTextAlignmentIcon = (
  editorCommands: EditorCommands
): ((props) => JSX.Element) => {
  const selectedAlignment = getCurrentTextAlignment(editorCommands);
  return alignmentIconsMap[`${selectedAlignment}`];
};
