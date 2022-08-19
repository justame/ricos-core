import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../../statics/styles/image.scss';
import type {
  MediaUploadError,
  RichContentTheme,
  TranslationFunction,
} from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import MediaItemErrorMsg from './MediaItemErrorMsg';

interface ImageProps {
  resizeMode: 'contain' | 'cover';
  src: string;
  theme: RichContentTheme;
  className?: string;
  alt?: string;
  error?: MediaUploadError;
  t?: TranslationFunction;
}

class Image extends Component<ImageProps> {
  static defaultProps = {
    resizeMode: 'contain',
  };

  styles: Record<string, string>;

  constructor(props: ImageProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const { src, resizeMode, className, alt, error, t } = this.props;
    const imageStyle = {
      backgroundImage: `url(${src})`,
      backgroundSize: resizeMode,
    };
    return (
      <div className={classNames(styles.image_container, className)} style={imageStyle}>
        <img src={src} className={styles.image_placeholder} alt={alt} />
        {error && <MediaItemErrorMsg error={error} t={t} />}
      </div>
    );
  }
}

export default Image;
