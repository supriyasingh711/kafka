# Kafka Basics Project

This is a simple Kafka project demonstrating the core components of Kafka using Node.js:

- Kafka Admin: Creates topics
- Kafka Producer: Sends messages
- Kafka Consumer: Listens and processes messages

## 🛠️ Tech Stack
- Node.js
- Apache Kafka
- KafkaJS (npm library)

## 🧱 Project Structure
├── admin.js # Topic creation logic
├── producer.js # Produces messages to Kafka
├── consumer.js # Consumes messages from Kafka


## 📦 Setup Instructions

1. Start Zookeeper and Kafka (ensure ports are correct)
   
Zookeeper server:
docker run -p 2181:2181 zookeeper

Kafka server:

(for windows):
docker run -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka

(for mac):
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
confluentinc/cp-kafka



# Example using Kafka CLI
zookeeper-server-start.sh config/zookeeper.properties  
kafka-server-start.sh config/server.properties

2.Clone and install dependencies

git clone https://github.com/supriyasingh711/kafka
cd kafka
npm install

3.Run Kafka scripts

node admin.js      # Create topic
node producer.js   # Send message
node consumer.js   # Start listening
