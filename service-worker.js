/* eslint-disable no-undef */

if (workbox) {
  // adjust log level for displaying workbox logs

  // apply precaching. In the built version, the precacheManifest will
  // be imported using importScripts (as is workbox itself) and we can 
  // precache this. This is all we need for precaching
  workbox.precaching.precacheAndRoute(self.__precacheManifest);
  workbox.routing.registerNavigationRoute('/funemploy/index.html')
  workbox.routing.registerRoute(/^\/funemploy\/.*/,
    async ({event}) => {
      return caches.match('/funemploy/index.html');
    }
  );
}

// this is fucking broken, but it works <3