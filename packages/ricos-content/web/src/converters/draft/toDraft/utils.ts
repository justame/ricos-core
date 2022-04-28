import type { MediaPrivacy } from './../../../types/mediaUploadTypes';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updatePrivacyField = (target: Record<string, any>, isPrivate: boolean | undefined) => {
  const privacy: MediaPrivacy | undefined =
    typeof isPrivate !== 'undefined' ? (isPrivate && 'private') || 'public' : undefined;
  target.privacy = privacy;
};
