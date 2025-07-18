/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import { getTransforms, register } from '@tokens-studio/sd-transforms';
import * as fs from 'node:fs';
import StyleDictionary from 'style-dictionary';
import { transforms } from 'style-dictionary/enums';

const DEFAULT_THEME = 'light';
const DESIGN_TOKENS_PATH = 'design-tokens/tokens';
const BUILD_PATH = 'src/generated/';
const NAME_PREFIX = 'design-tokens-';
const BASE_TOKENS_NAME = `${NAME_PREFIX}base`;
const CUSTOM_TRANSFORM_GROUP = 'sonar-design-tokens';
const CUSTOM_FILTER_NO_COLOR = 'sonar-no-color';
const CUSTOM_FILTER_THEMED_TOKENS = 'sonar-themed-tokens';
const CUSTOM_FILTER_TAILWIND = 'sonar-echoes-tailwind-preset';
const THEME_DATA_ATTRIBUTE = 'data-echoes-theme';
const TAILWIND_CONFIG_FILENAME = 'tailwindConfig.js';
const LICENSE_HEADER_FILE_OPTION = 'licence-header';

const licenseHeader = fs.readFileSync(`config/license/LICENSE-HEADER.txt`, 'utf-8');
const tailwindTypographyUtilities = JSON.parse(
  fs.readFileSync(`design-tokens/tailwindTypographyUtilities.json`, 'utf-8'),
);

const designTokenGroups = JSON.parse(
  fs.readFileSync(`${DESIGN_TOKENS_PATH}/$themes.json`, 'utf-8'),
);

const baseDesignTokenGroup = designTokenGroups.find(
  ({ group, name }) => group === 'Sonar' && name === 'base',
);

const themedDesignTokenGroups = designTokenGroups.filter(({ group }) => group === 'Themes');

const sd = initStyleDictionary(licenseHeader);
await buildBaseTokens(baseDesignTokenGroup, sd);
await buildThemedTokens(themedDesignTokenGroups, baseDesignTokenGroup, sd);
buildCSSRootFile(designTokenGroups, licenseHeader);
buildThemesEnumType(themedDesignTokenGroups, licenseHeader);
buildTailwindConfig();

function initStyleDictionary(licenseHeader) {
  const sd = new StyleDictionary({
    // Preprocessors to use with tokens-studio: https://github.com/tokens-studio/sd-transforms#using-expand
    preprocessors: ['tokens-studio'],
    // Base configuration
    hooks: {
      transformGroups: {
        [CUSTOM_TRANSFORM_GROUP]: [
          transforms.attributeCti,
          ...getTransforms({ platform: 'css' }),
          transforms.nameKebab,
          transforms.typographyCssShorthand,
          transforms.borderCssShorthand,
          transforms.shadowCssShorthand,
          transforms.colorHex,
        ],
      },
      filters: {
        [CUSTOM_FILTER_NO_COLOR]: ({ attributes }) =>
          attributes.type !== 'color' || // Exclude colors
          attributes.item === 'support', // but keep the support colors (black, white, transparent)
        [CUSTOM_FILTER_TAILWIND]: ({ attributes: { type, item } }) => {
          return type === 'dimension' && ['space', 'width', 'height'].includes(item);
        },
        [CUSTOM_FILTER_THEMED_TOKENS]: ({ attributes, filePath }) =>
          !filePath.includes(`layer1`) &&
          !(filePath.endsWith('base.json') && attributes.type !== 'color'),
      },
      fileHeaders: {
        [LICENSE_HEADER_FILE_OPTION]: () => [
          licenseHeader.replace(/(\/\*\n \* )|(\n \*\/\n)/gm, ''),
          '',
          'GENERATED FILE: do not edit directly.',
        ],
      },
    },
  });

  register(sd, {
    'ts/color/modifiers': { format: 'hex' },
    withSDBuiltins: false,
  });

  return sd;
}

// Build base tokens: layer1 base + layer2 base without colors
async function buildBaseTokens(tokenGroup, sd) {
  console.log('\nBuilding base tokens, no colors allowed...');
  console.log(`\nBuilding "${tokenGroup.name}" group...`);

  const extendedSd = await sd.extend({
    source: Object.entries(tokenGroup.selectedTokenSets)
      .filter(([, val]) => val !== 'disabled')
      .map(([tokenset]) => `${DESIGN_TOKENS_PATH}/${tokenset}.json`),
    platforms: {
      tokens: {
        transformGroup: CUSTOM_TRANSFORM_GROUP,
        buildPath: BUILD_PATH,
        files: [
          {
            destination: `${NAME_PREFIX}${tokenGroup.name}.css`,
            format: 'css/variables',
            filter: CUSTOM_FILTER_NO_COLOR,
            options: {
              fileHeader: LICENSE_HEADER_FILE_OPTION,
              selector: ':root',
            },
          },
          {
            destination: `${NAME_PREFIX}${tokenGroup.name}.json`,
            format: 'json/flat',
            filter: CUSTOM_FILTER_NO_COLOR,
            options: {
              fileHeader: LICENSE_HEADER_FILE_OPTION,
            },
          },
          {
            destination: TAILWIND_CONFIG_FILENAME,
            filter: CUSTOM_FILTER_TAILWIND,
            format: 'javascript/module-flat',
            options: {
              fileHeader: LICENSE_HEADER_FILE_OPTION,
            },
          },
        ],
      },
    },
  });

  await extendedSd.buildAllPlatforms();

  console.log(`\nBase tokens builds done.`);
}

