const LATEST_VERSION = "1.0.0"; 

importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

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
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
// ADD THESE 3 LINES to your existing urlsToCache array:
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js'
];

firebase.initializeApp({
    apiKey: "AIzaSyBL_FesZhiD3JQH8ftmDgTS8HBdVPL1cj8",
    projectId: "sammy-7298f",
    messagingSenderId: "963185683535",
    appId: "1:963185683535:web:807df8941feba46c208e3a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icons/icon-192x192.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);

    // ADD THESE TWO LINES: Broadcast the message to the open app
    const channel = new BroadcastChannel('app-notifications');
    channel.postMessage(payload);
});

self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        console.log('Opened cache');
        // Add items one by one so a single 404 doesn't break the whole installation
        for (let url of urlsToCache) {
            try {
                await cache.add(url);
            } catch (error) {
                console.error(`[sw.js] Failed to cache: ${url}`, error);
            }
        }
      })
  );
});

self.addEventListener('fetch', event => {
  // 1. IGNORE NON-GET REQUESTS (Fixes the POST error for Firebase calls)
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // 2. NETWORK FIRST: For main pages and data that changes often
  if (url.pathname.endsWith('index.html') || url.pathname.endsWith('/') || url.pathname.includes('changelog-data')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 3. RUNTIME CACHING FOR EXTERNAL ASSETS (Fonts, Firebase chunks, Tailwind extensions)
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
            return Response.error();
        });
      })
    );
    return;
  }

  // 4. CACHE FIRST: For everything else (Local CSS, Images, JS libs)
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