/* eslint-disable max-len */
import React from 'react';

const increaseIndentPluginIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <g>
            <path
              d="M16.5 15.999V17h-13v-1.001h13zm0-3.999v1h-7v-1h7zm-13-4l3 2.5-3 2.5V8zm13 0v1h-7V8h7zm0-4v1h-13V4h13z"
              transform="translate(-537.000000, -81.000000) translate(534.000000, 77.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      {...props}
    >
      <defs>
        <path
          id="increase-indent"
          d="M3.973 3l1.89 2 .002.006.098.157.037.191-.037.191-.098.157-.003.005-1.889 2L3.306 7l1.082-1.146H0v-1h4.388L3.306 3.707 3.973 3z"
        />
      </defs>
      <g fillRule="evenodd" transform="translate(2 4)">
        <g fillRule="nonzero">
          <path
            d="M.2 0h10.6c.11 0 .2.09.2.2v.6c0 .11-.09.2-.2.2H.2C.09 1 0 .91 0 .8V.2C0 .09.09 0 .2 0zM5.2 5h5.6c.11 0 .2.09.2.2v.6c0 .11-.09.2-.2.2H5.2c-.11 0-.2-.09-.2-.2v-.6c0-.11.09-.2.2-.2zM.2 10h10.6c.11 0 .2.09.2.2v.6c0 .11-.09.2-.2.2H.2c-.11 0-.2-.09-.2-.2v-.6c0-.11.09-.2.2-.2z"
            transform="translate(3)"
          />
        </g>
        <use xlinkHref="#increase-indent" />
      </g>
    </svg>
  );
};

export default increaseIndentPluginIcon;
