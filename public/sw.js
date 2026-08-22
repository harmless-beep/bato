/* बाटो service worker — offline cache for static export */
const CACHE = 'bato-v1'
const BASE = '/bato'

self.addEventListener('install', (e) => {
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  // Only handle same-origin GET under /bato/
  if (e.request.method !== 'GET' || url.origin !== location.origin || !url.pathname.startsWith(BASE)) return

  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone()
            caches.open(CACHE).then(c => c.put(e.request, clone))
          }
          return res
        })
        .catch(() => cached)
      return cached || network
    })
  )
})
