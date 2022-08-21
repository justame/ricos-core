import React from 'react';
import FallbackAvatar from './FallbackAvatar';

export default function (props: { className: string; src?: string }) {
  const { className, src } = props;

  return src ? (
    <img className={className} src={src} alt="" />
  ) : (
    <FallbackAvatar className={className} />
  );
}
