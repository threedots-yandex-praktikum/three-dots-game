# останавливаем и удаляем все существующие контейнеры
docker-compose stop
docker-compose rm -f

# запускаем все необходимые контейнеры
docker-compose up -d

