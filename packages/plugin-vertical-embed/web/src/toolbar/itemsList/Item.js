/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/item.scss';
import classnames from 'classnames';
import { getScaleImageSrc } from 'wix-rich-content-common/libs/imageUtils';

class Item extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    t: PropTypes.func.isRequired,
  };

  itemRef = React.createRef();

  handleClick = () => this.props.onClick(this.props.item);

  componentDidMount() {
    this.props.selected && this.itemRef?.current.scrollIntoView();
  }

  render() {
    const { selected, item, t } = this.props;
    const { name, getDescription } = item;
    const imageSrc = getScaleImageSrc(item.imageSrc, 50, 50);
    return (
      <div
        ref={this.itemRef}
        className={classnames(styles.container, selected && styles.selected)}
        onClick={this.handleClick}
      >
        <div
          style={{ backgroundImage: `url(${imageSrc})` }}
          className={styles.image}
          data-hook="verticalsImage"
        />
        <div className={styles.title}>{name}</div>
        {getDescription && <div className={styles.description}>{getDescription(item)}</div>}
      </div>
    );
  }
}

export default Item;
