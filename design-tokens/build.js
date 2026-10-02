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
const GENERATED_STYLES_PATH = path.join(GENERATED_PATH, 'styles/');
const GENERATED_TOKENS_PATH = path.join(GENERATED_PATH, 'tokens/');
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

// All theme entries live in a single "Theme" group
const allThemes = designTokenGroups.filter(({ group }) => group === 'Theme');

if (allThemes.length === 0) {
  console.error('Error: no themes found in $themes.json');
  process.exit(1);
}

// Group themes by brand directory name (e.g., sonar, gitar)
const brandThemeMap = new Map();
for (const theme of allThemes) {
  const dir = brandDirOf(theme);
  if (!dir) {
    console.error(`Error: theme "${theme.name}" has no brand/ token set`);
    process.exit(1);
  }
  if (!brandThemeMap.has(dir)) {
    brandThemeMap.set(dir, []);
  }
  brandThemeMap.get(dir).push(theme);
}

const brands = [...brandThemeMap.entries()].map(([dir, themes]) => ({
  brandDir: dir,
  themes,
}));

console.log(`Found ${brands.length} brand(s): ${brands.map((b) => b.brandDir).join(', ')}`);

const sd = initStyleDictionary(licenseHeader);

// Build each brand in parallel
await Promise.all(brands.map((brand) => buildBrand(brand, sd)));

// Build shared outputs once (token names are identical across brands)
console.log(`\n=== Building shared outputs ===`);

// Extract unique mode names (e.g., "light", "dark") from theme names
const modeNames = [...new Set(allThemes.map((t) => extractMode(t)))].sort();
buildThemesEnumType(
  modeNames.map((mode) => ({ name: mode })),
  licenseHeader,
);
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
async function buildBaseTokens(tokenGroup, sd, buildPath, log = console.log) {
  log('Building base tokens, no colors allowed...');
  log(`Building "${tokenGroup.name}" group...`);

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

  log('Base tokens builds done.');
}

// Build themed tokens: 1 for each theme, without brand and mode base non-color tokens
async function buildThemedTokens(
  themedTokenGroups,
  baseDesignTokenGroup,
  sd,
  buildPath,
  log = console.log,
) {
  log('Building themed tokens, no brand or mode base non-colors...');

  await Promise.all(
    themedTokenGroups.map(async (theme) => {
      log(`Building "${theme.name}" theme...`);

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

  log('Themed tokens builds done.');
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

async function buildBrand(brand, sd) {
  const { brandDir, themes } = brand;
  const tmpPath = path.join(GENERATED_PATH, `.tmp-${brandDir}/`);
  const log = (...args) => console.log(`[${brandDir}]`, ...args);

  log(`Building brand: ${brandDir}`);

  fs.mkdirSync(tmpPath, { recursive: true });

  // Synthetic base token group for non-color base tokens
  const baseTokenGroup = {
    name: brandDir,
    selectedTokenSets: {
      [`brand/${brandDir}/base`]: 'enabled',
      [`brand/${brandDir}/colors`]: 'enabled',
    },
  };

  // Map theme names to mode names (e.g., "Sonar Light" -> "light") for output filenames/selectors
  const modeThemedGroups = themes.map((theme) => ({
    ...theme,
    name: extractMode(theme),
  }));

  await buildBaseTokens(baseTokenGroup, sd, tmpPath, log);
  await buildThemedTokens(modeThemedGroups, baseTokenGroup, sd, tmpPath, log);

  // Assemble per-brand CSS: concatenate base + all theme CSS files
  const baseCss = fs.readFileSync(path.join(tmpPath, `${NAME_PREFIX}base.css`), 'utf-8');

  const sortedThemes = [...modeThemedGroups].sort((a, b) => a.name.localeCompare(b.name));
  const themeCss = sortedThemes
    .map((theme) => fs.readFileSync(path.join(tmpPath, `${NAME_PREFIX}${theme.name}.css`), 'utf-8'))
    .join('\n');

  const fullCss = [baseCss, themeCss].join('\n');

  // Write per-brand CSS to src/generated/styles/
  fs.mkdirSync(GENERATED_STYLES_PATH, { recursive: true });
  fs.writeFileSync(path.join(GENERATED_STYLES_PATH, `${brandDir}.css`), fullCss);
  log(`-> ${path.join(GENERATED_STYLES_PATH, `${brandDir}.css`)}`);

  // Write per-brand JSON to src/generated/tokens/
  const brandTokensDir = path.join(GENERATED_TOKENS_PATH, brandDir);
  fs.mkdirSync(brandTokensDir, { recursive: true });

  fs.copyFileSync(
    path.join(tmpPath, `${NAME_PREFIX}base.json`),
    path.join(brandTokensDir, 'base.json'),
  );
  fs.copyFileSync(
    path.join(tmpPath, `${NAME_PREFIX}themed.json`),
    path.join(brandTokensDir, 'themed.json'),
  );
  log(`-> ${brandTokensDir}/base.json`);
  log(`-> ${brandTokensDir}/themed.json`);

  // For the first brand, copy the tailwind config to src/generated/ root
  // (tailwind uses var(--token, fallback) — brand-agnostic)
  if (brand === brands[0]) {
    fs.copyFileSync(
      path.join(tmpPath, TAILWIND_CONFIG_FILENAME),
      path.join(GENERATED_PATH, TAILWIND_CONFIG_FILENAME),
    );
  }

  // Clean up temp dir
  fs.rmSync(tmpPath, { recursive: true, force: true });

  log('Done.');
}

// Extract the brand directory name from a theme's selectedTokenSets
// e.g., { "brand/sonar/base": "enabled", ... } -> "sonar"
function brandDirOf(theme) {
  return Object.keys(theme.selectedTokenSets)
    .find((key) => key.startsWith('brand/'))
    ?.split('/')[1];
}

// Extract the mode name from a theme name (e.g., "Sonar Light" -> "light")
function extractMode(theme) {
  return theme.name.trim().split(/\s+/).pop().toLowerCase();
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
