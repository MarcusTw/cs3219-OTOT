FROM openjdk:11.0.2-jre-slim
EXPOSE 8080
COPY ./api-gateway-0.0.1-SNAPSHOT.jar api-gateway-0.0.1-SNAPSHOT.jar
CMD ["java", "-jar", "./api-gateway-0.0.1-SNAPSHOT.jar"]

# docker build -t cs3219/api-gateway:1.0.0 ./api-gateway