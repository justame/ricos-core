import type { TranslationFunction } from 'ricos-types';

type TooltipShortcutKeys = { MacOS: string; Windows: string };

const findOsName = (): 'Windows' | 'MacOS' | null => {
  if (navigator.userAgent.indexOf('Win') !== -1) return 'Windows';
  if (navigator.userAgent.indexOf('Mac') !== -1) return 'MacOS';
  return null;
};

export const getTooltip = (
  t: TranslationFunction,
  tooltipKey: string,
  tooltipShortcutKeys?: TooltipShortcutKeys
): string => {
  const osName = findOsName();

  if (tooltipShortcutKeys && osName) {
    return t(
      tooltipKey,
      tooltipShortcutKeys &&
        osName && {
          shortcut: tooltipShortcutKeys[osName],
        }
    );
  } else {
    return t(tooltipKey);
  }
};
