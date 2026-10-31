# Preparation tests, participant results and WhatsApp groups

Updated 31 October 2026.

This update gives **Jobs Preparation** and **Mock Tests** their own focused pages. Their screens contain the preparation categories and tests, with no main-site announcement bar, organisational contact sections or public PDF-download buttons.

## Update your working website

1. Download a content backup from your current admin and temporarily switch Auto-publish off.
2. Replace your hosted admin file with **SALU-Community-Admin.html**, keeping the same address and browser. Your existing login and member register are retained.
3. In **GitHub Publishing**, check your existing repository, branch and token, then use **Load latest**. Restore any unpublished edits from your backup after loading the live version.
4. Open **Test Results & Groups** and enter your free and premium WhatsApp invite links. Jobs Preparation and Mock Tests have separate link fields and messages.
5. Click **Save test experience settings**, then **Publish Live**. This synchronises your current tests to the results service and updates the public pages together. Wait for GitHub Pages deployment, then reload the website.

The central results service is already deployed and its address is included in the admin. It uses the existing publishing token to verify admin access to `salucommunity/salucommunity.github.io`; no secret is embedded in the public website. Public students do not need a GitHub or ChatGPT account. If your actual publishing repository is different, its owner must update the results service's `ADMIN_REPOSITORY` runtime setting before connecting it.

**Use the admin-only upgrade above for your working site.** The website ZIP is for a new installation or recovery and contains starter `data.js`. Do not overwrite your current live content with that starter file.

## Student test flow

Students choose a test and enter:

- Name: required.
- Contact number: optional.
- City: required.

The form explains that these details are used for the result and saved result PDF, and that the administrator receives the submitted details and result.

Only one question appears at a time. **Previous** and **Next** retain selected answers; **Submit test** appears on the last question. The timer continues from the original start time when an interrupted attempt resumes. An expired resumed attempt submits its saved answers.

Normal Back and in-page navigation ask, **“Do you really want to leave the test? Your answers have not been submitted.”** Cancelling keeps the attempt open. Refresh/close uses the browser's native warning, whose wording is controlled by the browser. This is a practice-test flow, not a locked examination browser.

The server calculates the score using its saved answer key. A result is shown only after the result record and PDF have been saved. If the connection fails, answers remain available with **Retry saving result**. Retrying the same submission reuses its original saved result instead of creating duplicate records.

After submission, students see their score and can review answers one question at a time. Below the result, they see:

> For past-paper PDFs, mock tests and results, join our WhatsApp groups. Free and premium groups are available.

The two buttons are **Join free WhatsApp group** and **Join premium WhatsApp group**. A link not yet configured appears as “Coming soon”. These are group invitation links; access to a premium group is managed through your own WhatsApp arrangements.

## View submitted results

Open **Test Results & Groups → Load / refresh results**. Each record shows the candidate's name, optional phone number, city, test, submission time and score. Use **View PDF** or **Download PDF** to access the automatically saved result document. Search filters the loaded records; **Load older results** retrieves more. Results refresh while the tab is open when that option is enabled.

The PDF includes the participant's details, score, correct/incorrect/unanswered counts, time taken, submission time and attempt reference. It is created on submission even when your admin panel is closed. Only authorised admins can retrieve it. There is no student PDF-download endpoint.

Deleting a result from the admin permanently removes its record and PDF. It does not affect other results or member records.

## Continue uploading questions and material

The existing bulk question import, categories, timers, past-paper questions and image/PDF compression tools remain available in **Jobs Preparation** and **Mock Test Library**. You can still upload complete question files and multiple preparation files together.

Students see preparation material titles and descriptions. Public download buttons have been removed from the two preparation portals; group links below the result are the route for requesting PDFs and further material. Original archive pages elsewhere on the main website are separate from this focused test-page update.

## Storage and checks

The results service stores participant records and PDFs privately in persistent cloud storage. They are separate from public GitHub content and from the member-card register. Public `data.js` contains test content and group settings; it does not contain submitted participant records or GitHub tokens.

Server tests cover authoritative marking, private access, automatic PDF creation, concurrent submissions, retry, pagination and deletion. Portal tests cover registration, one-question navigation, optional phone, Back confirmation, resume, expiry, results and separate group links. The result PDF was rendered and visually inspected, including mixed English/Urdu details. The deployed service's anonymous health and protected admin boundary were checked in a browser. Full test flows used local DOM/API adapters; your actual GitHub token and live student attempts were not used during preparation.

The main GitHub Pages website still needs the installation and Publish Live steps above. The separate results service is already deployed.
