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
// Drop the dev-only postinstall hook from the packed manifest, then restore it.
// Deleting the script (instead of renaming it to `_postinstall`) keeps npm 10.4+
// from running it when a consumer installs the published package.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageJsonPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../package.json',
);
const postinstallLine = '    "postinstall": "patch-package",\n';

const action = process.argv[2];
const source = fs.readFileSync(packageJsonPath, 'utf8');

if (action === '--disable') {
  if (!source.includes(postinstallLine)) {
    process.exit(0);
  }

  fs.writeFileSync(packageJsonPath, source.replace(postinstallLine, ''));
} else if (action === '--enable') {
  if (source.includes(postinstallLine)) {
    process.exit(0);
  }

  const anchor = '    "prepack":';
  if (!source.includes(anchor)) {
    console.error('prepack script was not found in package.json');
    process.exit(1);
  }

  fs.writeFileSync(packageJsonPath, source.replace(anchor, `${postinstallLine}${anchor}`));
} else {
  console.error('Usage: node ./config/scripts/toggle-postinstall.js --disable|--enable');
  process.exit(1);
}
