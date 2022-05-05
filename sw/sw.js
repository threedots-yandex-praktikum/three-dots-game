import { registerRoute } from "workbox-routing";
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from "workbox-strategies";

// Используется для фильтрации запросов на основе статус-кодов, заголовков или обоих сразу (см. ниже)
import { CacheableResponsePlugin } from "workbox-cacheable-response";
// Используется для ограничения количества записей в кэше и удаления записей по истечении определенного времени (см. ниже)
import { ExpirationPlugin } from "workbox-expiration";

// Кэшируем страницы (`HTML`) с помощью стратегии `Network First` (сначала сеть)
registerRoute(
  // проверяем, что запрос - это переход на новую страницу
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    // помещаем все файлы в кэш с названием 'pages'
    cacheName: "pages",
    plugins: [
      // кэшируем только результаты со статусом 200
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Кэшируем запросы на получение `CSS`, `JS` и веб-воркеров с помощью стратегии `Stale While Revalidate` (считается устаревшим после запроса)
registerRoute(
  // проверяем, что цель запроса - это таблица стилей, скрипт или воркер
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "worker",
  new StaleWhileRevalidate({
    // помещаем файлы в кэш с названием 'assets'
    cacheName: "assets",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Кэшируем изображения с помощью стратегии `Cache First` (сначала кэш)
registerRoute(
  // проверяем, что цель запроса - изображение
  ({ request }) => request.destination === "image",
  new CacheFirst({
    // помещаем файлы в кэш с названием 'images'
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // кэшируем до 50 изображений в течение 30 дней
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  })
);
