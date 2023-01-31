const cachename = "Ihyaussunnah"

self.addEventListener('install', e => {
    self.skipWaiting()
    e.waitUntill(
        caches.open(cachename).then(Cache => {
            const arr = [
                "./",
                "./main.css",
                "./main.js",
                "./media/Bismillah.svg",
                "./media/Header.svg",
                "./tasbeeh",
                "./tasbeeh/styles.css",
                "./tasbeeh/script.js",
                "./media/tasbeeh.png",
                "./du'a-o-azkar/media/evening.jpg",
                "./du'a-o-azkar/media/faraez.jpg",
                "./du'a-o-azkar/media/masael.jpg",
                "./du'a-o-azkar/media/morning.jpg",
                "./du'a-o-azkar/media/sunnat.webp",
                "./du'a-o-azkar/media/tibb-e-nabvi.jpg"
            ]
            return Cache.addAll(arr)
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

self.addEventListener('activate', e => {
    e.waitUntill(
        caches.keys().then(cachename => {
            return Promise.all(
                cachename.filter(cachename => {
                    // return true //if you want to remove this cache
                }).map(cachename => {
                    return caches.delete(cachename);
                })
            );
        })
    );
});
