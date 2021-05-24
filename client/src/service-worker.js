/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
const dynamicCache = 'dynamic-v1';
const staticCache = 'static-v2';
const assets = [
  '/',
  '/static/css/*',
  '/static/js/*',
  '/favicon.ico',
  '/index.hmtl',
  '/logo192.png',
  '/logo512.png',
  '/manifest.json',
  '/robots.txt',
  '/service-worker.js',
];
// eslint-disable-next-line no-unused-vars
const dummy = self.__WB_MANIFEST;

self.addEventListener('install', (evt) => {
  evt.waitUntil(
      caches.open(staticCache).then((cache) => {
        console.log('caching shell assets');
        cache.addAll(assets);
      }),
  );
});

self.addEventListener('activate', (evt) => {
  console.log('service worker activated');
  evt.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(keys
            .filter((key) => key !== staticCache && key !== dynamicCache)
            .map((key) => caches.delete(key)),
        );
      }),
  );
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
      caches.match(evt.request).then((cacheRes) => {
        return cacheRes || fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          });
        });
      }),
  );
});
