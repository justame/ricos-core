import type { Helpers, onToolbarButtonClickArgs } from 'wix-rich-content-common';
import { ToolbarType } from 'wix-rich-content-common';

/**
 * Corrects 'Inline' toolbar for monitoring purposes
 * @param type ToolbarType
 * @returns Corrected toolbarType name
 */
const monitoringTypeName = (type: ToolbarType) =>
  type === ToolbarType.INLINE ? ToolbarType.FORMATTING : type;

export const withToolbarType = (helpers: Helpers, type: ToolbarType) => ({
  ...helpers,
  onToolbarButtonClick: (args: onToolbarButtonClickArgs) =>
    helpers?.onToolbarButtonClick?.({ ...args, type: monitoringTypeName(type) }),
});
