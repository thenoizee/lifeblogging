// Import the changelog data to get the latest version
importScripts('/changelog-data.js');

// Use the latest version from the changelog for the cache name
const LATEST_VERSION = changelogData[0].version;
const CACHE_NAME = `lifeblogging-hub-${LATEST_VERSION}`;

// Add all the files you want to cache for offline use
const urlsToCache = [
  '/',
  '/index.html',
  '/analyser/index.html',
  '/log/index.html',
  '/medicine/index.html',
  '/changelog/index.html',
  '/converter/index.html',
  '/timestamp/index.html',
  '/account/index.html',
  '/recipemanagr/index.html',
  '/podtrackr/index.html',
  '/hydration/index.html', // Add the new hydration app
  '/palette/index.html', // Add the new palette app
  '/recipemanagr/style.css',
  '/changelog-data.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force the new service worker to activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // NETWORK FIRST: For index.html, root /, and changelog data
  // This ensures you always get the latest version if you are online.
  if (url.pathname.endsWith('index.html') || url.pathname.endsWith('/') || url.pathname.includes('changelog-data')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request)) // Fallback to cache if offline
    );
    return;
  }

  // CACHE FIRST: For everything else (CSS, Images, JS libs)
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all open clients
  );
});