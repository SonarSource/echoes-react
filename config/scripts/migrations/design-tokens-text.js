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

/**
 * Script to update design token references throughout the codebase
 * Excludes generated files and node_modules
 *
 * Usage:
 *   Run from the project root directory:
 *   node config/scripts/migrations/design-tokens-text.js
 *
 * To add new token mappings, update the TOKEN_MAPPINGS object below.
 */

/* eslint-disable no-console */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const currentDirname = process.cwd();

// Design token mappings - add new mappings here
const TOKEN_MAPPINGS = {
  'echoes-color-background-default': 'echoes-color-surface-default',
  'echoes-color-background-default-hover': 'echoes-color-surface-hover',
  'echoes-color-background-default-active': 'echoes-color-surface-active',
  'echoes-color-background-disabled': 'echoes-color-surface-disabled',
  'echoes-color-background-transparent': 'echoes-color-background-utility-transparent',
  'echoes-color-background-inverse': 'echoes-color-surface-inverse-default',
  'echoes-color-background-neutral-weak-default': 'echoes-color-background-neutral-subtle-default',
  'echoes-color-background-neutral-weak-hover': 'echoes-color-background-neutral-subtle-hover',
  'echoes-color-background-neutral-weak-active': 'echoes-color-background-neutral-subtle-active',
  'echoes-color-background-neutral-weak-focus': 'echoes-color-background-neutral-subtle-focus',
  'echoes-color-background-neutral-bolder': 'echoes-color-background-neutral-bolder-default',
  'echoes-color-background-back-drop-default': 'echoes-color-overlays-back-drop-default',
  'echoes-color-background-page': 'echoes-color-surface-canvas-default',
  'echoes-color-background-default-disabled': 'echoes-color-surface-disabled',
  'echoes-color-text-bold': 'echoes-color-text-strong',
  'echoes-color-text-subdued': 'echoes-color-text-subtle',
  'echoes-color-text-accent-hover': 'echoes-color-text-link-hover',
  'echoes-color-background-neutral-default': 'echoes-color-surface-inverse-default',
  'echoes-color-background-neutral-hover': 'echoes-color-surface-inverse-hover',
  'echoes-color-background-neutral-focus': 'echoes-color-surface-inverse-focus',
  'echoes-color-background-neutral-active': 'echoes-color-surface-inverse-active',
  'echoes-color-text-warning-bold': 'echoes-color-text-warning',
  'echoes-color-text-success-bold': 'echoes-color-text-success',
  'echoes-color-text-info-bold': 'echoes-color-text-info',
  'echoes-color-text-accent-bold': 'echoes-color-text-accent',
  'echoes-color-text-danger-bold': 'echoes-color-text-danger',
};

// File extensions to search
const FILE_EXTENSIONS = ['*.ts', '*.tsx', '*.css', '*.json', '*.md'];

// Directories to exclude
const EXCLUDED_PATHS = [
  './node_modules/*',
  './.git/*',
  './dist/*',
  './build/*',
  './.yarn/*',
  './src/generated/*',
  './design-tokens/*',
];

// File patterns to exclude
const EXCLUDED_FILES = ['*.min.*', 'yarn.lock', 'package-lock.json'];

/**
 * Get the project root directory
 */
function getProjectRoot() {
  return currentDirname;
}

/**
 * Find files matching criteria
 */
function findFiles() {
  const projectRoot = getProjectRoot();

  // Build find command parts
  const extensionNames = FILE_EXTENSIONS.map((ext) => `-name "${ext}"`);
  const extensionPattern = `\\( ${extensionNames.join(' -o ')} \\)`;
  const excludePathPattern = EXCLUDED_PATHS.map((p) => `-not -path "${p}"`).join(' ');
  const excludeFilePattern = EXCLUDED_FILES.map((f) => `-not -name "${f}"`).join(' ');

  const findCommand = `find . -type f ${extensionPattern} ${excludePathPattern} ${excludeFilePattern}`;

  try {
    const result = execSync(findCommand, {
      cwd: projectRoot,
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
    });

    return result
      .trim()
      .split('\n')
      .filter((file) => file.length > 0);
  } catch (error) {
    console.error('Error finding files:', error.message);
    return [];
  }
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Process all token replacements for a single file
 */
function replaceTokensInFile(filePath, tokenMappings) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const replacedTokens = [];

    // Apply all token replacements in a single pass
    for (const [oldToken, newToken] of Object.entries(tokenMappings)) {
      const regex = new RegExp(`${escapeRegExp(oldToken)}(?=\\s|\\)|;|$|,|'|")`, 'g');
      const newContent = content.replace(regex, newToken);

      if (newContent !== content) {
        replacedTokens.push(`'${oldToken}' → '${newToken}'`);
        content = newContent;
      }
    }

    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  📝 Updated ${filePath}:`);
      replacedTokens.forEach((replacement) => console.log(`    ${replacement}`));
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error updating file ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Process all token replacements across all files
 */
function replaceAllTokens(tokenMappings) {
  console.log('🔄 Processing all token replacements...');

  const allFiles = findFiles();
  console.log(`  ℹ️  ${allFiles.length} files to process...`);
  let updatedFiles = 0;

  for (const file of allFiles) {
    const fullPath = path.resolve(getProjectRoot(), file);

    if (replaceTokensInFile(fullPath, tokenMappings)) {
      updatedFiles++;
    }
  }

  if (updatedFiles === 0) {
    console.log('  ℹ️  No files needed updates');
  }

  return updatedFiles;
}

/**
 * Main execution function
 */
function main() {
  console.log('🎨 Updating design token references...');

  const projectRoot = getProjectRoot();
  console.log(`📁 Working in: ${projectRoot}`);

  // Change to project root
  process.chdir(projectRoot);

  // Process all token mappings in a single pass
  const totalUpdatedFiles = replaceAllTokens(TOKEN_MAPPINGS);

  console.log('\n✅ Design token replacement completed!');
  console.log(`📊 Total files updated: ${totalUpdatedFiles}`);
  console.log("\n🚀 Don't forget to test the build after these changes!");

  // Exit with appropriate code
  process.exit(0);
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, replaceAllTokens, replaceTokensInFile, TOKEN_MAPPINGS };
