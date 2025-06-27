self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('dynamica-cache').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './manifest.json',
        './sw.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
