/**
 * 别忘带了 — Service Worker
 * 缓存静态资源，实现离线可用。
 */

const CACHE_NAME = 'biewanglele-v1';

const PRECACHE_URLS = [
  './',
  './index.html',
  './css/style.css',
  './js/store.js',
  './js/scenes.js',
  './js/items.js',
  './js/item-detail.js',
  './js/checkout.js',
  './js/search.js',
  './js/app.js',
  './manifest.json',
];

// 安装：预缓存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// 请求：缓存优先，网络回退
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
