/* eslint-disable max-len */
import React from 'react';

const UnderlineIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <g>
            <path
              d="M15 16v1H5v-1h10zM7 4v6c0 1.654 1.346 3 3 3s3-1.346 3-3V4h1v6c0 2.206-1.794 4-4 4s-4-1.794-4-4V4h1z"
              transform="translate(-147.000000, -81.000000) translate(142.000000, 77.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <svg width={19} height={19} viewBox="0 0 19 19" {...props}>
      <g fillRule="evenodd">
        <path d="M14.014 10.596c0 .676-.116 1.286-.349 1.83a4.102 4.102 0 0 1-.95 1.386c-.402.38-.877.673-1.426.88a5.059 5.059 0 0 1-1.79.308 5.059 5.059 0 0 1-1.79-.309 4.268 4.268 0 0 1-1.434-.88 3.957 3.957 0 0 1-.95-1.385c-.228-.544-.341-1.154-.341-1.83V4.2c0-.11.09-.2.2-.2H6.78c.11 0 .2.09.2.2v6.332c0 .275.042.563.127.864.084.3.224.578.42.832.195.253.453.462.776.625.322.164.72.246 1.196.246.475 0 .874-.082 1.196-.246.322-.163.58-.372.776-.625.196-.254.336-.531.42-.832.085-.301.127-.589.127-.864L12.02 4.2c0-.11.09-.2.2-.2h1.596c.11 0 .2.09.2.2l-.002 6.396z" />
        <rect width={9} height={1} x={5} y={16} rx={0.2} />
      </g>
    </svg>
  );
};

export default UnderlineIcon;
