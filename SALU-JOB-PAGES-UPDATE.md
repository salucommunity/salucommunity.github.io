# Separate job / test / preparation pages + job-portal Jobs Info (1 Nov 2026)

Install: replace your hosted admin HTML with SALU-Community-Admin.html (same filename), reload it, click Publish Live.
Your login, connection and draft are kept. salu-tests.js and salu-home-install.js are updated automatically on publish.

## Separate URLs (created on Publish Live)
- Every visible job:            job-<job-id>.html
- Every mock test:              mock-test-<test-id>.html
- Every job-preparation test:   preparation-<test-id>.html
- Every study material / past-paper entry: study-<id>.html
Each page has its own title, description, canonical link, sitemap entry and (jobs) JobPosting data.
Job pages show: summary, apply button, WhatsApp share, copy link, Latest jobs, Related job preparation, Related mock tests.
Hidden or removed items have their page deleted on the next publish. Only changed pages are re-uploaded.
Old #test=... links still work.

## Jobs Info (jobshub.html)
Job-portal layout: search console (keyword, location, category, status, sort), live result count, stats,
cards with status badges (New / Open / Closing soon / Closed), category and location chips, preparation links.
Searches are shareable, e.g. jobshub.html?q=clerk. Header search on detail pages jumps to the matching list.

## Admin
Job form has new optional fields: Organization, Location, Category, Qualification. Existing jobs keep working.
Each job row shows its own page address.

## Home popup
The floating "Jobs Preparation" chip is now a "Jobs Hub" popup: open-job count badge, latest 3 jobs (linked to their own pages),
buttons for all jobs / Job Preparation / Mock Tests. One gentle auto-preview per visit; remembers if closed.
