export const htmlFixer = (html?: string, pageURL?: string) => {
  const isGoogleAds = html?.includes('adsbygoogle');
  const isIncludePageUrl = html?.includes('data-page-url=');
  if (pageURL && isGoogleAds && !isIncludePageUrl) {
    // Google Adsense must include data-page-url - if there is no data-page-url, add one
    const updatedAd = `<ins class="adsbygoogle"\n\tdata-page-url="${pageURL}"`;
    return html?.replace(new RegExp('<ins class="adsbygoogle"', 'g'), updatedAd);
  }
  return html;
};
