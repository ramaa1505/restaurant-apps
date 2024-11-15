import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

const restaurantdbApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev'),
  new StaleWhileRevalidate({
    cacheName: 'restaurantdb-api',
  }),
);

const restaurantdbImageApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/large/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurantdb-image-api',
  }),
);

registerRoute(restaurantdbApi);
registerRoute(restaurantdbImageApi);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed');

  const notificationRestaurant = event.data.json();
  const notificationData = {
    title: notificationRestaurant.title,
    options: {
      body: notificationRestaurant.options.body,
      icon: notificationRestaurant.options.icon,
      image: notificationRestaurant.options.image,
    },
  };

  const showNotification = self.registration.showNotification(
    notificationData.title,
    notificationData.options,
  );

  event.waitUntil(showNotification);
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  const chainPromise = async () => {
    console.log('Notification has been clicked');
    await self.clients.openWindow('https://www.dicoding.com/');
  };

  event.waitUntil(chainPromise());
});