// Build themed tokens: 1 for each theme, without layer1 and layer2 base non-color tokens
async function buildThemedTokens(themedTokenGroups, baseDesignTokenGroup, sd) {
  console.log('\nBuilding themed tokens, no layer1 or layer2 base non-colors...');

  await Promise.all(
    themedTokenGroups.map(async (theme) => {
      console.log(`\nBuilding "${theme.name}" theme...`);

      const extendedSd = await sd.extend({
        source: [
          ...Object.entries(baseDesignTokenGroup.selectedTokenSets),
          ...Object.entries(theme.selectedTokenSets),
        ]
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
                filter: CUSTOM_FILTER_THEMED_TOKENS,
                options: {
                  fileHeader: LICENSE_HEADER_FILE_OPTION,
                  selector:
                    /*
                     * For any theme that is not the default theme, the `html`
                     * attribute increases the specificity so that it can override
                     * the default theme. Otherwise, the order in which the CSS
                     * selectors appear in the CSS file would matter.
                     */
                    theme.name === DEFAULT_THEME
                      ? `:root, [${THEME_DATA_ATTRIBUTE}='${theme.name}']`
                      : `html[${THEME_DATA_ATTRIBUTE}='${theme.name}'], [${THEME_DATA_ATTRIBUTE}='${theme.name}']`,
                },
              },
              DEFAULT_THEME === theme.name && {
                destination: `${NAME_PREFIX}themed.json`,
                format: 'json/flat',
                filter: CUSTOM_FILTER_THEMED_TOKENS,
                options: {
                  fileHeader: LICENSE_HEADER_FILE_OPTION,
                },
              },
            ].filter((file) => Boolean(file)),
          },
        },
      });

      await extendedSd.buildAllPlatforms();
    }),
  );

  console.log(`\nThemed tokens builds done.`);
}

// Build design tokens css root file
function buildCSSRootFile(tokenGroups, license) {
  console.log('\nBuilding design tokens css root file...');
  const sortedTokenGroups = [...tokenGroups];
  sortedTokenGroups.sort((a, b) => a.name.localeCompare(b.name));

  const cssRootFileContent = [
    license,
    ...sortedTokenGroups.map((theme) => `@import './${NAME_PREFIX}${theme.name}.css';`),
  ].join('\n');

  fs.writeFileSync(`${BUILD_PATH}design-tokens.css`, cssRootFileContent);

  console.log(`Design tokens css root file build done.`);
}

// Build themes enum TS type
function buildThemesEnumType(themedTokenGroups, license) {
  console.log('\nBuilding themes enum TS type...');
  const themesEnum = themedTokenGroups.map((theme) => `  ${theme.name} = '${theme.name}',`);
  const themesEnumFileContent = [license, `export enum Theme {`, ...themesEnum, `}`].join('\n');
  fs.writeFileSync(`${BUILD_PATH}themes.ts`, themesEnumFileContent);

  console.log(`Themes enum TS type build done.`);
}

// Build tailwind config: provides utilities to be used in a plugin, as well as a preset
function buildTailwindConfig() {
  console.log('\nBuilding tailwind config...');

  const content = fs.readFileSync(`${BUILD_PATH}${TAILWIND_CONFIG_FILENAME}`, 'utf-8');

  // Preserve the license and the json but get rid of the `module.exports`
  const [license, json] = content.split('module.exports = ');

  // Remove trailing semicolon and last trailing commas that make JSON invalid
  const cleanJson = json.replace(/,(\s*});/, '$1');
  const jsonTokens = JSON.parse(cleanJson);

  const spacing = mapTokens(jsonTokens, 'space');
  const width = mapTokens(jsonTokens, 'width');
  const height = mapTokens(jsonTokens, 'height');

  addCoreTokens(height);
  addCoreTokens(width);

  const result = {
    echoesPreset: {
      theme: { spacing, height, width },
    },
    echoesTypographyUtilities: tailwindTypographyUtilities,
  };

  const fileContents = `
${license}
const config = ${JSON.stringify(result, undefined, 2)};

export const echoesPreset = config.echoesPreset;
export const echoesTypographyUtilities = config.echoesTypographyUtilities;
`;

  fs.writeFileSync(`${BUILD_PATH}${TAILWIND_CONFIG_FILENAME}`, fileContents);

  console.log(`Tailwind config build done.`);
}

function mapTokens(tokens, filter) {
  return Object.keys(tokens)
    .filter((key) => key.includes(filter))
    .reduce((acc, key) => {
      const value = tokens[key];
      const index = key.split('-').pop();

      acc[index] = `var(--${key}, ${value})`;

      return acc;
    }, {});
}

function addCoreTokens(tokens) {
  tokens['0'] = '0px';

  tokens.auto = 'auto';
  tokens.fit = 'fit-content';
  tokens.min = 'min-content';
  tokens.max = 'max-content';

  tokens['1/2'] = '50%';
  tokens['1/3'] = '33.333333%';
  tokens['2/3'] = '66.666667%';
  tokens['1/4'] = '25%';
  tokens['2/4'] = '50%';
  tokens['3/4'] = '75%';
  tokens['1/5'] = '20%';
  tokens['2/5'] = '40%';
  tokens['3/5'] = '60%';
  tokens['4/5'] = '80%';
  tokens.full = '100%';
}
