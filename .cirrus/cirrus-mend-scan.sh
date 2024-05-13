#!/bin/bash

source cirrus-env MEND

set -euox pipefail

export PROJECT_VERSION=$(cat package.json | grep -oP '"version": "\K\d+\.\d+') # 2 digit version number
export WS_PRODUCTNAME=${CIRRUS_REPO_FULL_NAME}
export WS_PROJECTNAME="${WS_PRODUCTNAME} ${PROJECT_VERSION}"

java -jar "${WHITESOURCE_AGENT_HOME}wss-unified-agent.jar" -scanComment "buildNumber:${BUILD_NUMBER};gitSha:${CIRRUS_CHANGE_IN_REPO}"
