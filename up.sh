# останавливаем и удаляем все существующие контейнеры
docker-compose stop
docker-compose rm -f

docker system prune -af --volumes

# запускаем все необходимые контейнеры
docker-compose up -d


