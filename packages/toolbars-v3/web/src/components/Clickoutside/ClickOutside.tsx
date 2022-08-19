import React from 'react';

type ClickOutsideProps = {
  onClickOutside: (e: MouseEvent) => void;
  wrapper: 'span' | 'div';
};

export class ClickOutside extends React.Component<ClickOutsideProps> {
  clickCaptured = false;

  render() {
    if (typeof this.props.children === 'function') {
      return this.props.children(this.getProps());
    }

    return this.renderComponent();
  }

  renderComponent() {
    return React.createElement(this.props.wrapper || 'span', this.getProps(), this.props.children);
  }

  getProps() {
    return {
      onMouseDown: this.innerClick,
      onTouchStart: this.innerClick,
    };
  }

  innerClick = () => {
    this.clickCaptured = true;
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.documentClick);
    document.addEventListener('touchstart', this.documentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.documentClick);
    document.removeEventListener('touchstart', this.documentClick);
  }

  documentClick = event => {
    if (!this.clickCaptured && this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
    this.clickCaptured = false;
  };
}
