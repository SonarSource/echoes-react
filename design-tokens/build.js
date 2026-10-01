/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
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
import * as path from 'node:path';
import StyleDictionary from 'style-dictionary';
import { transforms } from 'style-dictionary/enums';

const DEFAULT_THEME = 'light';
const DESIGN_TOKENS_PATH = 'design-tokens/tokens';
const GENERATED_PATH = 'src/generated/';
const DIST_STYLES_PATH = 'dist/styles/';
const DIST_TOKENS_PATH = 'dist/tokens/';
const NAME_PREFIX = 'design-tokens-';
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

const allBrands = designTokenGroups.filter(({ group }) => group === 'Brand');

if (allBrands.length === 0) {
  console.error('Error: no brands found in $themes.json');
  process.exit(1);
}

const themedGroups = designTokenGroups.filter(({ group }) => group === 'Themes');

console.log(`Found ${allBrands.length} brand(s): ${allBrands.map(({ name }) => name).join(', ')}`);

const sd = initStyleDictionary(licenseHeader);

// Build each brand
for (const brandGroup of allBrands) {
  const brandId = toBrandId(brandGroup.name);
  const brandSlug = brandId.toLowerCase();
  const tmpPath = `dist/.tmp-${brandSlug}/`;

  console.log(`\n=== Building brand: ${brandGroup.name} ===`);

  fs.mkdirSync(tmpPath, { recursive: true });

  const brandDir = Object.keys(brandGroup.selectedTokenSets)
    .find((key) => key.startsWith('brand/'))
    ?.split('/')[1];

  const brandThemedGroups = themedGroups.map((theme) => ({
    ...theme,
    selectedTokenSets: Object.fromEntries(
      Object.entries(theme.selectedTokenSets).map(([key, val]) => [
        key.startsWith('brand/') ? `brand/${brandDir}/${key.split('/').pop()}` : key,
        val,
      ]),
    ),
  }));

  await buildBaseTokens(brandGroup, sd, tmpPath);
  await buildThemedTokens(brandThemedGroups, brandGroup, sd, tmpPath);

  // Assemble per-brand CSS: concatenate base + all theme CSS files
  const baseCss = fs.readFileSync(path.join(tmpPath, `${NAME_PREFIX}base.css`), 'utf-8');

  const sortedThemes = [...brandThemedGroups].sort((a, b) => a.name.localeCompare(b.name));
  const themeCss = sortedThemes
    .map((theme) => fs.readFileSync(path.join(tmpPath, `${NAME_PREFIX}${theme.name}.css`), 'utf-8'))
    .join('\n');

  const fullCss = [baseCss, themeCss].join('\n');

  // Write per-brand CSS
  fs.mkdirSync(DIST_STYLES_PATH, { recursive: true });
  fs.writeFileSync(path.join(DIST_STYLES_PATH, `${brandSlug}.css`), fullCss);
  console.log(`  -> ${path.join(DIST_STYLES_PATH, `${brandSlug}.css`)}`);

  // Write per-brand JSON
  const brandTokensDir = path.join(DIST_TOKENS_PATH, brandSlug);
  fs.mkdirSync(brandTokensDir, { recursive: true });

  fs.copyFileSync(
    path.join(tmpPath, `${NAME_PREFIX}base.json`),
    path.join(brandTokensDir, 'base.json'),
  );
  fs.copyFileSync(
    path.join(tmpPath, `${NAME_PREFIX}themed.json`),
    path.join(brandTokensDir, 'themed.json'),
  );
  console.log(`  -> ${brandTokensDir}/base.json`);
  console.log(`  -> ${brandTokensDir}/themed.json`);

  // Clean up temp dir
  fs.rmSync(tmpPath, { recursive: true, force: true });
}

// Build shared outputs once (using first brand — token names are identical across brands)
console.log(`\n=== Building shared outputs ===`);

const firstBrand = allBrands[0];
const firstBrandDir = Object.keys(firstBrand.selectedTokenSets)
  .find((key) => key.startsWith('brand/'))
  ?.split('/')[1];

const firstBrandThemedGroups = themedGroups.map((theme) => ({
  ...theme,
  selectedTokenSets: Object.fromEntries(
    Object.entries(theme.selectedTokenSets).map(([key, val]) => [
      key.startsWith('brand/') ? `brand/${firstBrandDir}/${key.split('/').pop()}` : key,
      val,
    ]),
  ),
}));

