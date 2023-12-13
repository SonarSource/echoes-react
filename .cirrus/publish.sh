#!/bin/bash

set -euo pipefail

PROJECT=echoes-react
VERSION=$(grep version package.json | head -1 | awk -F: '{ print $2 }' | sed 's/[", ]//g')

source cirrus-env BUILD

npm version --no-git-tag-version --allow-same-version "$VERSION-$BUILD_NUMBER"

#upload to repox QA repository
jfrog npm publish --build-name=$PROJECT --build-number="$BUILD_NUMBER"
#publish buildinfo
jfrog rt build-publish $PROJECT "$BUILD_NUMBER"