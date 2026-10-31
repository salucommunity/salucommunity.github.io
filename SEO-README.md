# SALU Community public website with admin controls

Prepared 31 October 2026 for https://salucommunity.github.io/.

This is the matching public website for SALU-Community-Admin.html. For a new installation, extract this ZIP into the GitHub Pages publishing folder. For an existing working site, use the admin-only upgrade in SALU-TEST-EXPERIENCE-GUIDE.md instead; this ZIP contains starter data.js and must not overwrite your current content. Upload the extracted files, not the ZIP. All runtime files stay at one level. Styling, visual images, application code and the question archive are embedded in each HTML page, avoiding dependence on an assets folder.

The existing public design, colours, layout, features, photos and academic content are retained by default. Content markers and a renderer let the admin edit public text, links, images, metadata, landing cards and the archive. New card areas stay hidden until you add visible cards.

## Editing

Connect the admin to the public repository and branch, use Load latest, save your changes and select Publish Live. The publisher commits public data, page HTML, metadata and cache changes together. The old refresh-content.mjs workflow is superseded; do not use an older refresh helper with this package.

Member details, QR records and tokens are excluded from public publishing. Use the separate PRIVATE member repository feature for durable member storage.

## SEO retained

- Unique titles/descriptions and social metadata for 17 pages.
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

The release passed the 1,361-check SEO/asset audit and admin script syntax checks. The original 16-page content was retained and a separate Jobs Preparation page was added. Renderer tests cover text, cards, metadata, categories and archive edits. Earlier browser tests covered the original design/tools and upgraded admin workflows through test adapters.

No fresh browser session was available after reconnect. Real-account cloud setup, live Pages deployment, physical-device installation, field performance and Google indexing remain to be checked after upload. See SALU-START-HERE.md and SALU-TEST-RESULTS.json in the complete package.



## Complete-test library and uploads update

The paired admin now imports full tests (CSV, TSV, JSON, TXT, DOCX, XLSX and text PDFs), manages category headings/descriptions and related tests, and optimises image/PDF uploads. The public mock-tests page provides a category catalogue, timed quizzes, answer review and branded question/solved PDF downloads.

The root files salu-tests.js, salu-pdf.min.js and salu-test-licenses.txt belong to this feature. The updated admin publishes these tools automatically when upgrading an already-compatible website. Their offline-cache entries are included. PDF generation tools load on demand. See SALU-TESTS-AND-UPLOADS-GUIDE.md in the complete package for the working-site update steps.

## Jobs Preparation

Jobs Preparation and Mock Tests now have focused preparation pages, participant registration, one-question navigation and centrally saved results. Public PDF-download options are removed from those two pages; result PDFs are saved privately for the admin, with free/premium WhatsApp links shown below student results. Manage it in the new Jobs Preparation admin tab, including whole-paper imports and multiple file uploads with image/PDF optimisation. The starter Jobs category is empty until you add your material.
