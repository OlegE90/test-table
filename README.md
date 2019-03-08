# Билд образа
docker image build -t olege90/ui-project_a .

# Запуск контейнера.
docker container run --name ui-project-a -d -p 3000:8090 -v $(pwd)/src:/usr/src/app/src olege90/ui-project_a
