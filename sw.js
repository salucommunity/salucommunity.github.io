/* SALU Community: network-first HTML pages with embedded styling, images and application code. */
const CACHE = "salu-community-cms-f2a8d502dd43";
const CORE = ["./","about.html","admissions.html","aggregate-calculator.html","announcements.html","contact.html","department-seats.html","departments.html","entry-test-preparation.html","faqs.html","fee-structure.html","index.html","merit-list.html","mock-tests.html","past-papers.html","results.html","scholarships.html","data.js","pwa.js","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","salu-pdf.min.js","salu-tests.js","salu-test-licenses.txt","jobs-preparation.html","jobshub.html"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => Promise.allSettled(CORE.map(url => cache.add(url)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("salu-community-") && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    try {
      const response = await fetch(request, {cache:"no-cache"});
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => {}));
      }
      return response;
    } catch (error) {
      return (await caches.match(request, {ignoreSearch:true})) ||
        (request.mode === "navigate" ? await caches.match(new URL("index.html", self.registration.scope).href) : null) ||
        new Response("Content unavailable offline", {status:503, headers:{"Content-Type":"text/plain; charset=utf-8"}});
    }
  })());
});
