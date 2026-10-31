# Representative registrations and Saved Members

This update uses your supplied final SALU-JobsHub-Header-Update.zip and department-representative.html. Your Jobs Info, Jobs Preparation and Mock Tests pages, shared header, styles, existing content and admin login are preserved.

## Install

1. Keep a backup of your existing admin and member records. Replace your hosted admin file with SALU-Community-Admin.html from this package, keeping its current filename/address.
2. Open the updated admin. Use your existing GitHub Publishing connection, choose Load latest from website, then Publish Live. This installs department-representative.html and the photo helper automatically. It keeps your live website content loaded in the admin; no separate member repository is required.
3. Share https://salucommunity.github.io/department-representative.html. The form submits privately to the same service that already saves mock-test results. The service update is already deployed.
4. Open Saved Members. New registrations appear as New registration. The panel checks every 30 seconds while open; Refresh members loads them immediately.
5. Click Make Card. The submitted name, department, semester, contact and saved photo fill your existing card. Its QR and member record are saved automatically. The Valid Till date uses the date selected in your card form, or the existing 01 January 2027 default. You can edit it before downloading/printing with the existing buttons.

The included SALU-Community-Managed-Website.zip is the full public-file package based on your final attachment. The admin's Publish Live step is sufficient for this update; do not overwrite newer live data.js edits with an older copy.

## What changed

- Representative registration is received in Saved Members instead of opening WhatsApp or copying a photo to the clipboard.
- All application answers are available under Details / QR. Registration does not publish applicant information on the public website.
- Small JPEG portraits are compressed before uploading, with a maximum 720-pixel edge and a 150 KB upload limit. Normal portraits are commonly smaller; the achieved size depends on the image. The test portrait reduced from 10,109,128 bytes to 70,246 bytes.
- The member list loads text metadata only. A portrait is requested privately when a card is opened. Full-size originals are not uploaded.
- Member details, compressed portraits and QR records are saved in the existing private service, rather than a separate GitHub member repository. Your existing website publishing token still authorises admin access.
- Older records already saved on this device migrate when you Refresh members. Existing v2 member JSON backups can also be imported. If records exist only in an older private repository, download/import that member backup using your old admin first. Photos that were never saved previously must be uploaded once.
- A compact device cache and offline photo drafts are retained for retry. The admin reports failed saves and does not claim that an interrupted request reached permanent storage. New registration retries do not create duplicate records.
- Download member backup exports full member details and QR history. Compressed portraits remain in private service storage.

## Validation

Representative tests cover direct form submission, retry handling, private access, photo compression, one-click card generation, older-backup migration, durable storage, publication and preservation of existing design/scripts. Existing server grading and results tests also pass. Browser inspection confirmed the representative form and Saved Members layout. Test applicants were used only in isolated test storage.
