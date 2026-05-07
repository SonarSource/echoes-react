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

/**
 * Usage:
 *   node config/scripts/create-icon.js <Name> <key> [--filled|--fillable] [codepoint]
 *
 * Arguments:
 *   Name               - PascalCase component name, e.g. "Shield" → creates IconShield
 *   key                - Material Symbols icon name (snake_case), e.g. "shield"
 *   --filled           - Icon is always filled (like IconBell)
 *   --fillable         - Icon accepts an isFilled prop (like IconHome)
 *   codepoint          - (optional) hex codepoint, e.g. "e9e0". If omitted, fetched from upstream.
 *
 * Examples:
 *   node config/scripts/create-icon.js Shield shield
 *   node config/scripts/create-icon.js Shield shield --fillable
 *   node config/scripts/create-icon.js Shield shield --filled
 *   node config/scripts/create-icon.js Shield shield e9e0
 *   node config/scripts/create-icon.js Shield shield --fillable e9e0
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { join } from 'node:path';

const CODEPOINTS_URL =
  'https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/MaterialSymbolsRounded%5BFILL%2CGRAD%2Copsz%2Cwght%5D.codepoints';

const LICENSE_HEADER = `/*
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
 */`;

const args = process.argv.slice(2);
const [name, key] = args;
const isFilled = args.includes('--filled');
const isFillable = args.includes('--fillable');
const explicitCodepoint = args.find((a) => /^[0-9a-f]+$/i.test(a));

if (!name || !key) {
  console.error(
    'Usage: node config/scripts/create-icon.js <Name> <key> [--filled|--fillable] [codepoint]',
  );
  console.error('  Name               PascalCase icon name, e.g. "Shield"');
  console.error('  key                Material Symbols icon name, e.g. "shield"');
  console.error('  --filled           Always render filled (like IconBell)');
  console.error('  --fillable         Accept isFilled prop (like IconHome)');
  console.error('  codepoint          (optional) hex codepoint, e.g. "e9e0"');
  process.exit(1);
}

if (isFilled && isFillable) {
  console.error('Error: --filled and --fillable are mutually exclusive.');
  process.exit(1);
}

// --- Resolve codepoint ---

let codepoint = explicitCodepoint?.toLowerCase();

if (codepoint && !/^[0-9a-f]+$/i.test(codepoint)) {
  console.error(`Error: codepoint "${codepoint}" is not valid hex.`);
  process.exit(1);
}

if (!codepoint) {
  console.log(`Fetching codepoints from Material Symbols...`);
  try {
    const response = await fetch(CODEPOINTS_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const text = await response.text();
    const escapedKey = key.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
    const regexp = new RegExp(String.raw`^${escapedKey}\s+([0-9a-f]+)$`, 'm');
    const match = regexp.exec(text);
    if (!match) {
      console.error(`Error: icon key "${key}" not found in Material Symbols codepoints.`);
      console.error(`Check the icon name at https://fonts.google.com/icons`);
      console.error(`Then re-run with the codepoint as a third argument:`);
      console.error(`  node config/scripts/create-icon.js ${name} ${key} <codepoint>`);
      process.exit(1);
    }
    codepoint = match[1];
    console.log(`Found codepoint for "${key}": ${codepoint}`);
  } catch (err) {
    console.error(`Error: failed to fetch codepoints — ${err.message}`);
    console.error(`Re-run with the codepoint as a third argument:`);
    console.error(`  node config/scripts/create-icon.js ${name} ${key} <codepoint>`);
    process.exit(1);
  }
}

const workDir = process.cwd();

// --- Validate key exists in local font package ---

const localFontDts = join(workDir, 'node_modules/@material-symbols/font-400/index.d.ts');
const localFontTypes = fs.readFileSync(localFontDts, 'utf8');
if (!localFontTypes.includes(`"${key}"`)) {
  console.error(
    `Error: icon key "${key}" is not available in the installed @material-symbols/font-400 package.`,
  );
  console.error(`The upstream codepoints file has it, but the local font does not.`);
  console.error(`Upgrade the package first: yarn up @material-symbols/font-400`);
  process.exit(1);
}

// --- Create TSX file ---

const iconsDir = join(workDir, 'src/components/icons');
const componentName = `Icon${name}`;
const tsxPath = join(iconsDir, `${componentName}.tsx`);

if (fs.existsSync(tsxPath)) {
  console.error(`Error: ${tsxPath} already exists.`);
  process.exit(1);
}

const propsType = isFillable ? 'IconFilledProps' : 'IconProps';
const importedTypes = isFillable
  ? 'IconFilledProps, IconMaterialWrapper'
  : 'IconMaterialWrapper, IconProps';
const wrapperProps = isFilled ? 'isFilled {...props}' : '{...props}';

const tsxContent = `${LICENSE_HEADER}

import { forwardRef } from 'react';
import { ${importedTypes} } from './IconWrapper';

export const ${componentName} = forwardRef<HTMLSpanElement, ${propsType}>((props, ref) => {
  // This is Material Symbols' "${key}" icon
  return (
    <IconMaterialWrapper ${wrapperProps} ref={ref}>
      &#x${codepoint.toUpperCase()};
    </IconMaterialWrapper>
  );
});
${componentName}.displayName = '${componentName}';
`;

fs.writeFileSync(tsxPath, tsxContent);
console.log(`Created ${tsxPath}`);

// --- Insert export into index.ts ---

const indexPath = join(iconsDir, 'index.ts');
const indexContent = fs.readFileSync(indexPath, 'utf8');
const exportLine = `export { ${componentName} } from './${componentName}';`;

if (indexContent.includes(exportLine)) {
  console.log(`Export already present in index.ts, skipping.`);
} else {
  const lines = indexContent.split('\n');
  const exportPattern = /^export \{ (Icon\w+) \} from/;
  let insertIndex = lines.findLastIndex((line) => {
    const match = exportPattern.exec(line);
    return match !== null && match[1].localeCompare(componentName) < 0;
  });
  // Insert after the last export that sorts before ours (+1), or before the first export if none
  if (insertIndex === -1) {
    insertIndex = lines.findIndex((line) => exportPattern.test(line));
  } else {
    insertIndex += 1;
  }
  lines.splice(insertIndex, 0, exportLine);
  fs.writeFileSync(indexPath, lines.join('\n'));
  console.log(`Inserted export into index.ts at line ${insertIndex + 1}`);
}

// --- Regenerate font ---

console.log(`Regenerating optimized font...`);
execSync('yarn build-fonts', { stdio: 'inherit' });

console.log(`\nDone! Icon${name} is ready.`);
