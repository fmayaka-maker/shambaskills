/* ShambaSkills offline worker: keeps the app working with no internet. */
const CACHE = "shambaskills-v45";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./pdf.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const cacheable = url.origin === location.origin || url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com");
  if (!cacheable) return;
  // Pages: try the network first (so updates arrive at once), fall back to the saved copy offline.
  if (e.request.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/sw.js")) {
    e.respondWith(Promise.race([
      fetch(e.request).then(res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); } return res; }),
      new Promise((_, rej) => setTimeout(() => rej("slow"), 5000))
    ]).catch(() => caches.match("./index.html").then(hit => hit || fetch(e.request))));
    return;
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => {
      const net = fetch(e.request).then(res => {
        if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      }).catch(() => hit || (e.request.mode === "navigate" ? caches.match("./index.html") : undefined));
      return hit || net;
    })
  );
});
