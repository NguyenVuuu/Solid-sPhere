# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy Maven wrapper và pom trước để cache dependencies
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline -B

# Copy source và build
COPY src ./src
RUN ./mvnw clean package -DskipTests -B

# Stage 2: Run
FROM eclipse-temurin:21-jre AS runtime

WORKDIR /app

# Copy jar từ stage build
COPY --from=builder /app/target/fit.se-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
