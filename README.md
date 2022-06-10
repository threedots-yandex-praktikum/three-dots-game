# three-dots-game
проект игры для второго модуля 


## Запуск для разработки
- скорректировать файл /etc/hosts (временное решение)
  - `127.0.0.1 local.ya-praktikum.tech`
- скопировать файл `.env-example` и переименовать его в `.env`
- выполнить команду установки зависимостей `npm install`
- выполнить команду сборки `npm run build`
  далее можно:
- запустить отдельно сервер и клиент:
  - `npm run start:server`
  - `npm run start:webpack`
- или запустить все одновременно:
  - `npm run start`
- приложение будет запущено по адресу: https://local.ya-praktikum.tech:5000/

## Запуск под docker
- скорректировать файл /etc/hosts (временное решение)
  - `127.0.0.1 local.ya-praktikum.tech`
- скопировать файл `.env-example` и переименовать его в `.env
- в файле `.env` поменять хосты для контейнеров баз данных с localhost на имена контейнеров
- запустить отдельно игру и веб-приложение pgadmin для доступа к базе данных:
  - `docker-compose up game`
  - `docker-compose up yandex-pgadmin`
- или запустить все одновременно:
  - `docker-compose up`
- приложение будет запущено по адресу: https://local.ya-praktikum.tech:5000/

### ссылка на heroku
https://three-dots-project.herokuapp.com/home
