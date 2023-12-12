
ARG CIRRUS_AWS_ACCOUNT
FROM ${CIRRUS_AWS_ACCOUNT}.dkr.ecr.eu-central-1.amazonaws.com/base:j17-latest

USER root

ARG NODE_VERSION=18

RUN apt-get update && apt-get install -y nodejs=${NODE_VERSION}.*

RUN npm install -g yarn

USER sonarsource