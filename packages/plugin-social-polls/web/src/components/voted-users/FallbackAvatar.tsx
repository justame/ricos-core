/* eslint-disable max-len */
import React from 'react';

const FallbackAvatar = props => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="mask0_51:19729" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
        <circle cx="18" cy="18" r="18" fill="#E6E6E6" />
        <circle cx="18" cy="18" r="18" fill="#E6E6E6" />
      </mask>
      <g mask="url(#mask0_51:19729)">
        <circle cx="18" cy="18" r="18" fill="#F0F0F0" />
        <circle cx="18" cy="14" r="7" fill="#A6A6A6" />
        <circle cx="18" cy="41" r="18" fill="#A6A6A6" />
      </g>
    </svg>
  );
};

export default FallbackAvatar;
