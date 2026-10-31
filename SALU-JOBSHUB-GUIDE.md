# SALU Jobs Hub - notices, test reports and popup images

Updated 31 October 2026.

The new main Jobs address is **https://salucommunity.github.io/jobshub.html**. Job notices and the existing preparation tests appear on the same page. Old `jobs-preparation.html` links redirect to the new address, including their test links.

## Install on your working website

1. Download a content backup from your current admin. Temporarily switch Auto-publish off.
2. Replace your hosted admin with **SALU-Community-Admin.html**, keeping its existing address and browser.
3. Sign in and choose **GitHub Publishing → Load latest**. Restore any unpublished edits from your backup after loading the live version.
4. Open **Jobs Hub & Popup** to add notices or a popup image. Continue using **Jobs Preparation** / **Mock Test Library** to manage tests and question imports.
5. Click **Publish Live**. The publisher creates `jobshub.html`, updates menu/homepage links and the sitemap, and installs the old-address redirect automatically. Wait for GitHub Pages deployment and reload the website.

Use this admin-only upgrade for your working site. The separate website ZIP contains starter `data.js` for new installations or recovery; do not replace your current live content with that starter file.

## Add a job notice

Open **Jobs Hub & Popup → Add or edit a job notice**. Enter:

- Job title and description.
- Total vacancies.
- Last date.
- Apply link.
- Optional advertisement image.

Choose the image and wait for its compression preview, then click **Save job notice**. The image uploads to your repository and the notice is saved in the draft. **Publish Live** displays it publicly.

Each notice has a two-column information table: label on the left and details on the right. The advertisement appears below it. Visitors can tap the advertisement and use **Zoom in / Fit to screen** to read it clearly.

Use **Edit**, **Hide / Show**, the arrow buttons or **Remove** to manage notices. Removing a notice keeps its uploaded image file available in your repository; it does not delete other notices.

Images are optimised automatically with a higher resolution and quality floor for document text. The panel shows the actual before/after size. Dense advertisements may need several hundred KB to remain readable; the optimiser keeps quality rather than forcing every image into a tiny file.

## Header and contact

Jobs Hub uses your existing SALU emblem and name, plus search, WhatsApp and menu controls. Header search filters job notices and preparation content. The menu uses a single list on mobile.

The default contact is **03253061605**, controlled under **Jobs Hub header and page details**. Test PDFs and candidate-report PDFs use:

- The selected test name as the document title.
- The existing SALU paper design, emblem and header/footer.
- `https://salucommunity.github.io/jobshub.html` as the website link.
- `03253061605` as the contact, unless you update the Hub contact setting.

## Results: one complete PDF for each test

Open **Test Results & Groups → Load / refresh results**. The admin loads every result page and displays each test separately. Use the test selector, page filter or search to inspect candidates.

Each test has one **Download PDF** button above its candidate table. That PDF contains **all candidates for that test**, with name, contact, city and result. The export fetches the complete result listing, even if a search currently shows only a few rows. If a result page fails to load, the export stops and asks for a retry rather than downloading an incomplete report.

Individual candidate Save, View and other action buttons have been removed from the results tables. Candidate records continue to be saved centrally when students submit. Existing records are retained.

## Download a created test

Select the test in **Jobs Preparation** or **Mock Test Library**, then choose **Download test PDF**. It downloads the complete solved test, including its questions, answers and explanations, using the same SALU paper template with the Jobs Hub link and contact above. This control is in the admin; student test pages retain the submitted-result and WhatsApp-group flow.

## Image popup

Under **Jobs Hub & Popup → Popup image when the website opens**, select an image, optionally add a description and image link, and click **Save popup image**. Publish it to display the popup on public website pages.

With no uploaded image, no popup or overlay is created. **Clear popup image**, followed by **Publish Live**, removes it. By default it appears once per visit; a newly replaced image can appear again. Uncheck **Show once per visit** to show it on each page load. A resumed active test is not interrupted by the popup.

## Checks

The update passes 71 Hub/report checks, the 44-check admin regression suite and a 1,379-check public-page audit. The report test read 66 records across three result pages and included all 59 candidates belonging to the selected test, despite an active search filter. The four-page candidate report and three-page test paper were rendered and visually inspected, including Urdu and long names.

The browser preview checked the header, job table, popup, search, menu and test registration. Upload/publication tests used local GitHub and result-storage adapters; no sample notices or candidate records were published to your real website. Install and Publish Live to activate the update there.
