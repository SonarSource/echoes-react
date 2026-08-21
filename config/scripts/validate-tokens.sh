#!/bin/bash

node design-tokens/validate-color-architecture.mjs || exit 1
node design-tokens/generate-sentiment-palettes.mjs --check || exit 1

yarn build-tokens > /dev/null || exit 1

if (git diff --quiet src/generated); then
  echo "Design-tokens are up to date."
else
  echo "Design-tokens are out of date."
  echo "Please run 'yarn build-tokens --brand=${DESIGN_TOKEN_BRAND}' to update design tokens."
  exit 1
fi
