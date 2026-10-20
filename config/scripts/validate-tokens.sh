#!/bin/bash

node design-tokens/generate-sentiment-palettes.mjs --check || exit 1
node design-tokens/validate-color-architecture.mjs || exit 1

before_manifest=$(mktemp)
after_manifest=$(mktemp)
trap 'rm -f "$before_manifest" "$after_manifest"' EXIT

find src/generated -type f | LC_ALL=C sort | while IFS= read -r file; do
  shasum -a 256 "$file"
done > "$before_manifest"

yarn build-tokens > /dev/null || exit 1

find src/generated -type f | LC_ALL=C sort | while IFS= read -r file; do
  shasum -a 256 "$file"
done > "$after_manifest"

if cmp -s "$before_manifest" "$after_manifest"; then
  echo "Design-tokens are up to date."
else
  echo "Design-tokens are out of date."
  echo "Please run 'yarn build-tokens' to update design tokens."
  diff -u "$before_manifest" "$after_manifest"
  exit 1
fi
