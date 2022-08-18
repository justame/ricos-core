export const anchorScroll = element => {
  const stickyHeaderHeight = document.querySelector('[id="SITE_HEADER"]')?.clientHeight || 0;
  const stickyAd = document.querySelector('[id="WIX_ADS"]')?.clientHeight || 0;
  const mobileToolbar =
    document.querySelector('[data-hook="mobileToolbar"]')?.clientHeight ||
    document.querySelector('[data-hook="ricos-editor-toolbars"]')?.clientHeight ||
    0;
  const fixedElementsOffset = stickyHeaderHeight + stickyAd + mobileToolbar;
  anchorScrollUsingScrollIntoView(element, fixedElementsOffset);
};

const anchorScrollUsingScrollIntoView = (element, fixedElementsOffset) => {
  const { paddingTop, marginTop } = element.style;
  element.style.marginTop = `-${fixedElementsOffset}px`;
  element.style.paddingTop = `${fixedElementsOffset}px`;
  element.scrollIntoView({ behavior: 'smooth' });
  element.style.marginTop = marginTop;
  element.style.paddingTop = paddingTop;
};

const anchorScrollUsingScrollTo = (element, fixedElementsOffset) => {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition - fixedElementsOffset;
  const scrollParent = findScrollableParent(element) || window;
  scrollParent.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

export const addAnchorTagToUrl = anchorString => {
  const url = new URL(window.location.href);
  url.hash = anchorString;
  history.pushState({}, '', url.href);
};

export const isNewTab = target => target === '_blank';

const findScrollableParent = node => {
  if (node === null) {
    return null;
  }
  const overflowY = window.getComputedStyle(node).overflowY;
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
  if (isScrollable && node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    return findScrollableParent(node.parentNode);
  }
};
