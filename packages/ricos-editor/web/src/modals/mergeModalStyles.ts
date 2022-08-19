const modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const mergeModalStyles = (modalStyles, theme, fullHeight) => {
  // Render modal below top toolbar of BM sites
  const headerHeight = document.querySelector(
    '[data-hook=bsm-main-container] [data-hook=header]'
  )?.clientHeight;
  const styles = fullHeight && headerHeight ? { marginTop: headerHeight } : {};

  return {
    content: Object.assign(
      {},
      (modalStyles || modalStyleDefaults).content,
      { zIndex: 20001 },
      theme?.modalTheme?.content || {},
      styles
    ),
    overlay: Object.assign(
      {},
      (modalStyles || modalStyleDefaults).overlay,
      { zIndex: 666666 },
      theme?.modalTheme?.overlay || {},
      styles
    ),
  };
};

export default mergeModalStyles;
