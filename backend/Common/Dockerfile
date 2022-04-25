FROM adoptopenjdk/openjdk11:alpine-jre

RUN mkdir /home/spring

WORKDIR /home/spring

COPY build/libs/*.jar /home/spring/application.jar

EXPOSE 8080

CMD ["java", "-jar", "/home/spring/application.jar"]