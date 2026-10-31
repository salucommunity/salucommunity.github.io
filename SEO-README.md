# SALU Community public website with admin controls

Prepared 31 October 2026 for https://salucommunity.github.io/.

This is the matching public website for SALU-Community-Admin.html. Extract this ZIP and replace the existing files in the GitHub Pages publishing folder. Upload the extracted files, not the ZIP. All runtime files stay at one level. Styling, visual images, application code and the question archive are embedded in each HTML page, avoiding dependence on an assets folder.

The existing public design, colours, layout, features, photos and academic content are retained by default. Content markers and a renderer let the admin edit public text, links, images, metadata, landing cards and the archive. New card areas stay hidden until you add visible cards.

## Editing

Connect the admin to the public repository and branch, use Load latest, save your changes and select Publish Live. The publisher commits public data, page HTML, metadata and cache changes together. The old refresh-content.mjs workflow is superseded; do not use an older refresh helper with this package.

Member details, QR records and tokens are excluded from public publishing. Use the separate PRIVATE member repository feature for durable member storage.

## SEO retained

- Unique titles/descriptions and social metadata for 16 pages.
- Canonical links, internal links and sitemap entries use actual HTML filenames, with the root URL for home.
- One relevant H1 and page-specific content per URL; important content appears in initial HTML.
- Organization, WebSite, page, breadcrumb and relevant FAQ structured data.
- Descriptive image alt text, explicit image sizes and embedded assets.
- Robots, sitemap and supplied Google verification files.
- Initial archive of 12 papers and 555 questions, editable through the admin.
- Existing navigation, calculator, quizzes, installation prompt and offline support.

After deployment, open your existing Google Search Console property, complete ownership verification if needed, submit sitemap.xml and inspect priority URLs. No Google account has been connected here. Google decides what to crawl, index and rank.

Existing notices, dates, fees, formulas and PDF links were retained from your files; confirm their accuracy before publishing updates. SALU Community remains an independent student platform.

## Checks

The release passed the 1,308-check SEO/asset audit and admin script syntax checks. Default public content/structure was compared with the repaired baseline on all 16 pages. Renderer tests cover text, cards, metadata, categories and archive edits. Earlier browser tests covered the original design/tools and upgraded admin workflows through test adapters.

No fresh browser session was available after reconnect. Real-account cloud setup, live Pages deployment, physical-device installation, field performance and Google indexing remain to be checked after upload. See SALU-START-HERE.md and SALU-TEST-RESULTS.json in the complete package.

