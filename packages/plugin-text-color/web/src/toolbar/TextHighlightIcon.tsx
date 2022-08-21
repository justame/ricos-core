/* eslint-disable max-len */
import React from 'react';

const TextHighlightIcon = props => {
  return props.newFormattingToolbar ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" {...props}>
      <path
        width="11"
        height="10"
        viewBox="0 0 11 10"
        fill={props.isDisabled ? 'graytext' : '#000'}
        id="Icon"
        d="M10.616 3.366L6.5 7.482 4.207 5.189l4.116-4.116c.098-.098.256-.098.354 0l1.94 1.939c.097.098.097.256 0 .354zM5.293 8.689h-1.94L3 8.336v-1.94l.5-.5 2.293 2.293-.5.5zm6.03-6.384L9.384.366c-.487-.488-1.282-.488-1.768 0l-5.47 5.47c-.093.093-.146.22-.146.353v2.147L.823 9.512c-.06.062-.087.15-.066.235.02.084.082.152.164.18l1.5.5c.026.008.052.012.08.012.064 0 .128-.025.176-.073l.676-.677H5.5c.133 0 .26-.052.353-.146l5.47-5.47c.487-.487.487-1.28 0-1.768z"
        transform="translate(-210.000000, -80.000000) translate(206.000000, 77.000000) translate(4.000000, 3.310800)"
      />
      <path
        width="12"
        height="3"
        viewBox="0 0 12 3"
        fill={props.isDisabled ? 'graytext' : `${props.currentColor}`}
        id="Fill"
        fillRule="nonzero"
        d="M0 15.689L12 15.689 12 12.689 0 12.689z"
      />
    </svg>
  ) : (
    <svg width="19px" height="19px" viewBox="0 0 19 19" {...props}>
      <title>Fill Color</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M13,15.4025547 C13,16.1865787 13.687,16.8487889 14.5,16.8487889 C15.313,16.8487889 16,16.1863062 16,15.4025547 C16,14.7033546 15.6214705,13.9544845 14.8644116,13.1559444 L14.8643729,13.1559811 C14.6744053,12.9556048 14.3579691,12.9471668 14.1575928,13.1371343 C14.1513476,13.1430551 14.1452562,13.1491362 14.1393249,13.1553715 C13.379775,13.9538457 13,14.7029067 13,15.4025547 Z"
          fill="currentColor"
          fillRule="nonzero"
        />
        <path
          d="M3.5,6 C3.22385763,6 3,5.77614237 3,5.5 C3,5.22385763 3.22385763,5 3.5,5 L12.748729,5 C13.3010137,5 13.748729,5.44771525 13.748729,6 L13.748729,13 C13.748729,13.5522847 13.3010137,14 12.748729,14 L5.74872899,14 C5.19644424,14 4.74872899,13.5522847 4.74872899,13 L4.74872899,6 L3.5,6 Z M12.748729,6.00005457 L5.74872899,6.00005457 L5.74872899,13.0000546 L12.748729,6.00005457 Z"
          fill="currentColor"
          fillRule="nonzero"
          transform="translate(8.374364, 9.500000) rotate(-315.000000) translate(-8.374364, -9.500000) "
        />
      </g>
    </svg>
  );
};

export default TextHighlightIcon;
/* eslint-enable max-len */
