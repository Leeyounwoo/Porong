FROM adoptopenjdk/openjdk11:alpine-jre

RUN mkdir /home/spring

RUN ls

WORKDIR /home/spring

RUN ls

COPY ./build/libs/*.jar /home/spring/application.jar

RUN ls

CMD ["echo", "start"]
