/* eslint-disable max-len */
import React from 'react';

const LinkIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" {...props}>
      <g fill="none" fillRule="evenodd">
        <g fill="currentColor">
          <g>
            <path
              d="M7.056 9.115c1.288-1.289 3.538-1.289 4.825 0l.343.342-.707.71-.343-.344c-.911-.914-2.5-.913-3.411 0l-2.06 2.058c-.94.94-.94 2.471 0 3.411.944.941 2.475.94 3.412 0l1.029-1.029.707.707L9.82 16c-.664.664-1.538.996-2.412.996-.873 0-1.747-.332-2.412-.997-1.33-1.33-1.33-3.495 0-4.825zm4.118-4.117c1.33-1.33 3.495-1.331 4.825 0 1.329 1.33 1.329 3.495 0 4.825l-2.06 2.059c-.643.644-1.501 1-2.412 1s-1.768-.356-2.412-1l-.344-.342.707-.71.344.344c.91.914 2.5.913 3.41 0l2.06-2.058c.939-.94.939-2.471 0-3.411-.941-.94-2.472-.938-3.411 0l-1.03 1.029-.706-.707z"
              transform="translate(-247.000000, -81.000000) translate(243.000000, 77.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 19 19"
      width={19}
      height={19}
      {...props}
    >
      <defs>
        <path
          id="link-icon-path"
          d="M8 9h2V6.2c0-.11.09-.2.2-.2h3.3a3.5 3.5 0 0 1 0 7h-3.3a.2.2 0 0 1-.2-.2V10H8v2.8a.2.2 0 0 1-.2.2H4.5a3.5 3.5 0 0 1 0-7h3.3c.11 0 .2.09.2.2V9zm0 0V7.007H4.5a2.5 2.5 0 1 0 0 5H8V10H6.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2H8zm2 1v1.993h3.5a2.5 2.5 0 1 0 0-5H10V9h1.8c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H10z"
        />
      </defs>
      <use fillRule="evenodd" transform="rotate(-45 9 9.5)" xlinkHref="#link-icon-path" />
    </svg>
  );
};

export default LinkIcon;
