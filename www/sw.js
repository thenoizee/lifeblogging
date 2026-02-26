// Import the changelog data to get the latest version
importScripts('/changelog-data.js');

// Use the latest version from the changelog for the cache name
const LATEST_VERSION = changelogData[0].version;
const CACHE_NAME = `lifeblogging-hub-${LATEST_VERSION}`;
const EXTERNAL_CACHE_NAME = `lifeblogging-external-${LATEST_VERSION}`;

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
  '/hydration/index.html', 
  '/palette/index.html', 
  '/tasktrackr/index.html',
  
// --- SUBFOLDERS ---
  '/vidtrackr/',
  '/vidtrackr/index.html',
  '/vidtrackr/api_keys.js',
  
  // ADD THESE LINES:
  '/moneymanagr/',
  '/moneymanagr/index.html',
  
  // --- ASSETS ---
  '/recipemanagr/style.css',
  '/changelog-data.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',

  // --- ADD MISSING ASSETS ---
  '/favicons/pen-to-square.svg', // Used by Logger
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap', // Pre-cache fonts
  
  // --- CRITICAL EXTERNAL LIBS (Explicitly Cache these) ---
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'
];

self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // We use addAll. If one fails (e.g. temporary network blip), the install fails.
        // This ensures we have everything needed for offline.
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1. NETWORK FIRST: For main pages and data that changes often
  if (url.pathname.endsWith('index.html') || url.pathname.endsWith('/') || url.pathname.includes('changelog-data')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 2. RUNTIME CACHING FOR EXTERNAL ASSETS (Fonts, Firebase chunks, Tailwind extensions)
  // This catches things we didn't explicitly list in urlsToCache (like woff2 font files)
  if (url.hostname.includes('gstatic.com') || 
      url.hostname.includes('googleapis.com') || 
      url.hostname.includes('tailwindcss.com') || 
      url.hostname.includes('cloudflare.com')) {
      
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        
        return fetch(event.request).then(networkResponse => {
          // Check if we received a valid response
          if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
            return networkResponse;
          }
          
          // Clone the response because it's a stream
          const responseToCache = networkResponse.clone();
          caches.open(EXTERNAL_CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        }).catch(() => {
            // Determine fallback logic if needed
            return null;
        });
      })
    );
    return;
  }

  // 3. CACHE FIRST: For everything else (Local CSS, Images, JS libs)
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, EXTERNAL_CACHE_NAME];
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
    }).then(() => self.clients.claim()) 
  );
});