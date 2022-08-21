import React from 'react';
import styles from '../../statics/styles/divider-viewer.rtlignore.scss';

//fixing Tiptap bug in Safari: when selecting node-view which is svg, there is a caret below and you can't
//focus on empty line below the node view
//similar issue discussed here: https://discuss.prosemirror.net/t/ios-safari-does-not-hide-the-caret-on-non-visible-selections-e-g-nodeselection/3024

export const withSafariSvgCaretFixer = Component => (
  <div className={styles.svgFixerContainer}>
    {Component}
    <div className={styles.emptyChar}>&nbsp;</div>
  </div>
);
