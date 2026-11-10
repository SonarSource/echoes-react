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

import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const OXLINT_BIN = join(dirname(require.resolve('oxlint/package.json')), 'bin/oxlint');
const WORKSPACE_ROOT = fileURLToPath(new URL('../../', import.meta.url));

export function resolveInWorkspace(path) {
  return resolve(WORKSPACE_ROOT, path);
}

export function runOxlint(options, paths, spawnOptions) {
  return spawnSync(
    process.execPath,
    [
      OXLINT_BIN,
      '-c',
      resolveInWorkspace('.oxlintrc.json'),
      ...options,
      '--',
      ...paths.map(resolveInWorkspace),
    ],
    { cwd: WORKSPACE_ROOT, ...spawnOptions },
  );
}
