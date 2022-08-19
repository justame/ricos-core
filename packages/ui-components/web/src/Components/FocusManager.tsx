import type { KeyboardEventHandler } from 'react';
import React, { Component, Fragment } from 'react';
import FocusTrap from './FocusTrapReact';
import type { Options as FocusTrapOptions } from 'focus-trap';

interface FocusManagerProps {
  focusTrapOptions?: FocusTrapOptions;
  isMobile?: boolean;
  onKeyDown?: KeyboardEventHandler;
}

class FocusManager extends Component<FocusManagerProps> {
  static defaultProps = {
    isMobile: false,
    focusTrapOptions: {
      clickOutsideDeactivates: true,
    },
  };

  id: string;

  constructor(props: FocusManagerProps) {
    super(props);
    this.id = `fm_${Math.floor(Math.random() * 9999)}`;
    this.onActivate = this.onActivate.bind(this);
    this.onDeactivate = this.onDeactivate.bind(this);
  }

  onActivate() {}

  onDeactivate() {}

  render() {
    const { children, focusTrapOptions, isMobile, ...rest } = this.props;
    const options = {
      ...focusTrapOptions,
      onActivate: this.onActivate,
      onDeactivate: this.onDeactivate,
      clickOutsideDeactivates: true,
    };
    if (isMobile) {
      return <Fragment {...rest}>{children}</Fragment>;
    } else {
      return (
        <FocusTrap focusTrapOptions={options} {...rest}>
          {children}
        </FocusTrap>
      );
    }
  }
}

export default FocusManager;
