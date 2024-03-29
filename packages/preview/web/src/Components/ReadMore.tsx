import React, { PureComponent, Fragment } from 'react';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/read-more.scss';
import type { PreviewConfig } from '..';

interface Props {
  label?: string;
  lines?: number;
  theme: RichContentTheme;
  showToggle?: boolean;
  t: TranslationFunction;
  onPreviewExpand: PreviewConfig['onPreviewExpand'];
}

interface State {
  clamped: boolean;
}

class ReadMore extends PureComponent<Props, State> {
  rmContainer!: React.RefObject<HTMLDivElement>;

  rmMocker!: React.RefObject<HTMLDivElement>;

  styles!: Record<string, string>;

  constructor(props: Props) {
    super(props);
    this.state = { clamped: false };
    this.rmContainer = React.createRef();
    this.rmMocker = React.createRef();
  }

  onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    this.props.onPreviewExpand?.();
  };

  onReflow = ({ clamped }) => {
    this.setState({ clamped });
  };

  componentDidMount() {
    const height = this.rmContainer?.current?.clientHeight;
    const originalHeight = this.rmMocker?.current?.clientHeight;
    if (height && originalHeight) {
      this.setState({ clamped: originalHeight > height });
    }
  }

  /* eslint-disable jsx-a11y/anchor-is-valid */
  render() {
    const { clamped } = this.state;
    const { showToggle = true } = this.props;
    const { lines = 3, label = this.props.t('Preview_ReadMore_Label'), children } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return (
      <Fragment>
        <div
          className={styles.readMore_wrapper}
          ref={this.rmContainer}
          style={{
            WebkitLineClamp: lines,
          }}
        >
          {children}
        </div>
        <div ref={this.rmMocker} className={styles.readMore_calculationWrapper}>
          {children}
        </div>
        {clamped && showToggle && (
          <a href="" role="button" onClick={this.onClick} className={this.styles.readMore_label}>
            {label}
          </a>
        )}
      </Fragment>
    );
  }
}

export default ReadMore;
