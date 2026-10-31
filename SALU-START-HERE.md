# SALU Community - latest Jobs Hub update

Start with **SALU-JOBSHUB-GUIDE.md** for the full instructions.

## Included files

- **SALU-Community-Admin.html**: updated admin with Jobs Hub & Popup, bulk test imports, test-paper PDFs and complete result reports by test.
- **SALU-Community-Managed-Website.zip**: matching public files for a new installation or recovery.
- **Question-Import-Templates/**: CSV, JSON and TXT question templates.
- **SALU-TEST-RESULTS.json**: completed checks and verification limits.
- **QR-LICENSE.txt** and **salu-test-licenses.txt**: third-party notices.

## Upgrade an existing working site

1. Download a content backup and temporarily switch Auto-publish off.
2. Replace the hosted admin HTML, keeping its existing address and browser.
3. Use GitHub Publishing > Load latest. Restore any unpublished edits from your backup afterwards.
4. Manage notices and images in Jobs Hub & Popup, tests in Jobs Preparation / Mock Test Library, and results in Test Results & Groups.
5. Publish Live and wait for GitHub Pages deployment, then reload the website.

The publisher creates jobshub.html and the compatible old-address redirect automatically. No real website notices or student records were seeded during development.

The website ZIP contains starter data.js. Preserve your working live content instead of overwriting it with that starter file. For a fresh installation, extract the website ZIP into the GitHub Pages publishing folder; uploading the ZIP itself does not install it.

## Existing records

Submitted test results remain in the existing private results service. Member details and permanent QR records remain in the separate member register. Keep downloaded backups of unpublished work. Existing login settings and card signatures are retained.
