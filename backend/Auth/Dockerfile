FROM adoptopenjdk/openjdk11:alpine-jre

RUN mkdir /home/spring

WORKDIR /home/spring

COPY ./build/libs/*.jar /home/spring/

EXPOSE 8082

CMD ["java", "-jar", "/home/spring/Auth-0.0.1-SNAPSHOT.jar"]
