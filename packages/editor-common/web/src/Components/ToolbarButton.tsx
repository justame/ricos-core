//@ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';

const ToolbarButton = ({ tooltipText, button, tooltipOffset }) => {
  return (
    <Tooltip key={tooltipText} content={tooltipText} tooltipOffset={tooltipOffset}>
      {button}
    </Tooltip>
  );
};

ToolbarButton.propTypes = {
  tooltipText: PropTypes.string,
  button: PropTypes.element,
  tooltipOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

ToolbarButton.defaultProps = {
  tooltipOffset: {
    y: -20,
  },
};

export default ToolbarButton;
