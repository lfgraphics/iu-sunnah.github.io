self.addEventListener('install', e => {
    e.waitUntill(
        caches.open("Ahyaussunnah").then(Cache => {
            return Cache.addAll(["./", "./main.css", "./main.js", "./media/Bismillah.svg", "./media/Header.svg"])
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})
