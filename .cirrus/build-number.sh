#!/bin/bash

set -euo pipefail
set -x

source cirrus-env BUILD
VERSION=$(grep version package.json | head -1 | awk -F: '{ print $2 }' | sed 's/[", ]//g')
