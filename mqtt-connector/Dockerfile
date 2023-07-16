FROM eclipse-temurin:17-jdk
WORKDIR /opt/plugin/mqttadapter/
RUN chmod 777 -R /opt/plugin/mqttadapter
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","app.jar"]