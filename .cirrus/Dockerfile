
ARG CIRRUS_AWS_ACCOUNT
FROM ${CIRRUS_AWS_ACCOUNT}.dkr.ecr.eu-central-1.amazonaws.com/base:j17-latest

USER root

# Update package list
RUN apt-get update -y

# Install some tools
RUN apt-get install -y jq

# Install Node.js
ARG NODE_VERSION=20.*
RUN apt-get install -y nodejs=${NODE_VERSION}

# Install Yarn
RUN npm install -g yarn

# Install sonar-scanner-npm
RUN npm install -g sonarqube-scanner

# Clean up cache after packages installation
RUN apt-get clean

USER sonarsource
