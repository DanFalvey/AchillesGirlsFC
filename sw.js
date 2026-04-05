const CACHE_NAME = 'achilles-fc-v1';

// Core assets to cache on install — the site shell works offline
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/team-albion.html',
  '/team-flamingos.html',
  '/team-pumas.html',
  '/css/style.css',
  '/js/main.js',
  '/images/logo-club.png',
  '/images/logo-albion.png',
  '/images/logo-flamingos.png',
  '/images/logo-pumas.png',
  '/images/photo-flamingos.jpg',
  '/images/photo-pumas.jpg'
];

// Install: cache all core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache first, fall back to network
// FA Full Time scripts always go to network (live data)
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always fetch FA Full Time live data from network
  if (url.hostname.includes('thefa.com')) {
    event.respondWith(fetch(event.request).catch(() => new Response('')));
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful GET responses
        if (event.request.method === 'GET' && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
