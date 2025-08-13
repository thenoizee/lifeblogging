const CACHE_NAME = 'logger-worker-v2.8.0';
// Add the files you want to cache. 
// Since your app is a single file, we only need to cache that.
const urlsToCache = [
  '/',
  '/index.html'
];

// 1. Install the service worker and cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Serve cached content when offline
self.addEventListener('fetch', event => {
  // We only want to cache GET requests for our app shell.
  // Firebase requests and others should go directly to the network.
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response from the cache
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});


// 3. Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});