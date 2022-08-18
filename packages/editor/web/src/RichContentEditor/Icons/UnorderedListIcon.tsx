/* eslint-disable max-len */
import React from 'react';

const UnorderedListIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <g>
            <path
              d="M4.25 15c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25S3 16.94 3 16.25 3.56 15 4.25 15zm13.5.75v1h-10v-1h10zM4.25 9c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25S3 10.94 3 10.25 3.56 9 4.25 9zm13.5.75v1h-10v-1h10zM4.25 3c.69 0 1.25.56 1.25 1.25S4.94 5.5 4.25 5.5 3 4.94 3 4.25 3.56 3 4.25 3zm13.5.75v1h-10v-1h10z"
              transform="translate(-501.000000, -80.000000) translate(498.000000, 77.000000)"
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
          id="unordered-list-icon-path"
          d="M4.2 4h.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm3 0h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H7.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 5h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H7.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 5h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H7.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm-3 0h.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0-5h.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2z"
        />
      </defs>
      <g fillRule="evenodd">
        <mask id="unordered-list-icon-mask">
          <use xlinkHref="#unordered-list-icon-path" />
        </mask>
        <use fillRule="nonzero" xlinkHref="#unordered-list-icon-path" />
      </g>
    </svg>
  );
};

export default UnorderedListIcon;
