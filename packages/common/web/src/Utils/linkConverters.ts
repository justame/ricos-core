import type { Link_Rel } from '../index';

const TOP = '_top';
const BLANK = '_blank';

export const convertRelObjectToString = (rel?: Link_Rel) =>
  `${rel?.nofollow ? 'nofollow ' : ''}${rel?.sponsored ? 'sponsored ' : ''}${
    rel?.ugc ? 'ugc' : ''
  }`.trim();

export const convertRelStringToObject = (rel?: string) => ({
  nofollow: rel?.includes('nofollow'),
  sponsored: rel?.includes('sponsored'),
  ugc: rel?.includes('ugc'),
});

export const convertTargetStringToBoolean = (target: string) => target === BLANK;

export const convertTargetBooleanToString = (targetBlank: boolean) => (targetBlank ? BLANK : TOP);

export const getRelValue = (rel?: string) => `noopener noreferrer ${rel || ''}`.trim();
