#!/bin/bash

yarn build-fonts > /dev/null

if (git diff --quiet src/generated/material-symbols-rounded-optimized.woff2); then
  echo "Optimized material-symbols font is up to date."
else
  echo "Optimized material-symbols font is out of date."
  echo "Please run 'yarn build-fonts' to update src/generated/material-symbols-rounded-optimized.woff2."
  exit 1
fi
