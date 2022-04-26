FROM adoptopenjdk/openjdk11:alpine-jre

RUN mkdir /home/spring

RUN ls

WORKDIR /home/spring

COPY ./build/libs/*.jar /home/spring/application.jar

EXPOSE 8081

CMD ["java", "-jar", "/home/spring/application.jar"]
