// Automatically grab the version from the registration URL (e.g., sw.js?v=1.2.0)
const urlParams = new URL(self.location).searchParams;
const LATEST_VERSION = urlParams.get('v') || "2.0.9";

console.log(`[sw.js] 🟢 Booting up Service Worker v${LATEST_VERSION}`);

try {
    importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
    importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');
} catch (e) {
    console.warn('[sw.js] Offline: Firebase scripts failed to load natively.', e);
}

const CACHE_NAME = `lifeblogging-hub-${LATEST_VERSION}`;
// Bumped to v2 to flush the corrupted Open-Meteo cache responses
const EXTERNAL_CACHE_NAME = `lifeblogging-external-assets-v2`;

// Add all the files you want to cache for offline use
const urlsToCache = [
  '/',
  '/index.html',
  '/analyser/index.html',
  '/log/index.html',
  '/healthmanagr/index.html',
  '/changelog/index.html',
  '/converter/index.html',
  '/time/index.html',
  '/account/index.html',
  '/recipemanagr/index.html',
  '/podtrackr/index.html',
  '/hydrationtrackr/index.html', 
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
  '/output.css',
  '/recipemanagr/style.css',
  '/changelog-data.js',
  '/shared-nav.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',

  // --- ADD MISSING ASSETS ---
  '/favicons/pen-to-square.svg', // Used by Logger
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap', // Pre-cache fonts
  
// --- CRITICAL EXTERNAL LIBS (Explicitly Cache these) ---
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js'
];

// --- FORCE CACHE THESE IMMEDIATELY ON INSTALL ---
const externalUrlsToCache = [
  'https://cdn.tailwindcss.com?v=3.4.3',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.ttf',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
];

try {
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
            icon: '/icons/icon-192x192.png',
            data: payload.data 
        };
        self.registration.showNotification(notificationTitle, notificationOptions);

        const channel = new BroadcastChannel('app-notifications');
        channel.postMessage({
            notification: {
                title: notificationTitle,
                body: payload.notification.body,
                ...payload.data 
            }
        });
    });
} catch (e) {
    console.warn('[sw.js] Offline: Skipping Firebase Messaging initialization.');
}

// --- Handle Notification Clicks ---
self.addEventListener('notificationclick', (event) => {
    console.log('[sw.js] Notification click received.');
    event.notification.close(); // Close the native popup

    // Get the URL we passed from the Cloud Function (e.g., '/healthmanagr/')
    const targetUrl = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Check if there is already a window/tab open with the app
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                // If it's open, just focus it and navigate to the right tab
                if (client.url.includes(self.registration.scope) && 'focus' in client) {
                    client.navigate(targetUrl);
                    return client.focus();
                }
            }
            // If the app is completely closed, open a new window to the URL
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});

self.addEventListener('install', event => {
  console.log(`[sw.js] 📦 Installing v${LATEST_VERSION}...`);
  self.skipWaiting(); 
  
  event.waitUntil(
    Promise.all([
      // Pre-cache local app files
      caches.open(CACHE_NAME).then(async cache => {
        console.log(`[sw.js] Caching local app files for v${LATEST_VERSION}`);
        for (let url of urlsToCache) {
            try { await cache.add(url); } 
            catch (error) { console.warn(`[sw.js] Failed to pre-cache app file: ${url}`); }
        }
      }),
      // Pre-cache external styling libraries so the app is styled offline instantly
      caches.open(EXTERNAL_CACHE_NAME).then(async cache => {
        console.log(`[sw.js] Caching external design assets...`);
        for (let url of externalUrlsToCache) {
            try { 
                if (url.includes('tailwindcss')) {
                    // Tailwind CDN requires no-cors to bypass origin blocks
                    const request = new Request(url, { mode: 'no-cors' });
                    const response = await fetch(request);
                    await cache.put(request, response);
                } else {
                    // Fonts and Icons MUST use standard CORS to pass browser integrity checks
                    await cache.add(url);
                }
            } 
            catch (error) { console.warn(`[sw.js] Failed to pre-cache external design asset: ${url}`); }
        }
      })
    ])
  );
});

self.addEventListener('activate', event => {
  console.log(`[sw.js] 🚀 Activating v${LATEST_VERSION}...`);
  const cacheWhitelist = [CACHE_NAME, EXTERNAL_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log(`[sw.js] 🗑️ Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log(`[sw.js] ✅ v${LATEST_VERSION} has claimed control of the clients.`);
        return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // --- NEW: INTERCEPT SERVICE WORKER VERSION CHECK ---
  // The app will fetch this fake URL to check which SW version is running
  if (url.pathname === '/sw-version') {
      event.respondWith(new Response(LATEST_VERSION, {
          status: 200,
          headers: { 'Content-Type': 'text/plain' }
      }));
      return;
  }

  // 1. BYPASS SERVICE WORKER FOR API CALLS
  // Firebase APIs and dynamic external APIs must be ignored so they don't break offline syncing
  if (event.request.method !== 'GET' || 
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('firebaseapp.com') ||
      url.pathname.includes('/__/auth/') ||
      url.hostname.includes('cloudfunctions.net') ||
      url.hostname.includes('api.open-meteo.com') ||
      url.hostname.includes('openfoodfacts.org')) {
    return; 
  }

  event.respondWith((async () => {
    try {
      // 2. NETWORK FIRST: For your own local HTML/JS files
      if (url.origin === self.location.origin) {
        try {
                const networkResponse = await fetch(event.request);
                // Only cache valid 200 responses
                if (networkResponse && networkResponse.status === 200) {
                  const cache = await caches.open(CACHE_NAME);
                  cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
              } catch (error) {
                // If completely offline, fall back to our cached app files
                let cachedResponse = await caches.match(event.request, { ignoreSearch: true });
                
                // Aggressive routing fix to ALWAYS find the right HTML file offline
                if (!cachedResponse) {
                    const cache = await caches.open(CACHE_NAME);
                    const keys = await cache.keys();
                    const reqUrl = new URL(event.request.url);
                    const basePath = reqUrl.pathname.replace(/\/$/, "");
                    
                    for (const req of keys) {
                        const cachedPath = new URL(req.url).pathname;
                        if (cachedPath === basePath || cachedPath === basePath + '/' || cachedPath === basePath + '/index.html') {
                            cachedResponse = await cache.match(req);
                            break;
                        }
                    }
                }
                
                return cachedResponse || new Response("Offline", { status: 408, statusText: "Offline" });
              }
      }

      // 3. CACHE FIRST: For external assets (Tailwind, FontAwesome, Google Fonts)
      const cachedResponse = await caches.match(event.request, { ignoreSearch: true });
      if (cachedResponse) {
        return cachedResponse;
      }

      // 4. IF NOT CACHED, FETCH FROM NETWORK AND CACHE
      try {
        const networkResponse = await fetch(event.request);
        // Cache valid responses (including status 0 for cross-origin opaque scripts)
        if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
          const cache = await caches.open(EXTERNAL_CACHE_NAME);
          // Fire and forget caching (if this fails, it won't crash the app)
          cache.put(event.request, networkResponse.clone()).catch(() => {});
        }
        return networkResponse;
      } catch (error) {
        console.log(`[sw.js v${LATEST_VERSION}] 📶 Network failed for external asset, returning 408:`, event.request.url);
        return new Response("Offline", { status: 408, statusText: "Offline" });
      }

    } catch (fatalError) {
      console.warn(`[sw.js v${LATEST_VERSION}] ⚠️ Safely caught fatal fetch error:`, fatalError);
      return new Response("Offline", { status: 408, statusText: "Offline" });
    }
  })());
});