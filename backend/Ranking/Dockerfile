FROM adoptopenjdk/openjdk11:alpine-jre

RUN mkdir /home/spring

RUN ls

WORKDIR /home/spring

RUN ls

COPY ./build/libs/*.jar /home/spring/

RUN ls

EXPOSE 8085

CMD ["java", "-jar", "/home/spring/Ranking-0.0.1-SNAPSHOT.jar"]
