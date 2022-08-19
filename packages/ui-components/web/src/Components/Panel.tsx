import type { ComponentType, CSSProperties } from 'react';
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../../statics/styles/panel.scss';
import type {
  ComponentData,
  GetEditorBounds,
  Helpers,
  Pubsub,
  RichContentTheme,
  TranslationFunction,
} from 'wix-rich-content-common';

interface PanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: ComponentType<any>;
  keyName: string;
  theme: RichContentTheme;
  store: Pubsub;
  componentData: ComponentData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentState: Record<string, any>;
  helpers?: Helpers;
  getEditorBounds?: GetEditorBounds;
  t?: TranslationFunction;
}

export default class Panel extends Component<
  PanelProps,
  { visible: boolean; style: CSSProperties }
> {
  constructor(props: PanelProps) {
    super(props);
    this.state = this.stateFromProps(props.componentState);
  }

  stateFromProps = componentState => {
    const { keyName, boundingRect, isActive } = componentState.activeButton || {};
    if (keyName === this.props.keyName && boundingRect && isActive) {
      return {
        visible: true,
        style: {
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        },
      };
    } else {
      return {
        visible: false,
        style: {
          transform: 'translate(-50%) scale(0)',
        },
      };
    }
  };

  componentWillReceiveProps = (nextProps: PanelProps) => {
    this.setState(this.stateFromProps(nextProps.componentState));
  };

  render = () => {
    const Content = this.props.content;
    const modalClasses = classNames(styles.panelContainer, this.props.theme.panelContainer);
    return (
      <div className={modalClasses} style={this.state.style}>
        <Content
          store={this.props.store}
          helpers={this.props.helpers}
          componentData={this.props.componentData}
          componentState={this.props.componentState}
          theme={this.props.theme}
          t={this.props.t}
          tabIndex={this.state.visible ? 0 : -1}
          getEditorBounds={this.props.getEditorBounds}
        />
      </div>
    );
  };
}
