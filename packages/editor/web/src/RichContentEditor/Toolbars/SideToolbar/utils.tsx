//@ts-nocheck
export const SECTIONS = {
  no_section: 'BlockToolbar_Section_NoSections_ShortcutToolbar',
  basic: 'BlockToolbar_Section_Basic',
  advanced: 'BlockToolbar_Section_Advanced',
  embed_wix: 'BlockToolbar_Section_Embed_Wix',
  embed: 'BlockToolbar_Section_Embed_Anywhere',
};

export const getSortedSections = sectionsArr => {
  const sortedSections = Object.keys(SECTIONS).map(key => SECTIONS[key]);
  return sortedSections
    .map(section => (sectionsArr.includes(section) ? section : false))
    .filter(section => section);
};

export const getPluginMenuTheme = (theme = {}, isMobile) => {
  const {
    buttonStyles,
    mobileAddModalToolbarButton_wrapper,
    mobileAddModalToolbarButton,
    mobileAddModalToolbarButton_icon,
    mobileAddModalToolbarButton_label,
    ...rest
  } = theme;
  return {
    buttonStyles: {
      button: isMobile ? mobileAddModalToolbarButton : buttonStyles.sideToolbarButton,
      buttonWrapper: isMobile
        ? mobileAddModalToolbarButton_wrapper
        : buttonStyles.sideToolbarButton_wrapper,
      icon: isMobile ? mobileAddModalToolbarButton_icon : buttonStyles.sideToolbarButton_icon,
      label: isMobile ? mobileAddModalToolbarButton_label : buttonStyles.sideToolbarButton_label,
    },
    ...rest,
  };
};
