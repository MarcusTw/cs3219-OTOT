# exec zookeeper-1
docker exec -it zookeeper-1 bash

# create topic
/kafka/bin/kafka-topics.sh --create --zookeeper zookeeper-1:2181 --replication-factor 2 --partitions 3 --topic awesome

# view topic details
/kafka/bin/kafka-topics.sh --describe --topic awesome --zookeeper zookeeper-1:2181

# delete topic
/kafka/bin/kafka-topics.sh --delete --topic awesome --zookeeper zookeeper-1:2181

#producer 
/kafka/bin/kafka-console-producer.sh --broker-list kafka-1:9092 --topic awesome
/kafka/bin/kafka-console-producer.sh --broker-list kafka-3:9092 --topic awesome

#consumer
/kafka/bin/kafka-console-consumer.sh --bootstrap-server kafka-1:9092 --topic awesome --from-beginning
/kafka/bin/kafka-console-consumer.sh --bootstrap-server kafka-3:9092 --topic awesome --from-beginning

#describe topic
/kafka/bin/kafka-topics.sh --describe --topic awesome --zookeeper zookeeper-1:2181