/* eslint-disable max-len */
import React from 'react';

const AvatarIcon = props => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <circle cx="14" cy="14" r="14" fill="white" />
    <circle cx="14" cy="14" r="14" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_2102_19716" transform="scale(0.00833333)" />
      </pattern>
      <image
        id="image0_2102_19716"
        width="120"
        height="120"
        xlinkHref="data:image/jpeg;base64,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"
      />
    </defs>
  </svg>
);

export default AvatarIcon;
