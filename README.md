


```
docker run -d -p 5672:5672 -p 15672:15672 --name rabbit1 rabbitmq
docker exec -it rabbit1 /bin/bash
rabbitmq-plugins enable rabbitmq_management
```
