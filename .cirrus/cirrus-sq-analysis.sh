#!/bin/bash
set -euo pipefail

export GIT_SHA1=${CIRRUS_CHANGE_IN_REPO}
export GITHUB_BASE_BRANCH=${CIRRUS_BASE_BRANCH:-}
export GITHUB_BRANCH=${CIRRUS_BRANCH}
export GITHUB_REPO=${CIRRUS_REPO_FULL_NAME}
export PULL_REQUEST=${CIRRUS_PR:-}
export SONARQUBE_HOST_URL="https://next.sonarqube.com/sonarqube"

if [[ "${PULL_REQUEST}" ]] || [[ "${GITHUB_BRANCH}" == "main" ]]; then

  scanner_params=()

  if [[ "${GITHUB_BASE_BRANCH}" ]]; then
    git fetch origin "${GITHUB_BASE_BRANCH}"
  fi

  if [[ "${PULL_REQUEST}" ]]; then
    scanner_params+=("-Dsonar.analysis.prNumber=${PULL_REQUEST}")
  fi

  scanner_params+=(
    "-Dsonar.host.url=${SONARQUBE_HOST_URL}"
    "-Dsonar.token=${SONARQUBE_NEXT_TOKEN}"
    "-Dsonar.analysis.pipeline=${CIRRUS_BUILD_ID}"
    "-Dsonar.analysis.repository=${GITHUB_REPO}"
    "-Dsonar.analysis.sha1=${GIT_SHA1}"
    "-Dsonar.projectKey=SonarSource_echoes-react_AYvOIyNg-JQvdKIPB6Ig"
    "-Dsonar.eslint.reportPaths=build-reports/eslint-report/eslint-report.json"
    "-Dsonar.javascript.lcov.reportPaths=**/build-reports/coverage/lcov.info"
    "-Dsonar.sources=src,stories"
    "-Dsonar.exclusions=src/**/__tests__/**"
    "-Dsonar.tests=."
    "-Dsonar.test.inclusions=**/__tests__/**"
    "-Dsonar.coverage.exclusions=stories/**,
                                src/**/*-stories.tsx,
                                src/types/**,
                                src/components/icons/**,
                                src/generated/**,
                                ")
  sonar-scanner "${scanner_params[@]}"

fi
