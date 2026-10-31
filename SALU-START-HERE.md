# SALU Community admin and public website

Prepared 31 October 2026.

This package contains the upgraded admin panel and its matching public website. The public website keeps its existing colours, layout, photos and tools. Styling, visual images and the main application remain embedded in each HTML page to avoid the missing-assets problem seen after upload.

## Files

- SALU-Community-Admin.html: self-contained admin panel. Your supplied login settings, logos and signatures are retained.
- SALU-Community-Managed-Website.zip: public website files for a new installation or recovery. Its data.js is starter content; preserve your working live data when upgrading.
- SALU-TEST-RESULTS.json: completed checks and their limits.
- QR-LICENSE.txt: licence for the embedded QR generator.

## Installation

**Already using the working admin and website?** Start with **SALU-JOBS-PREPARATION-GUIDE.md**. This update adds a separate Jobs Preparation page, its admin tab, bulk question imports and preparation downloads. Back up your draft, replace the hosted admin HTML, load the latest website data and publish. The new admin creates the Jobs page and publishes its homepage/menu links and matching test/PDF tools automatically.

1. Back up the current website repository.
2. Extract SALU-Community-Managed-Website.zip.
3. Upload its extracted contents into the existing GitHub Pages publishing folder, replacing the existing files. Keep index.html, data.js, all page files, icons, manifest, pwa.js, sw.js, sitemap and robots at that level. Include .nojekyll if your upload method displays it. Uploading the ZIP itself does not update the website.
4. Let Pages finish deployment, then reload. Close and reopen the installed app if it shows older cached content.

Keep the admin HTML separate from the public website files. Open it in your trusted browser using your existing admin setup. A hosted copy needs HTTPS for the existing login encryption. Your GitHub token controls repository access; the panel's local login is not server authentication.

## Public website connection

Sign in using your existing admin login. In the GitHub connection section, enter owner/repository, the publishing branch and a token with Contents read and write access. Use Load latest before publishing.

Save edits, then select Publish Live. The panel commits public content, page HTML and metadata together; GitHub Pages deploys that commit next. If the remote version changed after loading, publishing stops and retains your draft. Export a draft backup before replacing local content with the remote version when needed.

## Website controls

- Landing cards: add, edit, position, reorder, hide or remove cards, including their text, links and images. Edit, reorder or hide existing category cards.
- Page content & images: informational text and links across all 16 pages, shared header/footer, page images, SEO titles and descriptions.
- Past-paper archive: papers, years, PDF links, questions, answers and explanations.
- Mock Test Library: category headings/descriptions, separate tests, related tests, bulk question imports, timed practice and generated question/solved PDFs.
- Uploads & compression: automatic image/PDF optimisation with before/after sizes, downloads and website uploads. Existing upload controls use the same optimiser.
- Existing managers: announcements, merit lists, fees, scholarships, departments, seats, resources, mock-test questions, results, FAQs and shared contact links.

Saved edits are drafts until published. Publishing updates static HTML as well as runtime data, so published text and cards are available before JavaScript runs.

## Member cards

Card detail order: Member ID, Name, Department, Semester, Contact, Valid Till.

Choose an expiry date. It prints in full, for example 01 January 2027 or 01 June 2027. Use Generate & save details or Save details & QR.

Saved members supports search, active/expired/archived filters, reopening cards, QR downloads, version history, archive/restore and JSON backup/import. The register saves details and the exact QR payload. Individual member photos and rendered card images are not stored; upload the member photo again when reopening a card for printing.

The QR contains the member details, semester and validity date for offline reading. It is not a live status check or proof of authenticity. Updating or archiving a member preserves older QR information in history; an already printed QR keeps its original content.

## Durable private member storage

Browser data can be cleared. To keep a copy outside this browser:

1. Create a separate PRIVATE GitHub repository, for example your-account/salu-private-members. Initialize it with a README so its branch exists.
2. Give a token Contents read and write access to that repository. A separate token is supported. Reuse the website token only if you deliberately grant it access to both repositories.
3. In Saved members, enter the private repository, branch and token, then select Connect private storage.
4. Confirm the panel reports the records are saved in private storage. New saves sync while connected. Remembered tokens are encrypted through the existing admin login; the panel can reconnect after sign-in.
5. Export JSON backups periodically. On another device, connect the same private repository or import a backup.

The panel checks repository visibility before reading or writing member records, refuses public repositories and keeps revision history when merging. Cloud records are stored in members.json. Keep this repository private and retain access to the account.

This package is not connected to your real GitHub repositories. That one-time connection must be completed by you. Member records never belong in the public website repository.

## SEO and verification

Page-specific metadata, canonical links, structured data, crawlable content, robots.txt, the 16-page sitemap and your supplied Google verification files are retained. Search Console verification, sitemap submission and indexing requests still require your owner account. Google determines indexing and rankings.

Completed checks: 1,460-check SEO/asset audit; admin script syntax; 17 public pages, including the new Jobs page; content/card/archive rendering; separation of private records; concurrent-update handling; six QR decode round trips with normal, Unicode and long details. Earlier interactive tests covered saving/reloading records, private-repository refusal, cloud sync through test adapters, history and publication.

Cloud tests used test adapters, not your account. The updated 1620 x 1020 member-card export has been rendered using the original card font, visually inspected and QR-decoded. Its signature area is now smaller and its member details have more height and larger text. A fresh browser session was unavailable for the admin preview; image upload interaction and automatic reconnect were not rechecked in a fresh browser. Review a sample printed card and the deployed website after setup. Details are in SALU-TEST-RESULTS.json.

