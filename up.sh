# останавливаем и удаляем все существующие контейнеры
docker-compose stop
docker-compose rm -f

docker-compose build game

# запускаем все необходимые контейнеры
docker-compose up -d


