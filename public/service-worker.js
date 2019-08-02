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

// self.addEventListener('activate', event => {
//   console.log('Finally active. Ready to start serving content!', event);
// });

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
            if (!res || res.status !== 200) {
              // TODO: Return 404 page
              return res;
            }

            // const responseToCache = res.clone();
            caches
              .open(CACHE_VERSION)
              .then(cache => {
                // const responseToCache = res.clone();
                cache.put(event.request, res.clone());
              });

            return res;
          });
      })
      .catch(err => {
        console.log('Error, ', err);
        // TODO: return offline page
      }) // eslint-disable-line comma-dangle
  );
});
