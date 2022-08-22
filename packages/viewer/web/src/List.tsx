//@ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { hasText } from './utils/textUtils';
import { isPaywallSeo, getPaywallSeoClass } from './utils/paywallSeo';
import { getDirectionFromAlignmentAndTextDirection } from 'wix-rich-content-common';
import styles from '../statics/rich-content-viewer.scss';
import { withInteraction } from './withInteraction';

const draftPublic = 'public-DraftStyleDefault';
const draftClassNames = (listType, depth, textDirection) => [
  `${draftPublic}-${listType}ListItem`,
  `${draftPublic}-depth${depth}`,
  `${draftPublic}-list-${textDirection}`,
];

const getBlockClassName = (direction, listType, depth, { isNewList, fixedTabSize }) => {
  return [
    ...draftClassNames(listType, depth, direction),
    ...(fixedTabSize ? ['fixed-tab-size'] : []),
    ...(isNewList ? [`${draftPublic}-reset`] : []),
  ].join(' ');
};

const List = ({
  ordered,
  items,
  mergedStyles,
  textDirection,
  blockProps,
  getBlockStyleClasses,
  blockDataToStyle,
  context,
  fixedTabSize,
}) => {
  const Component = ordered ? 'ol' : 'ul';
  const listType = ordered ? 'ordered' : 'unordered';
  const containerClassName = `${draftPublic}-${Component}`;
  const listItemTypeClassName = `${listType}List`;
  let prevDepth = 0;
  return (
    <Component className={containerClassName}>
      {items.map((children, childIndex) => {
        // NOTE: list block data is an array of data entries per list item
        const dataEntry = blockProps.data.length > childIndex ? blockProps.data[childIndex] : {};

        const { interactions } = blockProps.data[childIndex];

        let paragraphGroup = [];
        const result = [];
        const alignment = dataEntry?.textAlignment || context.textAlignment;
        const textClassName = getBlockStyleClasses(
          mergedStyles,
          textDirection || dataEntry.textDirection,
          alignment
        );
        const hasJustifyText = alignment === 'justify' && hasText(children);

        const blockStyle = blockDataToStyle(blockProps.data[childIndex]);
        const elementProps = key => ({
          className: classNames(mergedStyles.elementSpacing, textClassName, {
            [styles.hasJustifyText]: hasJustifyText,
            [styles.contentCenterAlignment]: alignment === 'center',
          }),
          style: { lineHeight: blockStyle.lineHeight },
          key,
        });

        React.Children.forEach(children, (child, i) => {
          if (child) {
            if (typeof child.type === 'string' && /h\d/.exec(child.type)) {
              if (paragraphGroup.length) {
                result.push(<p {...elementProps(i)}>{paragraphGroup}</p>);
                paragraphGroup = [];
              }
              result.push(React.cloneElement(child, elementProps(i)));
            } else {
              paragraphGroup.push(child);
            }
          }
        });
        if (paragraphGroup.length) {
          result.push(<p {...elementProps('just_some_key')}>{paragraphGroup}</p>);
        }

        const depth = dataEntry.depth;
        const listItemDirection = getDirectionFromAlignmentAndTextDirection(
          alignment,
          textDirection || dataEntry.textDirection
        );
        const className = getBlockClassName(listItemDirection, listType, depth, {
          isNewList: childIndex === 0 || depth > prevDepth,
          fixedTabSize,
        });
        prevDepth = depth;
        const blockIndex = dataEntry.index;
        const wrappedBlock = withInteraction(
          result.length === 0 ? ' ' : result,
          interactions,
          context
        );
        return (
          <li
            id={`viewer-${blockProps.keys[childIndex]}`}
            className={classNames(
              context.theme[listItemTypeClassName],
              styles[listItemTypeClassName],
              styles[alignment],
              getBlockStyleClasses(mergedStyles, listItemDirection, alignment, className, true),
              isPaywallSeo(context.seoMode) &&
                getPaywallSeoClass(context.seoMode.paywall, blockIndex),
              blockStyle.lineHeight && styles.lineHeightFix
            )}
            key={blockProps.keys[childIndex]}
            style={blockDataToStyle(blockProps.data[childIndex])}
          >
            {wrappedBlock}
          </li>
        );
      })}
    </Component>
  );
};

List.propTypes = {
  blockDataToStyle: PropTypes.func,
  blockProps: PropTypes.object,
  getBlockStyleClasses: PropTypes.func,
  items: PropTypes.array,
  mergedStyles: PropTypes.object,
  ordered: PropTypes.bool,
  textDirection: PropTypes.oneOf(['rtl', 'ltr']),
  context: PropTypes.shape({
    theme: PropTypes.object.isRequired,
    experiments: PropTypes.object,
    anchorTarget: PropTypes.string.isRequired,
    relValue: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    helpers: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    seoMode: PropTypes.bool,
    contentState: PropTypes.object,
    disableRightClick: PropTypes.bool,
    textAlignment: PropTypes.oneOf(['left', 'right']),
  }).isRequired,
  fixedTabSize: PropTypes.bool,
};

export default List;
