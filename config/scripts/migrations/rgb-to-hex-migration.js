#!/usr/bin/env node
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

/* eslint-disable no-console */

/**
 * Script to migrate color tokens from RGB/RGBA to HEX format
 * Usage:
 *   node rgb-to-hex-migration.js <file-path>
 *   <file-path> - Path to the JSON file containing color tokens (required)
 */

import fs from 'fs';
import path from 'path';

const MAX_RGB_VALUE = 255;

/** * Converts a number to a 2-digit hexadecimal string
 * @param {number} n - Number to convert
 * @returns {string} 2-digit hexadecimal string
 */
function toHex(n) {
  return Math.round(n).toString(16).padStart(2, '0');
}

/**
 * Converts RGB values to hexadecimal format
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {string} Hex color string
 */
function rgbToHex(r, g, b) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts RGBA values to 8-digit hexadecimal format (hex8)
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @param {number} a - Alpha value (0-1)
 * @returns {string} Hex8 color string
 */
function rgbaToHex8(r, g, b, a) {
  const alphaHex = toHex(a * MAX_RGB_VALUE);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`;
}

/**
 * Converts RGB/RGBA color strings to hex format
 * @param {string} colorValue - Color value (rgb() or rgba())
 * @returns {string} Converted hex color
 */
function convertColorValue(colorValue) {
  // Match rgb(r, g, b) format
  const rgbMatch = colorValue.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return rgbToHex(parseInt(r, 10), parseInt(g, 10), parseInt(b, 10));
  }

  // Match rgba(r, g, b, a) format
  const rgbaMatch = colorValue.match(
    /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.?\d+)\s*\)$/,
  );
  if (rgbaMatch) {
    const [, r, g, b, a] = rgbaMatch;
    return rgbaToHex8(parseInt(r, 10), parseInt(g, 10), parseInt(b, 10), parseFloat(a));
  }

  // Return unchanged if not rgb/rgba format
  return colorValue;
}

/**
 * Recursively processes an object to convert color values
 * @param {object} obj - Object to process
 * @returns {object} Processed object with converted colors
 */
function processColorTokens(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const result = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      // Recursively process nested objects
      result[key] = processColorTokens(value);
    } else if (typeof value === 'string') {
      // Convert any string that contains RGB/RGBA patterns
      result[key] = convertColorValue(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Main function to migrate color tokens from RGB/RGBA to hex format
 * @param {string} filePath - Path to the colors file to convert (required)
 */
function migrateColorsToHex(filePath) {
  if (!filePath) {
    console.error('❌ Error: File path is required');
    console.error('Use --help for usage information');
    process.exit(1);
  }

  // Resolve file path relative to the current working directory
  const colorsFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);

  try {
    // Check if the file exists
    if (!fs.existsSync(colorsFilePath)) {
      console.error(`❌ Error: File not found at ${colorsFilePath}`);
      process.exit(1);
    }

    console.log(`📖 Reading file: ${path.basename(colorsFilePath)}...`);

    // Read the original file
    const originalContent = fs.readFileSync(colorsFilePath, 'utf8');
    let colorTokens;

    try {
      colorTokens = JSON.parse(originalContent);
    } catch (parseError) {
      console.error(`❌ Error: Invalid JSON in file ${path.basename(colorsFilePath)}`);
      console.error(parseError.message);
      process.exit(1);
    }

    console.log('🔄 Converting RGB/RGBA values to hex format...');

    // Process the color tokens
    const convertedTokens = processColorTokens(colorTokens);

    // Write the converted tokens back to the file
    const convertedContent = JSON.stringify(convertedTokens, null, 2);
    fs.writeFileSync(colorsFilePath, convertedContent, 'utf8');

    console.log('✅ Migration completed successfully!');
    console.log(`📁 Updated file: ${colorsFilePath}`);

    // Count conversions for reporting
    const rgbMatches = (originalContent.match(/rgb\(/g) || []).length;
    const rgbaMatches = (originalContent.match(/rgba\(/g) || []).length;
    const totalConversions = rgbMatches + rgbaMatches;

    if (totalConversions > 0) {
      console.log(`🎨 Converted ${totalConversions} color values:`);
      console.log(`   • ${rgbMatches} RGB values to hex`);
      console.log(`   • ${rgbaMatches} RGBA values to hex8`);
    } else {
      console.log('ℹ️  No RGB/RGBA values found to convert');
    }
  } catch (error) {
    console.error('❌ Error during migration:');
    console.error(error.message);
    process.exit(1);
  }
}

// Run the migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const filePath = args[0];

  if (args.includes('--help') || args.includes('-h')) {
    console.log('🚀 RGB/RGBA to Hex Migration Script');
    console.log('');
    console.log('Usage:');
    console.log('  node rgb-to-hex-migration.js <file-path>');
    console.log('');
    console.log('Arguments:');
    console.log('  file-path    Path to the JSON file to convert (required)');
    console.log('');
    console.log('Options:');
    console.log('  -h, --help   Show this help message');
    console.log('');
    console.log('Examples:');
    console.log('  node rgb-to-hex-migration.js ./design-tokens/tokens/layer1/colors.json');
    console.log('  node rgb-to-hex-migration.js ./my-colors.json');
    console.log('  node rgb-to-hex-migration.js /absolute/path/to/colors.json');
    process.exit(0);
  }

  if (!filePath) {
    console.error('❌ Error: File path is required');
    console.error('');
    console.error('Usage: node rgb-to-hex-migration.js <file-path>');
    console.error('Use --help for more information');
    process.exit(1);
  }

  console.log('🚀 Starting RGB/RGBA to Hex migration...');
  console.log(`📁 Target file: ${filePath}`);
  console.log('');
  migrateColorsToHex(filePath);
}

export { convertColorValue, migrateColorsToHex, rgbToHex, rgbaToHex8 };
