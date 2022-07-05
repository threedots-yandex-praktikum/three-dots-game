!bin/bash

# переходим в директорию с docker-compose.yml
cd /home/deploy/three-dots-game/

# останавливаем и удаляем все существующие контейнеры
docker-compose stop
docker-compose rm -f

# запускаем все необходимые контейнеры
docker-compose up -d

# завершаем выполнение скрипта
exit 1


