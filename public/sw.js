self.addEventListener('push', (event) => {
  const data = event.data?.json() || { title: 'Chess Bets Academy', body: 'Tienes una notificación' }
  const options = {
    body: data.body,
    icon: '/icon.png',
    badge: '/badge.png',
    data: { url: data.url || '/' },
  }
  event.waitUntil(self.registration.showNotification(data.title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'
  event.waitUntil(clients.openWindow(url))
})
