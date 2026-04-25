# syntax=docker/dockerfile:1

FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn -B -Dmaven.test.skip=true dependency:go-offline

COPY src ./src
RUN mvn -B -Dmaven.test.skip=true clean package

FROM eclipse-temurin:21-jre
WORKDIR /app

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends mariadb-server \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/target/*.jar /app/app.jar
COPY uploads /app/uploads
COPY docker/mysql-init /app/docker/mysql-init
COPY docker/start-container.sh /usr/local/bin/start-container.sh

RUN chmod +x /usr/local/bin/start-container.sh \
    && mkdir -p /app/uploads /app/docker/mysql-init

ENV MYSQL_DATABASE=urban_flora
ENV MYSQL_USER=urban_flora
ENV MYSQL_PASSWORD=Abcd123456
ENV MYSQL_ROOT_PASSWORD=Abcd123456
ENV JAVA_OPTS=""
EXPOSE 8080 3306

CMD ["/usr/local/bin/start-container.sh"]
