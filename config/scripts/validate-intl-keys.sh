#!/bin/bash

yarn build-intl-keys

if (git diff --quiet i18n/keys.json); then
  echo "i18n/keys.json is up to date."
else
  echo "i18n/keys.json is out of date."
  echo "Please run 'yarn build-intl-keys' to update i18n/keys.json."
  exit 1
fi
