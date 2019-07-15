const offlinePage = new Request("index.html");
self.addEventListener("install", event =>
  event.waitUntil(
    fetch(offlinePage).then(response => caches.open("sw-offline").then(cache => cache.put(offlinePage, response)))
  )
);

self.addEventListener("fetch", event =>
  event.respondWith(
    fetch(event.request).catch(error => caches.open("sw-offline").then(cache => cache.match("index.html")))
  )
);

self.addEventListener("refreshOffline", response =>
  caches.open("sw-offline").then(cache => cache.put(offlinePage, response))
);
