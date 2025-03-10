const CACHE_NAME = "pwa-cache-v1";
const baseURL = "/bonus6"; // Prefix with repository name

const URLS_TO_CACHE = [
  `${baseURL}/`, // Updated path to root
  `${baseURL}/index.html`, // Update path to index.html
  `${baseURL}/style.css`, // Update path to style.css
  `${baseURL}/script.js`, // Update path to script.js
  `${baseURL}/icons/icons8-weather-192.png`, // Update path to icon
  `${baseURL}/icons/icons8-weather-512.png`, // Update path to icon
];

// Install Service Worker and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate Service Worker and remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercept network requests and serve cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
