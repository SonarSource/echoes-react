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

import crypto from 'node:crypto';
import fs from 'node:fs';

const EXPECTED_OPTION_2_HASH = 'e937f2b0848b570f5e68582effc1f809a2b825878e32e47141723fc4f0cba35b';
const UI_PALETTES = [
  'gray',
  'grayAlpha',
  'blue',
  'green',
  'yellow',
  'red',
  'teal',
  'cyan',
  'purple',
  'magenta',
  'orange',
];
const MIGRATED_COMPONENT_FAMILIES = [
  'badge.',
  'badge-counter.',
  'button.',
  'checkbox.',
  'input.',
  'issue-row.',
  'link.',
  'message.',
  'navigation-item.',
  'promoted-feature.',
  'promoted-section.',
  'radio-button.',
  'table.',
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function flattenTokens(object, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(object)) {
    if (key.startsWith('$')) {
      continue;
    }

    const tokenPath = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && '$value' in value) {
      result[tokenPath] = value.$value;
    } else if (value && typeof value === 'object') {
      flattenTokens(value, tokenPath, result);
    }
  }

  return result;
}

function paletteFor(brand, theme) {
  const file = `design-tokens/tokens/brand/${brand}/palettes/${theme}.json`;
  return readJson(file).echoes.color.palette;
}

function linearChannel(channel) {
  const normalized = channel / 255;
  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const [red, green, blue] = hex
    .slice(1, 7)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16));
  return 0.2126 * linearChannel(red) + 0.7152 * linearChannel(green) + 0.0722 * linearChannel(blue);
}

function contrast(first, second) {
  const lighter = Math.max(luminance(first), luminance(second));
  const darker = Math.min(luminance(first), luminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

function assertContrast(name, foreground, background, minimum) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) {
    throw new Error(
      `${name} contrast is ${ratio.toFixed(2)}:1; expected at least ${minimum}:1 (${foreground} on ${background}).`,
    );
  }
}

// APCA 0.98G constants. APCA is diagnostic alongside the WCAG 2.2 AA gate above.
function apcaLuminance(hex) {
  const channels = hex
    .slice(1, 7)
    .match(/.{2}/g)
    .map((channel) => (Number.parseInt(channel, 16) / 255) ** 2.4);
  return channels[0] * 0.2126729 + channels[1] * 0.7151522 + channels[2] * 0.072175;
}

function clampBlack(luminanceValue) {
  return luminanceValue < 0.022
    ? luminanceValue + (0.022 - luminanceValue) ** 1.414
    : luminanceValue;
}

function apcaContrast(foreground, background) {
  const textLuminance = clampBlack(apcaLuminance(foreground));
  const backgroundLuminance = clampBlack(apcaLuminance(background));

  if (Math.abs(backgroundLuminance - textLuminance) < 0.0005) {
    return 0;
  }

  if (backgroundLuminance > textLuminance) {
    const contrastValue = (backgroundLuminance ** 0.56 - textLuminance ** 0.57) * 1.14;
    return contrastValue < 0.1 ? 0 : (contrastValue - 0.027) * 100;
  }

  const contrastValue = (backgroundLuminance ** 0.65 - textLuminance ** 0.62) * 1.14;
  return contrastValue > -0.1 ? 0 : (contrastValue + 0.027) * 100;
}

const apcaFindings = [];

function recordApca(name, foreground, background, minimum) {
  const lightnessContrast = Math.abs(apcaContrast(foreground, background));
  if (lightnessContrast < minimum) {
    apcaFindings.push(
      `${name} APCA is Lc ${lightnessContrast.toFixed(1)}; expected at least Lc ${minimum} (${foreground} on ${background}).`,
    );
  }
}

const brandAPalettes = {
  light: flattenTokens(paletteFor('brand-a', 'light')),
  dark: flattenTokens(paletteFor('brand-a', 'dark')),
};
const brandBPalettes = {
  light: flattenTokens(paletteFor('brand-b', 'light')),
  dark: flattenTokens(paletteFor('brand-b', 'dark')),
};

const actualHash = crypto.createHash('sha256').update(JSON.stringify(brandAPalettes)).digest('hex');

if (!EXPECTED_OPTION_2_HASH) {
  throw new Error(`Set EXPECTED_OPTION_2_HASH to ${actualHash}.`);
}

if (actualHash !== EXPECTED_OPTION_2_HASH) {
  throw new Error(
    `Option 2 palette hash changed: expected ${EXPECTED_OPTION_2_HASH}, got ${actualHash}.`,
  );
}

