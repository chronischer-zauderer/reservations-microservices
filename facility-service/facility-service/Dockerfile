FROM maven:3.9-eclipse-temurin-17 as build
WORKDIR /build
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src ./src
RUN chmod +x mvnw || true
RUN mvn -B -e -DskipTests package

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /build/target/facility-service-0.0.1-SNAPSHOT.jar app.jar
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y netcat && rm -rf /var/lib/apt/lists/*
EXPOSE 8082
CMD ["java","-jar","/app/app.jar"]