await buildBaseTokens(firstBrand, sd, GENERATED_PATH);
await buildThemedTokens(firstBrandThemedGroups, firstBrand, sd, GENERATED_PATH);
buildThemesEnumType(firstBrandThemedGroups, licenseHeader);
buildTailwindConfig();

console.log(`\nAll brands built successfully.`);

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
          (attributes.item === 'roles' && attributes.subitem === 'support'), // but keep the support colors (black, white, transparent)
        [CUSTOM_FILTER_TAILWIND]: ({ attributes: { type, item } }) => {
          return type === 'dimension' && ['space', 'width', 'height'].includes(item);
        },
        [CUSTOM_FILTER_THEMED_TOKENS]: ({ attributes, filePath }) =>
          !filePath.includes(`brand/`) &&
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

// Build base tokens: brand base + mode base without colors
async function buildBaseTokens(tokenGroup, sd, buildPath) {
  console.log('\nBuilding base tokens, no colors allowed...');
  console.log(`\nBuilding "${tokenGroup.name}" group...`);

  const extendedSd = await sd.extend({
    source: [
      ...Object.entries(tokenGroup.selectedTokenSets)
        .filter(([, val]) => val !== 'disabled')
        .map(([tokenset]) => `${DESIGN_TOKENS_PATH}/${tokenset}.json`),
      `${DESIGN_TOKENS_PATH}/component/base.json`,
    ],
    platforms: {
      tokens: {
        transformGroup: CUSTOM_TRANSFORM_GROUP,
        buildPath,
        files: [
          {
            destination: `${NAME_PREFIX}base.css`,
            format: 'css/variables',
            filter: CUSTOM_FILTER_NO_COLOR,
            options: {
              fileHeader: LICENSE_HEADER_FILE_OPTION,
              selector: ':root',
            },
          },
          {
            destination: `${NAME_PREFIX}base.json`,
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

// Build themed tokens: 1 for each theme, without brand and mode base non-color tokens
async function buildThemedTokens(themedTokenGroups, baseDesignTokenGroup, sd, buildPath) {
  console.log('\nBuilding themed tokens, no brand or mode base non-colors...');

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
            buildPath,
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

// Build themes enum TS type
function buildThemesEnumType(themedTokenGroups, license) {
  console.log('\nBuilding themes enum TS type...');
  const themesEnum = themedTokenGroups.map((theme) => `  ${theme.name} = '${theme.name}',`);
  const themesEnumFileContent = [license, `export enum Theme {`, ...themesEnum, `}`].join('\n');
  fs.writeFileSync(`${GENERATED_PATH}themes.ts`, themesEnumFileContent);

  console.log(`Themes enum TS type build done.`);
}

// Build tailwind config: provides utilities to be used in a plugin, as well as a preset
function buildTailwindConfig() {
  console.log('\nBuilding tailwind config...');

  const content = fs.readFileSync(`${GENERATED_PATH}${TAILWIND_CONFIG_FILENAME}`, 'utf-8');

  // Preserve the license and the json but get rid of the `module.exports`
  const [license, json] = content.split('module.exports = ');

  // Remove trailing semicolon and last trailing commas that make JSON invalid
  const cleanJson = json.replace(/,(\s*});/, '$1');
  const jsonTokens = JSON.parse(cleanJson);

  const spacing = mapTokens(jsonTokens, 'space');
  const width = mapTokens(jsonTokens, 'width');
  const height = mapTokens(jsonTokens, 'height');

  addCoreTokens(height);
  height.screen = '100vh';

  addCoreTokens(width);
  width.screen = '100vw';

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

  fs.writeFileSync(`${GENERATED_PATH}${TAILWIND_CONFIG_FILENAME}`, fileContents);

  console.log(`Tailwind config build done.`);
}

function toBrandId(name) {
  return name.replaceAll(' ', '-');
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

  tokens.px = '1px';
  tokens.dvw = '100dvw';
  tokens.dvh = '100dvh';
  tokens.lvw = '100lvw';
  tokens.lvh = '100lvh';
  tokens.svw = '100svw';
  tokens.svh = '100svh';

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
