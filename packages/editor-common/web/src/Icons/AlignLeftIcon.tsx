/* eslint-disable max-len */
import React from 'react';

const AlignLeftIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <g>
            <path
              d="M12 16v1H4v-1h8zm4.001-4v1H4v-1h12.001zM12 8v1H4V8h8zm4.001-4v1H4V4h12.001z"
              transform="translate(-417.000000, -81.000000) translate(413.000000, 77.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <svg width={19} height={19} viewBox="0 0 19 19" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M4.2 5h10.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H4.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 6h10.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H4.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0-3h6.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H4.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 6h4.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H4.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2z"
      />
    </svg>
  );
};

export default AlignLeftIcon;
