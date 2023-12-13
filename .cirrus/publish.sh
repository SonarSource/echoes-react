#!/bin/bash

set -euo pipefail

PROJECT=echoes-react

npm version --no-git-tag-version --allow-same-version "$VERSION-$BUILD_NUMBER"

#upload to repox QA repository
jfrog npm publish --build-name=$PROJECT --build-number="$BUILD_NUMBER"
#publish buildinfo
jfrog rt build-publish $PROJECT "$BUILD_NUMBER"