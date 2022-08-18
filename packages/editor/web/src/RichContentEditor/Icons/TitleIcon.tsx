/* eslint-disable max-len */
import React from 'react';

const TitleIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <g>
            <path
              d="M12 4v1H8v11H7V5H3V4h9zm6 4v1h-3v7h-1V9h-3V8h7z"
              transform="translate(-283.000000, -81.000000) translate(280.000000, 77.000000)"
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
          id="title-icon-path"
          d="M15 10v4.8a.2.2 0 0 1-.2.2h-1.6a.2.2 0 0 1-.2-.2V10h-1.8a.2.2 0 0 1-.2-.2V8.2c0-.11.09-.2.2-.2h5.6c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H15zM8 6v8.8a.2.2 0 0 1-.2.2H6.2a.2.2 0 0 1-.2-.2V6H2.2a.2.2 0 0 1-.2-.2V4.2c0-.11.09-.2.2-.2h9.6c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H8z"
        />
      </defs>
      <g fillRule="evenodd">
        <mask id="title-icon-mask">
          <use xlinkHref="#title-icon-path" />
        </mask>
        <use fillRule="nonzero" xlinkHref="#title-icon-path" />
      </g>
    </svg>
  );
};

export default TitleIcon;
