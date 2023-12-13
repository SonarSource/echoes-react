#!/bin/bash

set -euo pipefail
set -x

source cirrus-env BUILD
export VERSION=$(grep version package.json | head -1 | awk -F: '{ print $2 }' | sed 's/[", ]//g')

echo "VERSION=$VERSION" >> $CIRRUS_ENV
