/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

const CACHE_VERSION = 'moviedb-v1';
const CACHED_RESOURCES = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/movie-list.css',
  '/images/hamburger-menu-icon_48x48.png',
  '/images/the-movie-db-logo_312x276.png',
  '/api.js',
  '/scripts/fetch.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then(cache => cache.addAll(CACHED_RESOURCES)) // eslint-disable-line comma-dangle
  );

  self.skipWaiting();
});

self.addEventListener('activate', () => {
  const cacheWhiteList = [CACHE_VERSION];

  // eslint-disable-next-line arrow-body-style
  caches.keys().then(cacheNames => {
    // eslint-disable-next-line array-callback-return, consistent-return
    return Promise.all(cacheNames.map(name => {
      if (cacheWhiteList.indexOf(name) === -1) {
        return caches.delete(name);
      }
    }));
  });
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(res => {
            if (!res || res.status !== 200 || res.type !== 'basic') {
              // TODO: Return 404 page
              return res;
            }

            const responseToCache = res.clone();
            caches
              .open(CACHE_VERSION)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return res;
          });
      })
      .catch(err => {
        console.log('Error, ', err); // eslint-disable-line no-console
        // TODO: return offline page
      }) // eslint-disable-line comma-dangle
  );
});
