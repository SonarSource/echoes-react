/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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

import { registerTransforms, transforms } from '@tokens-studio/sd-transforms';
import * as fs from 'node:fs';
import StyleDictionary from 'style-dictionary';

const DEFAULT_THEME = 'light';
const DESIGN_TOKENS_PATH = 'design-tokens/tokens';
const BUILD_PATH = 'src/generated/';
const NAME_PREFIX = 'design-tokens-';
const BASE_TOKENS_NAME = `${NAME_PREFIX}base`;
const CUSTOM_TRANSFORM_GROUP = 'sonar-design-tokens';
const CUSTOM_FILTER_NO_COLOR = 'sonar-no-color';
const CUSTOM_FILTER_THEMED_TOKENS = 'sonar-themed-tokens';

const licenseHeader = fs.readFileSync(`config/license/LICENSE-HEADER.txt`, 'utf-8');

const designTokenGroups = JSON.parse(
  fs.readFileSync(`${DESIGN_TOKENS_PATH}/$themes.json`, 'utf-8'),
);
const themedDesignTokenGroups = designTokenGroups.filter(({ group }) => group === 'Themes');

initStyleDictionary();
buildBaseTokens(designTokenGroups.filter(({ group }) => group === 'Sonar'));
buildThemedTokens(themedDesignTokenGroups);
buildCSSRootFile(designTokenGroups, licenseHeader);
buildThemesEnumType(themedDesignTokenGroups, licenseHeader);

function initStyleDictionary() {
  registerTransforms(StyleDictionary);

  StyleDictionary.registerTransformGroup({
    name: CUSTOM_TRANSFORM_GROUP,
    transforms: ['attribute/cti', ...transforms, 'color/css', 'name/cti/kebab'],
  });

  StyleDictionary.registerFilter({
    name: CUSTOM_FILTER_NO_COLOR,
    matcher: ({ attributes }) => attributes.category !== 'color',
  });

  StyleDictionary.registerFilter({
    name: CUSTOM_FILTER_THEMED_TOKENS,
    matcher: ({ attributes, filePath }) =>
      !filePath.includes(`layer1`) &&
      !(filePath.endsWith('layer2/base.json') && attributes.category !== 'color'),
  });
}

// Build base tokens: layer1 base + layer2 base without colors
function buildBaseTokens(tokenGroups) {
  console.log('\nBuilding base tokens, no colors allowed...');
  tokenGroups.forEach((group) => {
    console.log(`\nBuilding "${group.name}" group...`);
    StyleDictionary.extend({
      source: Object.entries(group.selectedTokenSets)
        .filter(([, val]) => val !== 'disabled')
        .map(([tokenset]) => `${DESIGN_TOKENS_PATH}/${tokenset}.json`),
      platforms: {
        tokens: {
          transformGroup: CUSTOM_TRANSFORM_GROUP,
          buildPath: BUILD_PATH,
          files: [
            {
              destination: `${NAME_PREFIX}${group.name}.css`,
              format: 'css/variables',
              filter: CUSTOM_FILTER_NO_COLOR,
              options: {
                showFileHeader: true,
                selector: ':root',
              },
            },
            {
              destination: `${NAME_PREFIX}${group.name}.json`,
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
  });
  console.log(`\nBase tokens builds done.`);
}

// Build themed tokens: 1 for each themes, without layer1 and layer2 base non colors tokens
function buildThemedTokens(themedTokenGroups) {
  console.log('\nBuilding themed tokens, no layer1 or layer2 base non colors...');

  themedTokenGroups.forEach((theme) => {
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
              filter: CUSTOM_FILTER_THEMED_TOKENS,
              options: {
                showFileHeader: true,
                selector:
                  theme.name === DEFAULT_THEME
                    ? ':root'
                    : `html[data-echoes-theme='${theme.name}']`,
              },
            },
          ],
        },
      },
    }).buildAllPlatforms();
  });
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
