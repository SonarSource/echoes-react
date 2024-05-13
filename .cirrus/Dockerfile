
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

# Pass necessary env variables
ARG SONAR_SCANNER_NPM_VERSION=3.6.0-2097
ARG ARTIFACTORY_PRIVATE_USERNAME
ARG ARTIFACTORY_PRIVATE_PASSWORD
ENV ARTIFACTORY_PRIVATE_USERNAME $ARTIFACTORY_PRIVATE_USERNAME
ENV ARTIFACTORY_PRIVATE_PASSWORD $ARTIFACTORY_PRIVATE_PASSWORD

RUN  npm install -g "https://$ARTIFACTORY_PRIVATE_USERNAME:$ARTIFACTORY_PRIVATE_PASSWORD@repox.jfrog.io/artifactory/sonarsource-npm-public-dev/sonarqube-scanner/-/sonarqube-scanner-$SONAR_SCANNER_NPM_VERSION.tgz"

# Clean up cache after packages installation
RUN apt-get clean

USER sonarsource
