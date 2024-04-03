#!/bin/bash

yarn build-tokens > /dev/null

if (git diff --quiet src/generated); then
  echo "Design-tokens are up to date."
else
  echo "Design-tokens are out of date."
  echo "Please run 'yarn build-tokens' to update design tokens."
  exit 1
fi
