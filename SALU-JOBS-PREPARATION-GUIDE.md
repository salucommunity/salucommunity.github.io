# SALU Community — Jobs Preparation update

Prepared 31 October 2026.

This adds a separate public **Jobs Preparation** page at `jobs-preparation.html`, a homepage card, menu links and a dedicated **Jobs Preparation** admin tab. The existing SALU design and other tools are retained. No job notices, exam dates or official past papers have been invented; add your own material through the panel.

## Install on your working website

1. In your current admin, download a backup of your content and unpublished edits. Temporarily switch Auto-publish off.
2. Replace your hosted admin HTML with **SALU-Community-Admin.html**, keeping its existing address and using your usual browser. Sign in with your existing login.
3. Open **GitHub Publishing → Load latest** so the panel has your current live content and version. If you have unpublished edits, restore your downloaded backup after loading the latest version.
4. Open the new **Jobs Preparation** tab. Add your categories and material, then click **Publish Live**.
5. The publisher creates the new Jobs page from your installed compatible public template and updates the homepage/menu links, test/PDF tools, sitemap and offline cache together. Wait for GitHub Pages deployment, then reload the website or reopen the installed app.

The website ZIP is for a new installation or recovery. **Its `data.js` contains the original starter content; do not replace your working live content with it.** The recommended admin-only upgrade above loads and preserves your current content. Uploading a ZIP to the repository without extracting it does not install its contents.

## Control the Jobs page

In **Jobs Preparation**, you can:

- Change the page heading and introduction, or show/hide its homepage card.
- Create job/exam categories, each with its own heading and description; reorder or hide categories.
- Add mock tests and question-based past papers, with titles, descriptions, time limits, related tests and optional original PDF links.
- Add study material, notes, syllabi, scanned papers and other downloads. Edit their titles, descriptions, links and visibility.
- Move a test already in your existing mock-test library into a Jobs category without retyping its questions.

Jobs content is separate from the existing admission/community practice tests. The shared question editor remains available through **Edit individual questions**. Empty tests are not displayed publicly until questions are added.

## Import all questions together

1. Select a Jobs category. Choose **New paper**, enter its title and choose **Mock test** or **Past paper**.
2. Select a question file, or paste the complete numbered paper and answer key. File selection reads and previews its questions automatically.
3. Click **Import all questions**, then **Publish Live**. No need to save each question separately.

Use the included CSV, JSON or TXT templates. Typed DOCX, first-sheet XLSX, TSV and selectable-text PDF are also supported. CSV/JSON can contain multiple test titles; enable **Create Jobs categories from category names in the file** to create their categories in the same import.

Every question needs 2–6 options and a correct answer. Missing answers are reported for correction. Invalid batches leave existing questions unchanged; appending skips exact duplicates. Use **Replace** only when you intend to replace the selected paper's questions. Up to 3,000 questions can be imported at once, with 15,000 questions across the library.

Scanned/image-only PDFs can be uploaded as downloadable papers immediately. Extracting their questions needs OCR first. Review text extracted from multi-column PDFs before importing.

## Upload several PDFs/images/files together

1. Choose the Jobs category and **Study material** or **Past-paper downloads**.
2. Select multiple files under **Upload several files together**.
3. Click **Compress, upload & add all files**. The panel optimises images/PDFs, uploads the files and creates their download cards together.
4. Click **Publish Live** to show them publicly.

File names become initial card titles. Use **Add a link or edit download details** to change a title/description, add a cover image, or hide an entry. Removing a download entry does not delete its underlying uploaded file.

Compression shows the actual size reduction and keeps the original when optimisation would be larger. Images can become much smaller; already compressed PDFs may shrink only slightly. Text documents and ZIP files retain their original bytes. Large readable documents cannot reliably be reduced to a few bytes. Upload time depends on file size, phone speed and connection. The per-file upload limit is 30 MB.

## What students get

Students can search and filter Jobs categories and content types, take timed/untimed mock tests, review scores and answers, find related tests and download materials. Each question-based test/paper offers **Download question PDF** and **Download solved PDF**, using the existing SALU Community branding settings in the shared test manager.

Drafts are saved in the browser's existing draft store. Published content and uploaded files are saved to your connected repository. Keep downloaded backups for unpublished work. Member details and QR records continue using the separate member register.

## Validation

The release passes 66 Jobs checks, 54 test/upload/PDF checks, 44 admin regression checks and the 1,460-check audit across 17 public pages. The tests include a 500-question Jobs import, a three-file upload, automatic creation of the Jobs page on an older compatible site, category isolation, PDF action wiring and concurrent-publish protection. Tests used local DOM, canvas and GitHub adapters; your live repository was not changed. A fresh browser session was unavailable.
