// This util removing inlineStyleRange that have style of number, or stringify number

export const removeInvalidInlineStyles = inlineStyleRanges => {
  if (!inlineStyleRanges) {
    return inlineStyleRanges;
  }
  return inlineStyleRanges.filter(({ style }) => {
    return !(
      typeof style === 'number' ||
      (typeof style === 'string' && !Number.isNaN(Number(style)))
    );
  });
};
