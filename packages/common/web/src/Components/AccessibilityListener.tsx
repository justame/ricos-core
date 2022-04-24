import { Component } from 'react';

const CLASS_NAME = 'no-outline';
export default class AccessibilityListener extends Component<{ isMobile?: boolean }> {
  handleTabKeyUp = (e: KeyboardEvent) => {
    if (e.which === 9 && document.body.classList.contains(CLASS_NAME)) {
      document.body.classList.remove(CLASS_NAME);
    }
  };

  handleClick = () => {
    if (!document.body.classList.contains(CLASS_NAME)) {
      document.body.classList.add(CLASS_NAME);
    }
  };

  componentDidMount() {
    document.body.classList.add(CLASS_NAME);

    if (!this.props.isMobile) {
      document.addEventListener('keyup', this.handleTabKeyUp);
      document.addEventListener('click', this.handleClick);
    }
  }

  componentWillUnmount() {
    if (!this.props.isMobile) {
      document.removeEventListener('keyup', this.handleTabKeyUp);
      document.removeEventListener('click', this.handleClick);
    }
  }

  render = () => null;
}
