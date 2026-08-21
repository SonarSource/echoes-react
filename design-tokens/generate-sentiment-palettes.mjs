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

import { readFile, writeFile } from 'node:fs/promises';

const PALETTE_FILES = [
  'design-tokens/tokens/brand/brand-a/palettes/light.json',
  'design-tokens/tokens/brand/brand-a/palettes/dark.json',
  'design-tokens/tokens/brand/brand-b/palettes/light.json',
  'design-tokens/tokens/brand/brand-b/palettes/dark.json',
];

const SENTIMENT_ANCHORS = {
  light: {
    blue: {
      1: '#FCFEFF',
      3: '#E8F4FF',
      6: '#A8D5FF',
      9: '#0070F3',
      11: '#0061CC',
      12: '#102A43',
    },
    green: {
      1: '#FBFFFC',
      3: '#E6F9ED',
      6: '#A8E8C0',
      9: '#087A3E',
      11: '#08713A',
      12: '#10351F',
    },
    yellow: {
      1: '#FFFDF5',
      3: '#FFF5CA',
      6: '#FFD878',
      9: '#B45A00',
      11: '#984800',
      12: '#402800',
    },
    red: {
      1: '#FFFCFC',
      3: '#FFE7E9',
      6: '#FFB3BD',
      9: '#E00032',
      11: '#C9153B',
      12: '#4A0814',
    },
  },
  dark: {
    blue: {
      1: '#0B121A',
      3: '#0D2740',
      6: '#164F82',
      9: '#70B7FF',
      11: '#A8D4FF',
      12: '#EAF6FF',
    },
    green: {
      1: '#0A140E',
      3: '#0B2B18',
      6: '#146137',
      9: '#40C878',
      11: '#9BE8B5',
      12: '#EAFBF0',
    },
    yellow: {
      1: '#171207',
      3: '#332405',
      6: '#6F4A00',
      9: '#F5B642',
      11: '#FFDB8A',
      12: '#FFF7E1',
    },
    red: {
      1: '#1A0A0D',
      3: '#3B101A',
      6: '#7D1B2F',
      9: '#FF919C',
      11: '#FFB0BA',
      12: '#FFF0F2',
    },
  },
};

const isCheck = process.argv.includes('--check');
const paletteSources = await Promise.all(
  PALETTE_FILES.map(async (file) => ({ file, source: await readFile(file, 'utf8') })),
);
const generatedFiles = paletteSources.map(({ file, source }) => {
  const tokens = JSON.parse(source);
  const theme = file.endsWith('/dark.json') ? 'dark' : 'light';
  const palettes = tokens.echoes.color.palette;

  for (const [name, anchors] of Object.entries(SENTIMENT_ANCHORS[theme])) {
    const generatedPalette = generatePalette(anchors);

    for (const [step, value] of Object.entries(generatedPalette)) {
      palettes[name][step].$value = value;
    }
  }

  return { file, generatedSource: `${JSON.stringify(tokens, null, 2)}\n`, source };
});
const changedFiles = generatedFiles.filter(
  ({ generatedSource, source }) => generatedSource !== source,
);

if (isCheck && changedFiles.length > 0) {
  throw new Error(
    `Sentiment palettes are out of date. Run yarn generate-sentiment-palettes. Files: ${changedFiles.map(({ file }) => file).join(', ')}`,
  );
}

if (!isCheck) {
  await Promise.all(
    changedFiles.map(({ file, generatedSource }) => writeFile(file, generatedSource)),
  );
  process.stdout.write(`Generated sentiment palettes in ${PALETTE_FILES.length} files.\n`);
}

function generatePalette(anchors) {
  const anchorSteps = Object.keys(anchors)
    .map(Number)
    .sort((first, second) => first - second);
  const palette = {};

  for (let step = 1; step <= 12; step += 1) {
    if (anchors[step]) {
      palette[step] = anchors[step].toUpperCase();
    } else {
      const lowerStep = anchorSteps.filter((anchorStep) => anchorStep < step).at(-1);
      const upperStep = anchorSteps.find((anchorStep) => anchorStep > step);
      const position = (step - lowerStep) / (upperStep - lowerStep);
      const lowerColor = hexToOklch(anchors[lowerStep]);
      const upperColor = hexToOklch(anchors[upperStep]);

      palette[step] = oklchToHex(interpolateOklch(lowerColor, upperColor, position));
    }
  }

  return palette;
}

function hexToOklch(hex) {
  const [red, green, blue] = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => srgbToLinear(Number.parseInt(channel, 16) / 255));
  const l = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue);
  const m = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue);
  const s = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);
  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const b = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  return {
    lightness,
    chroma: Math.hypot(a, b),
    hue: normalizeHue((Math.atan2(b, a) * 180) / Math.PI),
  };
}

function interpolateOklch(first, second, position) {
  const hueDelta = ((second.hue - first.hue + 540) % 360) - 180;

  return {
    lightness: interpolate(first.lightness, second.lightness, position),
    chroma: interpolate(first.chroma, second.chroma, position),
    hue: normalizeHue(first.hue + hueDelta * position),
  };
}

function oklchToHex(color) {
  let lowChroma = 0;
  let highChroma = color.chroma;
  let channels = oklchToSrgb(color);

  if (!isInSrgbGamut(channels)) {
    for (let iteration = 0; iteration < 24; iteration += 1) {
      const chroma = (lowChroma + highChroma) / 2;
      const candidate = oklchToSrgb({ ...color, chroma });

      if (isInSrgbGamut(candidate)) {
        lowChroma = chroma;
        channels = candidate;
      } else {
        highChroma = chroma;
      }
    }
  }

  return `#${channels.map(channelToHex).join('')}`;
}

function oklchToSrgb({ lightness, chroma, hue }) {
  const hueRadians = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(hueRadians);
  const b = chroma * Math.sin(hueRadians);
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

function srgbToLinear(channel) {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(channel) {
  return channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055;
}

function isInSrgbGamut(channels) {
  return channels.every((channel) => channel >= 0 && channel <= 1);
}

function channelToHex(channel) {
  return Math.round(Math.min(1, Math.max(0, channel)) * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();
}

function interpolate(first, second, position) {
  return first + (second - first) * position;
}

function normalizeHue(hue) {
  return ((hue % 360) + 360) % 360;
}
