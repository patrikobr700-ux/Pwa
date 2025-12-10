// Toto je servisní worker „Offline stránka“

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-stránka";

// Úkol: nahraďte následující řádek správnou záložní offline stránkou, tj.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "Úkol-nahradit-tento-název.html";

self.addEventListener("zpráva", (událost) => {
  pokud (event.data && event.data.type === "PŘESKOČIT_ČEKÁNÍ") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async(event) => {
  událost.čekejteDo(
    cache.open(MEZEŘ)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

pokud (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('načíst', (událost) => {
  pokud (event.request.mode === 'navigovat') {
    event.respondWith((async() => {
      zkuste {
        const preloadResp = čeká na událost.preloadResponse;

        pokud (preloadResp) {
          vrátit preloadResp;
        }

        const networkResp = await fetch(event.request);
        vrátit síťovouResp;
      } chytit (chyba) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        vrátit cachedResp;
      }
    })());
  }
});
