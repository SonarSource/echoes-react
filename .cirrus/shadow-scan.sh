#!/bin/bash
set -euxo pipefail

trap 'echo "Script exited with code $?"' EXIT

export GIT_SHA1=${CIRRUS_CHANGE_IN_REPO}
export GITHUB_BASE_BRANCH=${CIRRUS_BASE_BRANCH:-}
export GITHUB_BRANCH=${CIRRUS_BRANCH}
export GITHUB_REPO=${CIRRUS_REPO_FULL_NAME}
export PULL_REQUEST=${CIRRUS_PR:-}
export SONAR_HOST_URL=${SONAR_HOST_URL:-https://sonarcloud.io}
export PROJECT_KEY=${PROJECT_KEY:-SonarSource_echoes-react}
export SONAR_TOKEN=${SONAR_TOKEN:-}

echo "[DEBUG] GIT_SHA1: ${GIT_SHA1}"
echo "[DEBUG] GITHUB_BASE_BRANCH: ${GITHUB_BASE_BRANCH}"
echo "[DEBUG] GITHUB_BRANCH: ${GITHUB_BRANCH}"
echo "[DEBUG] GITHUB_REPO: ${GITHUB_REPO}"
echo "[DEBUG] PULL_REQUEST: ${PULL_REQUEST}"
echo "[DEBUG] SONAR_HOST_URL: ${SONAR_HOST_URL}"
echo "[DEBUG] PROJECT_KEY: ${PROJECT_KEY}"


echo "[DEBUG] Entering main conditional: PULL_REQUEST='${PULL_REQUEST}', GITHUB_BRANCH='${GITHUB_BRANCH}'"
if [[ "${PULL_REQUEST}" ]] || [[ "${GITHUB_BRANCH}" == "main" ]]; then
  scanner_params=("$@")

  if [[ "${GITHUB_BASE_BRANCH}" ]]; then
    git fetch origin "${GITHUB_BASE_BRANCH}"
  fi

  if [[ "${PULL_REQUEST}" ]]; then
    scanner_params+=("-Dsonar.analysis.prNumber=${PULL_REQUEST}")
  fi

  scanner_params+=(
    "-Dsonar.host.url=${SONAR_HOST_URL}"
    "-Dsonar.token=${SONAR_TOKEN}"
    "-Dsonar.qualitygate.wait=false"
    "-Dsonar.analysis.pipeline=${CIRRUS_BUILD_ID}"
    "-Dsonar.analysis.repository=${GITHUB_REPO}"
    "-Dsonar.analysis.sha1=${GIT_SHA1}"
    "-Dsonar.organization=sonarsource"
    "-Dsonar.projectKey=${PROJECT_KEY}"
    "-Dsonar.python.version=3"
    "-Dsonar.python.coverage.reportPaths=**/build/coverage.xml"
    "-Dsonar.coverage.jacoco.xmlReportPaths=**/build/jacoco-coverage.xml"
    "-Dsonar.sources=."
    "-Dsonar.exclusions=**/src/test/**,**/src/testFixtures/**,**/tests/**"
    "-Dsonar.tests=."
    "-Dsonar.test.inclusions=**/src/test/**,**/tests/**"
    "-Dsonar.log.level=DEBUG"
    "-Dsonar.verbose=true"
  )

  echo "[DEBUG] Running sonar-scanner with params: ${scanner_params[*]}"
  npx @sonar/scan "${scanner_params[@]}"
else
  echo "[DEBUG] Skipping scan: neither PULL_REQUEST nor GITHUB_BRANCH=main."
fi
