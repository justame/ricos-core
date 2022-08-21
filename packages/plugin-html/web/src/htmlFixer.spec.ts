import { htmlFixer } from './htmlFixer';

describe('Test html adsense fixer', () => {
  it('should not fix non-googleAds html', () => {
    expect(htmlFixer(nonAdsHtml, pageURL)).toEqual(nonAdsHtml);
  });
  it('should not fix if there is no pageURL', () => {
    expect(htmlFixer(nonAdsHtml)).toEqual(nonAdsHtml);
  });
  it('should not override data-page-url of google adsense html', () => {
    const googleAdsHtmlWithPageUrl = getGoogleAds(
      `\ndata-page-url="https://www.justsimoncowell.com"`
    );
    expect(htmlFixer(googleAdsHtmlWithPageUrl, pageURL)).toEqual(googleAdsHtmlWithPageUrl);
  });
  it('should add data-page-url to google adsense without data-page-url', () => {
    const googleAdsHtmlWithoutPageUrl = getGoogleAds(``);
    const googleAdsHtmlWithInjectedPageUrl = getGoogleAds(`\n\tdata-page-url="${pageURL}"`);
    expect(htmlFixer(googleAdsHtmlWithoutPageUrl, pageURL)).toEqual(
      googleAdsHtmlWithInjectedPageUrl
    );
  });
});

const pageURL = 'https://www.wix.com';
const nonAdsHtml = '<div>Hello world!</div>';
const getGoogleAds = injectedPageUrl => `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Display Ad - July 2019 -->
<ins class="adsbygoogle"${injectedPageUrl}
  style="display: block"
  data-ad-client="ca-pub-7456264829563683"
  data-ad-slot="4851880629"
  data-ad-format="auto"
  data-full-width-responsive="true"
>
</ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;
