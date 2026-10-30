# SALU Community — SEO update and upload repair

Prepared 30 October 2026 for https://salucommunity.github.io/.

## Fix for the broken uploaded design

The published home page was reachable, but its stylesheet and emblem paths under `assets/` returned HTTP 404. This stripped the layout and left SVG icons at their browser default sizes. This repaired release embeds its stylesheet, visual images, application code and question archive directly in each HTML page. It does not depend on an `assets` folder. The existing root files, including `data.js`, `pwa.js`, `sw.js`, manifest and icons, remain in the package. All extracted files are at one level for easier phone uploads.

Replace the old uploaded version with the extracted files from this ZIP. Wait for GitHub Pages to finish deployment, then reload. If your installed app still shows the old page, close and reopen it after deployment; the updated service worker refreshes its cache. The repaired version has been tested using only the original runtime filenames, without any asset folder.

The existing design, colours, text, layout, photos and interactive tools are preserved. This is an update to the supplied website package, ready to upload to its existing GitHub Pages site. It has not been deployed, and no Google Search Console account was connected or changed.

## Upload and indexing

1. Extract this ZIP and upload **all extracted files** to the same GitHub Pages publishing folder as your current `index.html`, replacing the existing versions. Include all 16 HTML pages, `data.js`, `pwa.js`, `sw.js`, manifest, icons, sitemap, robots and verification file. Uploading the ZIP itself will not update the website. No `assets` folder is needed.
2. Allow the existing GitHub Pages deployment to finish. Open the home, admissions, merit-list, past-papers and calculator pages on the public website. Confirm that the stylesheet, photos and tools load, and that `robots.txt` and `sitemap.xml` are publicly accessible.
3. Open [Google Search Console](https://search.google.com/search-console/) with the account that owns the website. Select or add the URL-prefix property `https://salucommunity.github.io/`. The supplied Google verification meta tag and HTML verification file are preserved exactly. Complete ownership verification in that account if required.
4. In **Sitemaps**, enter `sitemap.xml` and submit it. It contains all 16 canonical page URLs.
5. In **URL inspection**, inspect the home page and the priority pages below. Use the live test to confirm access, then request indexing where appropriate. Monitor **Page indexing** and **Performance** after Google processes the site.

| Priority page | URL to inspect |
| --- | --- |
| Home | https://salucommunity.github.io/ |
| Admissions | https://salucommunity.github.io/admissions.html |
| Merit lists | https://salucommunity.github.io/merit-list.html |
| Aggregate calculator | https://salucommunity.github.io/aggregate-calculator.html |
| Past papers | https://salucommunity.github.io/past-papers.html |

Account verification, sitemap submission and index requests remain pending. Google decides which pages to crawl, index and rank; submitting a sitemap or requesting a crawl does not guarantee inclusion. See Google's [recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) and [sitemap instructions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## SEO changes

- Every page has a unique, focused title and meta description, with matching social metadata.
- Canonicals, internal links, app shortcuts and sitemap URLs consistently use the actual `.html` page files, with the root URL for the home page.
- Each URL contains its own relevant main content in the initial HTML. The other 15 hidden page copies were removed. Existing navigation still opens the same pages.
- Each page has one H1 in its visible main content. CSS preserves the previous heading appearance.
- Navigation, resource cards and relevant content lists are available in the HTML before JavaScript runs. The past-papers page also includes the default paper's 50 solved questions and 12 year buttons before scripts run.
- JSON-LD identifies SALU Community as an independent organization, with WebSite, page-specific WebPage types and breadcrumb markup. The FAQs page includes questions and answers matching its content. The calculator is described as a free educational web application. The non-functional search action and unrelated, site-wide FAQ markup were removed.
- Existing photos and logos retain their exact original bytes and descriptive alt text. They are embedded in the HTML, with explicit dimensions and decoding/loading hints. Social previews use the existing root `icon-512.png` file.
- Styling, application JavaScript and the past-paper archive are embedded in each page, so a missing upload folder cannot remove the design or these scripts.
- The service worker uses the actual page paths, supports all 16 pages offline after successful precaching and fetches fresh pages online. Its cache version changes for this repair. Existing install-banner behaviour is preserved.
- Past-paper links preserve the selected paper when a legacy home-page hash is forwarded to the dedicated past-papers page.

Google's [JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [crawlable link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) and [canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) informed these changes.

## Keyword mapping

| Target searches | Relevant page |
| --- | --- |
| SALU Admission 2027; Shah Abdul Latif University Admission 2027; SALU Admission Process | `admissions.html` |
| SALU First Merit List 2027; SALU Merit List PDF | `merit-list.html` |
| SALU Aggregate Calculator; SALU CPN Calculator | `aggregate-calculator.html` |
| SALU Past Papers PDF; SALU Solved MCQs | `past-papers.html` |
| SALU Closing Merit 2027 | The package contains merit-list PDFs and schedules, but no verified department-wise closing-merit table. No cutoff values or claims were invented. Add verified closing-merit content when available. |

Existing admissions dates, fees, formulas, PDF links and academic content were retained from the supplied website. They were not independently authenticated against university notices. SALU Community remains an independent student platform.

## Tests and results

| Check | Result |
| --- | --- |
| Desktop comparison of all 16 pages | Same visible text, heading styles and measured component layouts as the original |
| Mobile comparison | Home in 390px frames and admissions in 320px frames matched the originals; these are browser layout checks, not physical-phone tests |
| Automated SEO/asset audit | Passed: unique metadata, one relevant H1, page-specific content, canonical/schema consistency, sitemap, robots rules, internal targets, embedded styling/images/scripts, image attributes and JavaScript syntax |
| Past-paper preservation | All 12 papers and 555 questions retained |
| Content without JavaScript | Past-paper cards, 12 year buttons and 50 default solved questions present and styled |
| Calculator | BS-I, USAT and BS-III examples each returned 80.00%; failed-entry-test and invalid-mark validation checked |
| Search and departments | “Computer Science” returned 5 search results; the department filter returned the matching institute |
| Past-paper quiz | Year selection, direct paper/quiz links, scoring and reset passed; one correct 2015 answer returned 1/50 |
| Mock test | Scoring and reset passed; one correct answer returned 1/15 |
| Navigation and app banner | All 16 category links present; navigation and banner dismissal passed |
| Offline service-worker tests | Deterministic cache/network tests passed for 16 pages, app tracking URLs, fresh online navigation, embedded page resources and missing-asset handling |
| Browser application errors | None observed during the completed functional checks |
| Original image preservation | The embedded images matched the original image bytes |
| Upload failure reproduction | Repaired pages rendered and worked using only the original runtime filenames, with no asset folder |

The repaired pages contain **5,211,284 bytes of HTML** in total. This release embeds its styling, visual assets and application scripts to make uploads reliable. The earlier 94% HTML reduction applied to the separate-asset build and does not apply to this repaired version. Page-specific content, metadata, canonical URLs, structured data and the sitemap remain optimized.

Live deployment, Google indexing, Rich Results Test eligibility, field Core Web Vitals, physical-device installation and external PDF availability were not verified from this local package. The offline checks use test adapters; actual installation should be checked on the deployed HTTPS website.

## Future content updates

For announcements, merit links, fees, scholarships and other lists in `data.js`, edit that file and then run:

```sh
node refresh-content.mjs
python3 check-seo.py
node check-service-worker.mjs
```

The refresh command updates the corresponding static HTML and FAQ schema, updates sitemap dates for changed pages and refreshes the offline cache version. It needs Node.js 18 or newer; the SEO audit also needs Python 3.9 or newer. Upload the complete resulting folder after editing. The `seo-pages.json` file is a validation map; editing it alone does not rewrite page metadata.

This package assumes the existing public domain remains `https://salucommunity.github.io/`. A domain change also requires updating the HTML, runtime metadata, structured data, sitemap, robots sitemap directive and manifest association before publication.
