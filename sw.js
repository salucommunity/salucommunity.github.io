/* SALU Community service worker: always loads the newest files when online,
   and falls back to the saved copy when the internet is off. */
const CACHE = "salu-community-v3";
const CORE = ["./", "index.html", "data.js", "pwa.js", "manifest.webmanifest", "icon-192.png", "merit-list", "announcements", "fee-structure", "department-seats", "aggregate-calculator", "past-papers"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(CORE.map(u => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r, { cache: "no-cache" })
      .then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); } return res; })
      .catch(() => caches.match(r, { ignoreSearch: true }).then(hit => hit || (r.mode === "navigate" ? caches.match("index.html") : undefined)))
  );
});
