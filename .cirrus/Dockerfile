
ARG CIRRUS_AWS_ACCOUNT
FROM ${CIRRUS_AWS_ACCOUNT}.dkr.ecr.eu-central-1.amazonaws.com/base:j17-latest

USER root

ENV SCANNER_HOME=/opt/sonar-scanner
ENV SCANNER_VERSION=5.0.1.3006
ENV SCANNER_BINARIES=https://binaries.sonarsource.com/Distribution/sonar-scanner-cli
ENV SCANNER_ZIP=sonar-scanner.zip

ENV PATH=${SCANNER_HOME}/bin:${PATH}

# Update package list
RUN apt-get update -y

# Install some tools
RUN apt-get install -y jq

# Install Scanner dependencies
RUN curl ${SCANNER_BINARIES}/sonar-scanner-cli-${SCANNER_VERSION}.zip -o ${SCANNER_ZIP}  \
  && unzip ${SCANNER_ZIP} \
  && mv sonar-scanner-${SCANNER_VERSION} ${SCANNER_HOME} \
  && rm ${SCANNER_ZIP}

# Install Node.js
ARG NODE_VERSION=20.*
RUN apt-get install -y nodejs=${NODE_VERSION}

# Install Yarn
RUN npm install -g yarn

# Clean up cache after packages installation
RUN apt-get clean

USER sonarsource
