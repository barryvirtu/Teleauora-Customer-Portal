FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy the built JAR into the container
COPY target/portal-0.1.0.jar app.jar

# Expose the backend port (optional but good practice)
EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]
