# SALU Community: bulk tests and smaller uploads

Updated 31 October 2026.

## Update your working website

1. In the current admin, use **GitHub Publishing > Download backup**. Switch Auto-publish off while installing the update.
2. Replace your hosted admin HTML with the updated **SALU-Community-Admin.html**, using the same address and browser as before. Your login settings and compact member-card layout are retained.
3. Sign in, open GitHub Publishing and select **Load latest**. This brings your existing public website content into the new panel.
4. If the backup contains unpublished edits, use **Import backup** to restore them after loading the latest version.
5. Save a test or other content and select **Publish Live**. The publisher installs the matching public test catalogue, PDF tools and offline-cache entries automatically with the content. A previously installed, compatible public website does not need another manual full-file upload for this update.

The separate website ZIP is included for a new installation or recovery. Keep existing content backed up before replacing it with the website ZIP's default data. No real GitHub repository or deployed website was changed while preparing this release.

## Import a complete paper in one action

Open **Mock Test Library**. Create a category with its heading and description, then enter the test title, description and time limit. A zero-minute limit means untimed practice.

Choose a question file or paste the complete paper. Select **Create new test(s)** or an existing test as the destination. Click **Import all questions** to save the complete valid batch together. The file picker reads and previews a selected file automatically; you can also use **Check / preview** before importing pasted text.

Supported inputs:

- **CSV / TSV:** best for large question sets. Use columns Question, A, B, C, D and Answer. Subject and Explanation are optional. Test, Category, Description and Duration can group several tests in one file.
- **JSON:** one test, an array of questions, or a tests array containing several papers. Use the provided template. Correct-answer letters or the explicit zero-based answerIndex field are supported.
- **TXT / Markdown:** numbered questions with labelled options and answer lines, as shown below. A separate answer key such as `1-B, 2-C` is supported.
- **XLSX:** the first worksheet, using the CSV column headings. Formula cells use their last saved values.
- **DOCX:** typed question numbers, option labels and answer lines. Automatic Word list numbering may need to be added to the extracted text.
- **PDF:** selectable question text with numbers, options and an answer key. Image-only/scanned PDFs need OCR before question import. Review extracted text, question counts and the answer key; complex column layouts may need cleanup.

The question editor supports 2 to 6 choices per question. It does not infer missing answers or grade essay questions. An invalid batch changes no existing questions. Appending skips exact duplicates and refuses duplicates with conflicting answers. Replacing swaps the selected question set; a restore point is saved first.

For phone performance, import up to 3,000 questions in one batch. The library supports up to 3,000 questions per test and 15,000 across all tests. Larger drafts use IndexedDB alongside the original compact browser copy. Publish and download backups to keep copies outside this browser.

### Text example

```text
Test: Science Practice Set 1
Category: Science
Description: A short entry-test practice paper.
Duration: 20

[General Science]
1. Which planet is called the Red Planet?
A. Earth
B. Mars
C. Venus
D. Jupiter
Answer: B
Explanation: Mars has a reddish surface.

[Mathematics]
2. What is 8 × 7?
A. 48
B. 54
C. 56
D. 64
Answer: C
Explanation: Eight multiplied by seven equals fifty-six.
```

Download templates inside the admin, or use the files in **Question-Import-Templates** in the complete package. To use the title/category entered in the form, leave those metadata columns blank in a CSV. When filled, file metadata controls the grouping.

## Categories, related tests and questions

Each category has a heading, description and visibility setting. Each test has its own title, description, duration, original-PDF link and visibility. Reorder or hide categories and tests. A visible test appears publicly after it contains questions and is published.

Related tests come from the same category automatically. Choose additional related tests in the test details form. Use Edit beside a saved test to search, reorder, edit or remove its questions. The question list displays 40 rows at a time to keep large papers manageable on phones.

The bulk import destination can also be an existing **past-paper archive** item. Import one complete question set into that paper, using append or replace. Its existing year, title and resource links are retained.

## Public quizzes and PDF downloads

Students can browse categories, search tests, open related papers, take a timed or untimed quiz, submit answers and review scores and explanations. Timed attempts submit automatically at expiry.

Each test offers a **question PDF** and a **solved PDF** generated from its saved questions. The header includes the SALU emblem, organisation name and tagline. Papers include the test title, category, description, duration, options, website, contact details and page numbers. The solved version adds answers and explanations. Edit PDF header/footer wording in the admin.

The PDF tools load when a PDF is requested. Fonts are bundled so downloaded PDFs do not depend on the reader's installed fonts. English and maths text remain vector text. Urdu/Sindhi lines use high-resolution text images to preserve joining and direction, so those lines are not selectable. Two generated example papers are included in the package.

## Automatic image and PDF optimisation

Existing page-image, landing-card, member-card and PDF upload controls now use automatic local optimisation. The **Uploads & compression** tab also accepts several images/PDFs, shows the original and optimised sizes and provides Download optimised and Upload to website actions.

Images are resized for their intended use and compressed, generally targeting about 180 KB for site images. JPG, PNG and WebP are supported. GIF animation is preserved. Signature uploads use lossless PNG processing and retain transparency. A candidate is kept only when it is smaller than the original.

PDF automatic mode preserves text and layout, compresses eligible JPEG images and reduces scan-only documents where useful. **Smaller image PDF** mode can make a text document smaller by converting pages into images; selectable text is then lost. Forms and linked/annotated documents stay in the text-preserving mode, and signed PDFs are kept unchanged. A PDF that is already compact may remain its original size.

Optimisation runs on your device. Selecting a file does not upload it to a third-party compression service. Upload to website saves the optimised file to your configured GitHub repository. Use a PDF's **Use for selected test** action to attach it as the optional original paper, then publish the test metadata.

The media uploader supports files up to 30 MB. PDF optimisation checks up to 120 pages; scan conversion is limited to 60 pages for phone memory. Question-file import supports files up to 20 MB and text PDFs up to 100 pages. Larger inputs return a clear message or retain the original rather than claiming a false size reduction.

## What was checked

- A complete 500-question import through the actual admin controls.
- CSV, JSON, numbered text, separate answer keys, DOCX, XLSX and text-PDF imports.
- Missing-answer rejection, duplicate handling and atomic imports.
- Category headings/descriptions, related tests, scoring, explanations and timer expiry.
- Automatic publication of the new tools onto the prior compatible website, with concurrent-update protection.
- Large device drafts, original login code and existing member-card fields.
- Real image encoding, scan-PDF compression, embedded-JPEG compression, searchable PDF text, signed-PDF preservation and form value/widget preservation.
- Branded PDF generation and rendered-page inspection, including Urdu/Sindhi.
- Existing publishing/privacy regression checks and the 16-page SEO audit.

Tests use local DOM/API adapters and actual encoders. No new live browser session, real-account deployment or physical-phone check was available. Review the deployed interface after updating. Compression results vary with the source file; the size report shows the actual result.
