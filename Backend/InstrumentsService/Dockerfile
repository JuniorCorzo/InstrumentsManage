FROM gradle:8.10.2-jdk21 AS build
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY build.gradle settings.gradle $APP_HOME/gradle/

COPY gradle $APP_HOME/gradle
COPY --chown=gradle:gradle . /home/gradle/src
USER root
RUN chown -R gradle /home/gradle/src

RUN gradle build || return 0
COPY . .
RUN gradle clean build

FROM eclipse-temurin:21
ENV ARTIFACT_NAME=InstrumentsService-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/usr/app

WORKDIR $APP_HOME
COPY --from=build $APP_HOME/build/libs/$ARTIFACT_NAME .
EXPOSE 8080
ENTRYPOINT exec java -jar ${ARTIFACT_NAME}