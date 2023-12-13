#!/bin/bash

set -euo pipefail
set -x

source cirrus-env BUILD

PROJECT_VERSION=$(grep version package.json | head -1  | awk -F: '{ print $2 }' | sed 's/[",]//g').$BUILD_NUMBER
echo "PROJECT_VERSION: $PROJECT_VERSION"
export PROJECT_VERSION