/* eslint-disable max-len */
import React from 'react';

const TitleTwoIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <path
            d="M293 137v1h-4v11h-1v-11h-4v-1h9zm1 6c1.103 0 2 .897 2 2 0 .458-.194.897-.534 1.206l-1.98 1.794H296v1h-4v-1.002l2.794-2.532c.13-.119.206-.289.206-.466 0-.552-.448-1-1-1s-1 .448-1 1h-1c0-1.103.898-2 2-2z"
            transform="translate(-284.000000, -137.000000)"
          />
        </g>
      </g>
    </svg>
  ) : (
    <svg width={19} height={19} viewBox="0 0 19 19" {...props}>
      <path
        d="M9 8h2.8a.2.2 0 0 0 .2-.2V6.2a.2.2 0 0 0-.2-.2H4.2a.2.2 0 0 0-.2.2v1.6c0 .11.09.2.2.2H7v6.8c0 .11.09.2.2.2h1.6a.2.2 0 0 0 .2-.2V8zm3.2 6h.8v-.8c0-.11.09-.2.2-.2h.8v1h.8c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2h-2.6a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm-.2-2.2v-.6c0-.11.09-.2.2-.2h2.6c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H14v-1h-1.8a.2.2 0 0 1-.2-.2z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TitleTwoIcon;
