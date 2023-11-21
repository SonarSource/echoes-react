import { registerTransforms, transforms } from '@tokens-studio/sd-transforms';
import * as fs from 'fs';
import StyleDictionary from 'style-dictionary';

registerTransforms(StyleDictionary, {});

const DESIGN_TOKENS_PATH = 'design-tokens/tokens';
const BUILD_PATH = 'src/generated/';
const NAME_PREFIX = 'design-tokens-';
const BASE_TOKENS_NAME = `${NAME_PREFIX}base`;
const CUSTOM_TRANSFORM_GROUP = 'sonar-design-tokens';
const CUSTOM_FILTER_NO_COLOR = 'sonar-no-color';
const CUSTOM_FILTER_NO_BASE = 'sonar-exclude-core';

StyleDictionary.registerTransformGroup({
  name: CUSTOM_TRANSFORM_GROUP,
  transforms: ['attribute/cti', ...transforms, 'name/cti/kebab'],
});

StyleDictionary.registerFilter({
  name: CUSTOM_FILTER_NO_COLOR,
  matcher: (token) => token.attributes.category !== 'color',
});

StyleDictionary.registerFilter({
  name: CUSTOM_FILTER_NO_BASE,
  matcher: ({ filePath }) => !filePath.includes(`layer1`) && !filePath.endsWith(`base.json`),
});

// Build base tokens
console.log('\nBuilding base tokens, no colors allowed...');
StyleDictionary.extend({
  source: [
    `${DESIGN_TOKENS_PATH}/layer1/base.json`,
    `${DESIGN_TOKENS_PATH}/layer2/base.json`,
    `${DESIGN_TOKENS_PATH}/layer3/base.json`,
  ],
  platforms: {
    tokens: {
      transformGroup: CUSTOM_TRANSFORM_GROUP,
      buildPath: BUILD_PATH,
      files: [
        {
          destination: `${BASE_TOKENS_NAME}.css`,
          format: 'css/variables',
          filter: CUSTOM_FILTER_NO_COLOR,
          options: {
            showFileHeader: true,
            selector: ':root',
          },
        },
        {
          destination: `${BASE_TOKENS_NAME}.json`,
          format: 'json/nested',
          filter: CUSTOM_FILTER_NO_COLOR,
          options: {
            showFileHeader: true,
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

// Build themed tokens
console.log('\nBuilding themed tokens, only colors...');
const $themes = JSON.parse(fs.readFileSync(`${DESIGN_TOKENS_PATH}/$themes.json`, 'utf-8'));
$themes.forEach((theme) => {
  console.log(`\nBuilding "${theme.name}" theme...`);
  StyleDictionary.extend({
    source: Object.entries(theme.selectedTokenSets)
      .filter(([, val]) => val !== 'disabled')
      .map(([tokenset]) => `${DESIGN_TOKENS_PATH}/${tokenset}.json`),
    platforms: {
      tokens: {
        transformGroup: CUSTOM_TRANSFORM_GROUP,
        buildPath: BUILD_PATH,
        files: [
          {
            destination: `${NAME_PREFIX}${theme.name}.css`,
            format: 'css/variables',
            filter: CUSTOM_FILTER_NO_BASE,
            options: {
              showFileHeader: true,
              selector: `html[data-theme='${theme.name}']`,
            },
          },
        ],
      },
    },
  }).buildAllPlatforms();
});
console.log(`\nThemed tokens builds done.`);
