/* eslint-disable max-len */
import React from 'react';

const OrderedListIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <g>
            <path
              d="M6 14v4H3v-1h2v-.5H4v-1h1V15H3v-1h3zm11 2v1H8v-1h9zM6 8v1.809l-2 1V11h2v1H3v-1.809l2-1V9H3V8h3zm11 2v1H8v-1h9zM5 2v4H4V3H3V2h2zm12 2v1H8V4h9z"
              transform="translate(-469.000000, -79.000000) translate(466.000000, 77.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={19}
      height={19}
      viewBox="0 0 19 19"
      {...props}
    >
      <defs>
        <path
          id="ordered-list-icon-path"
          d="M8.2 4h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H8.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 5h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H8.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 5h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H8.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm-5 1H5v-1h.8c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H3.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm.8-2h-.8a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h2.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H5v1h-.8a.2.2 0 0 1-.2-.2V13zm-.8-3H4v-.8c0-.11.09-.2.2-.2H5v1h.8c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H3.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zM3 7.8v-.6c0-.11.09-.2.2-.2h2.6c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H5V8H3.2a.2.2 0 0 1-.2-.2zM4 3h-.8a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h1.6c.11 0 .2.09.2.2v3.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2V3z"
        />
      </defs>
      <g fillRule="evenodd">
        <mask id="ordered-list-icon-mask">
          <use xlinkHref="#ordered-list-icon-path" />
        </mask>
        <use fillRule="nonzero" xlinkHref="#ordered-list-icon-path" />
      </g>
    </svg>
  );
};

export default OrderedListIcon;
