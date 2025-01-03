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
import * as fslib from '@yarnpkg/fslib';
import { ZipOpenFS } from '@yarnpkg/libzip';
import fs from 'fs';
import { join } from 'node:path';
import pnpApi from 'pnpapi';
import subsetFont from 'subset-font';

console.log(`Generating optimized material-symbols-rounded font...`);

// This will transparently open zip archives in yarn cache
const zipOpenFs = new ZipOpenFS();

// This will convert all paths into a Posix variant, required for cross-platform compatibility
const crossFs = new fslib.PosixFS(zipOpenFs);

// Get the current working directory
const workDir = process.cwd();

// Load material-symbols font
const materialFontPath = pnpApi.resolveRequest(
  '@material-symbols/font-400/material-symbols-rounded.woff2',
  workDir,
);
const materialFontBuffer = crossFs.readFileSync(materialFontPath);

// Gather all icons glyphs codepoints from the icons folder
const codepointRegex = /IconMaterialWrapper.*&#x(.*);/s;
const iconsPath = join(workDir, '/src/components/icons');
const glyphCodepoints = fs
  .readdirSync(iconsPath)
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => {
    const content = fs.readFileSync(join(iconsPath, file), 'utf8');
    return parseInt(content.match(codepointRegex)?.[1], 16);
  })
  .filter(Boolean);

console.log(`Found ${glyphCodepoints.length} icons...`);

// Create a woff2 font subset based on material-symbols font for the list of glyph codepoints
const subsetBuffer = await subsetFont(
  materialFontBuffer,
  String.fromCodePoint(...glyphCodepoints),
  { targetFormat: 'woff2' },
);

// Write the subset font to the src/generated folder
const outputPath = join('src', 'generated', 'material-symbols-rounded-optimized.woff2');
fs.writeFileSync(join(workDir, outputPath), subsetBuffer);

console.log(`Optimized font saved to ${outputPath}`);