if (JSON.stringify(brandAPalettes) !== JSON.stringify(brandBPalettes)) {
  throw new Error('Brand A and Brand B must begin with identical, independently owned palettes.');
}

for (const theme of ['light', 'dark']) {
  const palette = paletteFor('brand-a', theme);

  for (const name of UI_PALETTES) {
    const steps = Object.keys(palette[name]);
    if (steps.length !== 12 || steps.some((step, index) => step !== String(index + 1))) {
      throw new Error(`${name} ${theme} must contain exactly steps 1–12.`);
    }
  }

  for (const [step, definition] of Object.entries(palette.grayAlpha)) {
    if (!/^#[0-9A-F]{8}$/.test(definition.$value)) {
      throw new Error(`grayAlpha ${theme} step ${step} must preserve uppercase eight-digit hex.`);
    }
  }

  const surface = palette.gray['1'].$value;
  const onSolid = theme === 'light' ? '#FFFFFF' : '#000000';
  assertContrast(`${theme} default text`, palette.gray['11'].$value, surface, 4.5);
  assertContrast(`${theme} low-contrast text`, palette.gray['10'].$value, surface, 4.5);
  assertContrast(`${theme} control border`, palette.gray['9'].$value, surface, 3);
  assertContrast(`${theme} focus ring`, palette.gray['12'].$value, surface, 3);
  assertContrast(`${theme} feature text`, palette.blue['11'].$value, palette.blue['3'].$value, 4.5);
  assertContrast(`${theme} feature solid`, onSolid, palette.blue['9'].$value, 4.5);
  recordApca(`${theme} default text`, palette.gray['11'].$value, surface, 60);
  recordApca(`${theme} low-contrast text`, palette.gray['10'].$value, surface, 60);
  recordApca(`${theme} control border`, palette.gray['9'].$value, surface, 30);
  recordApca(`${theme} focus ring`, palette.gray['12'].$value, surface, 30);
  recordApca(`${theme} feature text`, palette.blue['11'].$value, palette.blue['3'].$value, 60);
  recordApca(`${theme} feature solid`, onSolid, palette.blue['9'].$value, 60);

  for (const status of ['green', 'yellow', 'red']) {
    assertContrast(
      `${theme} ${status} text`,
      palette[status]['11'].$value,
      palette[status]['3'].$value,
      4.5,
    );
    assertContrast(`${theme} ${status} solid`, onSolid, palette[status]['9'].$value, 4.5);
    recordApca(
      `${theme} ${status} text`,
      palette[status]['11'].$value,
      palette[status]['3'].$value,
      60,
    );
    recordApca(`${theme} ${status} solid`, onSolid, palette[status]['9'].$value, 60);
  }

  for (const [series, definition] of Object.entries(palette.dataViz.categorical)) {
    assertContrast(
      `${theme} categorical data-viz ${series}`,
      definition.$value,
      palette.gray['2'].$value,
      3,
    );
    recordApca(
      `${theme} categorical data-viz ${series}`,
      definition.$value,
      palette.gray['2'].$value,
      30,
    );
  }

  const semanticTokens = flattenTokens(readJson(`design-tokens/tokens/modes/${theme}.json`).echoes);
  const components = flattenTokens(readJson(`design-tokens/tokens/component/${theme}.json`).echoes);

  for (const [layer, tokens] of [
    ['semantic', semanticTokens],
    ['component', components],
  ]) {
    for (const [name, value] of Object.entries(tokens)) {
      if (
        typeof value === 'string' &&
        (value.includes('echoes.color.palette.grey.') ||
          value.includes('echoes.color.roles.neutral.'))
      ) {
        throw new Error(`${theme} ${layer} token ${name} uses a legacy neutral alias: ${value}.`);
      }
    }
  }

  for (const [name, value] of Object.entries(components)) {
    const migrated = MIGRATED_COMPONENT_FAMILIES.some((family) => name.startsWith(family));
    if (migrated && typeof value === 'string' && value.includes('echoes.color.palette.')) {
      throw new Error(`Component token ${name} binds directly to a primitive: ${value}.`);
    }
  }
}

if (apcaFindings.length > 0) {
  console.warn(`APCA diagnostic findings:\n- ${apcaFindings.join('\n- ')}`);
}

console.log('Option 2 palette and three-layer color architecture are valid.');
