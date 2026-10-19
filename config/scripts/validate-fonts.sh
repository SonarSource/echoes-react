#!/bin/bash

yarn build-fonts > /dev/null

if (git diff --quiet src/generated/material-symbols-rounded-optimized.woff2); then
  echo "Optimized material-symbols font is up to date."
else
  echo "Optimized material-symbols font is out of date."
  echo "Please run 'yarn build-fonts' to update src/generated/material-symbols-rounded-optimized.woff2."
  exit 1
fi

GEIST_SOURCE="design-tokens/assets/sonar/Geist-Variable.woff2"
GEIST_GENERATED="src/generated/fonts/sonar/Geist-Variable.woff2"
GEIST_SHA256="a369fcf5628ea2aa4e1b9e2ec6a5b3624e365bda588e1f0f2f12b564f728fbb8"
GEIST_MONO_SOURCE="design-tokens/assets/sonar/GeistMono-Variable.woff2"
GEIST_MONO_GENERATED="src/generated/fonts/sonar/GeistMono-Variable.woff2"
GEIST_MONO_SHA256="afaacc4c5fbba89d2ebf7a02dc4070208540874592a5504d57175782fe893101"

if [ "$(shasum -a 256 "$GEIST_SOURCE" | cut -d ' ' -f 1)" != "$GEIST_SHA256" ]; then
  echo "Geist 1.7.2 does not match the approved checksum."
  exit 1
fi

if ! cmp -s "$GEIST_SOURCE" "$GEIST_GENERATED"; then
  echo "Packaged Geist font is out of date."
  echo "Please run 'yarn build-tokens' to update generated brand assets."
  exit 1
fi

if [ "$(shasum -a 256 "$GEIST_MONO_SOURCE" | cut -d ' ' -f 1)" != "$GEIST_MONO_SHA256" ]; then
  echo "Geist Mono 1.7.2 does not match the approved checksum."
  exit 1
fi

if ! cmp -s "$GEIST_MONO_SOURCE" "$GEIST_MONO_GENERATED"; then
  echo "Packaged Geist Mono font is out of date."
  echo "Please run 'yarn build-tokens' to update generated brand assets."
  exit 1
fi

if [ ! -f "src/generated/fonts/sonar/OFL.txt" ]; then
  echo "Packaged Geist OFL license is missing."
  exit 1
fi
