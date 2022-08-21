/* eslint-disable max-len */
import React from 'react';

const CodeBlockIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <g>
            <path
              d="M10.917 4l.968.25-3.108 12-.969-.25 3.109-12zM5.528 5.253l.732.682-3.893 4.18 3.893 4.178-.732.682L1 10.115l4.528-4.862zm8.62 0l4.553 4.862-4.553 4.86-.73-.684 3.912-4.176-3.912-4.178.73-.684z"
              transform="translate(-345.000000, -81.000000) translate(344.000000, 77.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <svg width={19} height={19} viewBox="0 0 19 19" {...props}>
      <path
        fillRule="evenodd"
        d="M2 3h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm0 1v11h15V4H2zm12.8 9H9.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h5.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2zm-10.542.25a.2.2 0 0 1-.282 0l-.425-.425a.2.2 0 0 1 0-.283l3.041-3.041-3.04-3.04a.2.2 0 0 1 0-.283l.424-.425a.2.2 0 0 1 .283 0l3.606 3.606a.2.2 0 0 1 0 .283l-3.607 3.607z"
      />
    </svg>
  );
};

export default CodeBlockIcon;
