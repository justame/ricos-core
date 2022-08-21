/* eslint-disable max-len */
import React from 'react';

const LineSpacingIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <g>
            <path
              d="M4.5 3L7 6H5v9h2l-2.5 3L2 15h2V6H2l2.5-3zM18 16v1H9v-1h9zm0-4v1H9v-1h9zm0-4v1H9V8h9zm0-4v1H9V4h9z"
              transform="translate(-605.000000, -80.000000) translate(603.500000, 77.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <svg width={19} height={19} viewBox="0 0 19 19" {...props}>
      <path d="M9.2 7h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H9.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 3h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H9.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 3h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H9.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0-9h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H9.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2z" />
      <path d="M5.854 4.707L7 5.853l.707-.707-2-2-.005-.003-.157-.104L5.354 3l-.191.039-.157.104L5 3.146l-2 2s.708.706.707.707l1.147-1.146v8.586l-1.146-1.146-.707.707 2 2 .162.108.189.038.193-.039.162-.107 2-2L7 12.147l-1.146 1.146V4.707z" />
    </svg>
  );
};

export default LineSpacingIcon;
