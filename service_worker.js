console.log('service worker is running');
importScripts('./message.js');
const storage = {variable : null};
const messageReceiverHandler = module.messageReceiverHandler;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((caches) => {
            caches.addAll([
                '/',
                './scripts/content.js',
                './manifest.json',
                './popup.css',
                './popup.html',
                './popup.js',
                './service_worker.js'
            ])
        })
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if(cacheName !== 'my-cache') {
                        caches.delete(cacheName);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if(response) {
                return response;
            } 
            return fetch(event.request).then((networkResponse) => {
                caches.open('my-cache').then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                })
            })
        })
    )
})

messageReceiverHandler(1, 'activate the create button');
messageReceiverHandler(3, 'execute content script to content');
messageReceiverHandler(5, 'sending elementList to the popup', storage);
messageReceiverHandler(8, 'show warning paragraph');



      




