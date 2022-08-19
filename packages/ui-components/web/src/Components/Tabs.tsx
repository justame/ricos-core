import React, { Component } from 'react';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/tabs.scss';
import TabsHeader from './TabsHeader';

interface CommonTabProps {
  theme: RichContentTheme;
  value: string;
  className?: string;
  headersStyle?: string;
  onTabSelected?: (value: string) => void;
}

interface TabProps extends CommonTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any;
  selected?: boolean;
}

export class Tab extends Component<TabProps> {
  styles: Record<string, string>;

  constructor(props: TabProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render = () =>
    this.props.selected && (
      <div
        role="tabpanel"
        key={this.props.value}
        aria-labelledby={`${this.props.value}_header`}
        id={`${this.props.value}_panel`}
      >
        {this.props.children}
      </div>
    );
}
interface TabsProps extends CommonTabProps {}
export class Tabs extends Component<TabsProps, { activeTab: string; focusIndex: number }> {
  styles: Record<string, string>;

  constructor(props: TabsProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { activeTab: props.value, focusIndex: -1 };
  }

  componentWillReceiveProps = (nextProps: TabsProps) => {
    if (nextProps.value !== this.state.activeTab) {
      this.setState({ activeTab: nextProps.value });
    }
  };

  getTabHeaders = tabs =>
    React.Children.map<{ label: string; value: string }, Tab>(tabs, tab => ({
      label: tab.props.label,
      value: tab.props.value,
    }));

  renderTabs = () =>
    React.Children.map(this.props.children, tab =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      React.cloneElement(tab, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        selected: this.state.activeTab === tab.props.value,
      })
    );

  onKeyDown = (event, currentIndex) => {
    const index = this.state.focusIndex === -1 ? 0 : this.state.focusIndex;
    const headersLength = (this.props.children as React.ReactNode[])?.length;
    let nextIndex = -1;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = index === 0 ? headersLength - 1 : index - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % headersLength;
        break;
      case 'Tab':
        this.setState({ focusIndex: currentIndex });
        break;
      case ' ':
      case 'Enter':
        event.target.click();
        break;
      default:
        break;
    }

    if (nextIndex > -1) {
      this.setState({ focusIndex: nextIndex });
    }
  };

  render() {
    const { styles, props } = this;
    const headers = this.getTabHeaders(props.children);
    return (
      <div role="tablist" className={styles.tabs} aria-orientation="horizontal">
        <div className={classNames(styles.tabs_headers, this.props?.headersStyle)}>
          {headers.map(({ label, value }, i) => {
            const isSelected = value === this.state.activeTab;
            return (
              <TabsHeader
                key={label}
                label={label}
                value={value}
                focused={i === this.state.focusIndex}
                isSelected={isSelected}
                onKeyDown={e => this.onKeyDown(e, i)}
                focusIndex={this.state.focusIndex}
                onClick={() => {
                  this.setState({ activeTab: value });
                  if (this.props.onTabSelected) {
                    this.props.onTabSelected(value);
                  }
                  this.renderTabs();
                }}
              />
            );
          })}
        </div>
        {this.renderTabs()}
      </div>
    );
  }
}
