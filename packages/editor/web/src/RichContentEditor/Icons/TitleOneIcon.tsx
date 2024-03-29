/* eslint-disable max-len */
import React from 'react';

const TitleOneIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <path
            d="M293 113v1h-4v11h-1v-11h-4v-1h9zm2 6v5h1v1h-3v-1h1v-4h-1v-1h2z"
            transform="translate(-284.000000, -113.000000)"
          />
        </g>
      </g>
    </svg>
  ) : (
    <svg width={19} height={19} viewBox="0 0 19 19" {...props}>
      <path
        d="M10 6v8.8a.2.2 0 0 1-.2.2H8.2a.2.2 0 0 1-.2-.2V6H4.2a.2.2 0 0 1-.2-.2V4.2c0-.11.09-.2.2-.2h9.6c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H10zm4 6h-.8a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h1.6c.11 0 .2.09.2.2v3.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2V12z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default TitleOneIcon;
