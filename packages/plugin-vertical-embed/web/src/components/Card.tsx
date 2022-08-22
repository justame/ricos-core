//@ts-nocheck
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardContent from './CardContent';
import styles from '../../statics/styles/widget.scss';
import classNames from 'classnames';
import { getScaleImageSrc } from 'wix-rich-content-common/libs/imageUtils';
import { isSSR } from 'wix-rich-content-common';

const getImageTargetHeight = (width, height, targetWidth) => {
  const proportion = height / width;
  const targetHeight = proportion * targetWidth;
  return targetHeight;
};

const Card = props => {
  const { url, content, direction, imageWidth, imageHeight, t, disabled } = props;
  const [imageSrc, setImageSrc] = useState();

  const getImageSrc = targetWidth => {
    const targetHeight = getImageTargetHeight(imageWidth, imageHeight, targetWidth);
    return getScaleImageSrc(props.imageSrc, targetWidth, targetHeight);
  };

  const setRef = ref => {
    if (ref) {
      const targetWidth = ref.getBoundingClientRect()?.width;
      if (imageWidth && imageHeight) {
        const imageSrc = getImageSrc(targetWidth);
        setImageSrc(imageSrc);
      } else {
        setImageSrc(props.imageSrc);
      }
    }
  };
  const imageUrl = isSSR()
    ? imageWidth && imageHeight
      ? getImageSrc(185)
      : props.imageSrc
    : imageSrc;

  const imageStyle = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a className={styles.link} href={disabled ? null : url} target="_blank" ref={setRef}>
      <div
        style={{ direction }}
        className={classNames(styles[direction], styles.container, styles.cardLayout)}
      >
        <div style={imageStyle} className={styles.image} />
        <CardContent {...content} disabled={disabled} t={t} />
      </div>
    </a>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string,
  content: PropTypes.object,
  direction: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageWidth: PropTypes.string,
  imageHeight: PropTypes.string,
  disabled: PropTypes.boolean,
  t: PropTypes.func.isRequired,
};

export default Card;
