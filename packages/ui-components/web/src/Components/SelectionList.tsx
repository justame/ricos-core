/* eslint-disable react/prop-types */
import type { KeyboardEventHandler } from 'react';
import React, { Component } from 'react';
import classnames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/selection-list.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectionItem = Record<string, any> | string | number;
type SelectionOption = { value?: SelectionItem; label?: string; subText?: string };

function defaultDataMapper(item: SelectionItem): SelectionOption {
  switch (typeof item) {
    case 'number':
      return { value: item, label: item.toString() };
    case 'string':
      return { value: item, label: item };
    case 'object':
      return item;
    default:
      return {};
  }
}

const defaultRenderItem = ({
  option,
  selected,
}: {
  option: SelectionOption;
  selected: boolean;
}) => {
  return (
    option &&
    option.value && (
      <SelectionListOption
        selected={selected}
        value={option.value}
        theme={{}}
        data-hook={option.value}
        onChange={() => true}
      >
        {option.value}
      </SelectionListOption>
    )
  );
};

interface SelectionListProps {
  dataSource: SelectionItem[];
  dataMapper: (item: SelectionItem) => SelectionOption;
  renderItem: (props: {
    item: SelectionItem;
    option: SelectionOption;
    selected: boolean;
  }) => JSX.Element;
  theme: RichContentTheme;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  optionClassName?: string;
  useNewSettingsUi?: boolean;
  renderOptionSubtext?: (props: { item: SelectionItem; selected: boolean }) => JSX.Element | null;
}

class SelectionList extends Component<SelectionListProps, { focusIndex: number }> {
  styles: Record<string, string>;

  ref?: HTMLDivElement | null;

  constructor(props: SelectionListProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { focusIndex: -1 };
  }

  static defaultProps = {
    dataMapper: defaultDataMapper,
    renderItem: defaultRenderItem,
    useNewSettingsUi: false,
  };

  mapItemToOptionData(item: SelectionItem): {
    item: SelectionItem;
    option: SelectionOption;
    selected: boolean;
  } {
    const option = this.props.dataMapper(item);
    return {
      item,
      option,
      selected: option.value === this.props.value,
    };
  }

  onKeyDown(event) {
    if (this.props.dataSource.length < 2) {
      return;
    }
    const index = this.state.focusIndex === -1 ? 0 : this.state.focusIndex;
    let nextIndex = -1;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = index === 0 ? this.props.dataSource.length - 1 : index - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % this.props.dataSource.length;
        break;
      case 'Tab':
        this.setState({ focusIndex: -1 });
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
  }

  render() {
    const {
      dataSource,
      className,
      onChange,
      renderItem,
      theme,
      optionClassName,
      useNewSettingsUi,
    } = this.props;
    const optionsData = dataSource.map(item => this.mapItemToOptionData(item));
    const subText = (
      optionsData.filter(optionData => optionData.selected)?.[0]?.item as Record<string, string>
    )?.subText;
    return (
      <>
        <div
          ref={el => (this.ref = el)}
          className={classnames(this.styles.selectionList, className)}
          role={'listbox'}
          aria-orientation={'horizontal'}
        >
          {optionsData.map(({ item, option, selected }, i) => (
            <SelectionListOption
              tabIndex={0}
              selected={selected}
              focused={i === this.state.focusIndex}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              dataHook={(item as any).dataHook}
              onChange={onChange}
              key={i}
              theme={theme}
              value={option.value}
              optionClassName={optionClassName}
              onKeyDown={e => this.onKeyDown(e)}
              useNewSettingsUi={useNewSettingsUi}
            >
              {renderItem({ item, option, selected })}
            </SelectionListOption>
          ))}
        </div>
        {subText && <div className={this.styles.selectionSubText}> {subText} </div>}
      </>
    );
  }
}

interface SelectionListOptionProps {
  theme: RichContentTheme;
  selected?: boolean;
  focused?: boolean;
  onChange: (value?: SelectionItem) => void;
  value?: SelectionItem;
  optionClassName?: string;
  dataHook?: string;
  tabIndex?: number;
  onKeyDown?: KeyboardEventHandler;
  useNewSettingsUi?: boolean;
}

class SelectionListOption extends Component<SelectionListOptionProps> {
  styles: Record<string, string>;

  ref?: HTMLDivElement | null;

  constructor(props: SelectionListOptionProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentDidUpdate() {
    if (this.props.focused) {
      this.ref?.focus();
    }
  }

  render() {
    const {
      selected,
      onChange,
      children,
      value,
      optionClassName,
      dataHook,
      tabIndex,
      onKeyDown,
      useNewSettingsUi,
    } = this.props;

    return (
      <div
        tabIndex={tabIndex}
        role={'option'}
        aria-selected={selected}
        ref={el => (this.ref = el)}
        onKeyDown={e => onKeyDown?.(e)}
        className={
          useNewSettingsUi
            ? ''
            : classnames(
                this.styles.selectionListOption,
                { [this.styles.selectionListOption_selected]: selected },
                optionClassName
              )
        }
        data-hook={dataHook}
        onClick={() => onChange(value)}
      >
        {children}
      </div>
    );
  }
}

export default SelectionList;
