'use strict';

const ver = 'v1:';
const dynamicCache = "v1:dynamic";
const staticContent = [
  "",
  "img/favicon/favicon.ico",
  "css/main.min.css",
  "css/main.min.css.map",
  "js/main.min.js",
  "js/main.min.js.map"
];

self.addEventListener('install', event => 
  event
    .waitUntil(caches.open(ver + 'SmartApp')
    .then(cache => cache.addAll(staticContent)))
)

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.url.indexOf("browser-sync") > -1 || req.method !== "GET") {
    return;
  }
  if (req.url.startsWith("https://maps.googleapis.com")) {
   event.respondWith(
     caches.open(dynamicCache).then(cache => 
        fetch(req)
         .then((response) => {
           cache.put(req, response.clone());
           return response;
        })
    ));
  }
  event.respondWith(
    caches.match(req)
      .then(cached=> {
        const fetched = response => {
          let cacheCopy = response.clone();
          caches.open(ver + "pages").then(cache => cache.put(req, cacheCopy));
          return response;
        }
        const unavailable = () => 
          new Response("<h1>Service Unavailable</h1>", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/html"
            })
          })
        const networked = fetch(req)
          .then(fetched, unavailable)
          .catch(unavailable);

        return cached || networked;
      })
  )
})
self.addEventListener('activate', event => 
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys
      .filter(key => !key.startsWith(ver))
      .map(key => caches.delete(key))
  ))
));
