/* eslint-disable @typescript-eslint/no-explicit-any */
import { LINK_VIEWER_DATA_HOOK } from 'wix-rich-content-common';

export default function addLinkPreviewPopoverListener(container, callback) {
  const onLinkHover = (linkNode: any) => {
    const url = linkNode.href;
    const linkNodeRect = linkNode.getBoundingClientRect();
    const position = { top: linkNodeRect.top + linkNodeRect.height + 4, left: linkNodeRect.left };
    callback(url, position);
  };

  const onStopLinkHover = () => callback(undefined);

  const handleMouseOver = event => {
    const isLink = event.target?.parentNode?.dataset?.hook === LINK_VIEWER_DATA_HOOK;
    return isLink ? onLinkHover(event.target.closest('a')) : onStopLinkHover();
  };

  container.addEventListener('mouseover', handleMouseOver);

  return () => {
    container.removeEventListener('mouseover', handleMouseOver);
  };
}
