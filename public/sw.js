const CACHE = 'kawaii-english-v1'

const STATIC_ASSETS = [
  '/',
  '/vocabulary',
  '/grammar',
  '/reading',
  '/listening',
  '/writing',
  '/speaking',
  '/quiz',
  '/progress',
  '/mock-test',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only cache http/https requests — chrome-extension:// and other schemes are unsupported
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((response) => {
        if (response.ok && request.method === 'GET') {
          const clone = response.clone()
          caches.open(CACHE).then((cache) => cache.put(request, clone))
        }
        return response
      }).catch(() => cached)
      return cached || fetchPromise
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
})
