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
/*
 * Removes the dev-only `postinstall` hook from the published package.
 *
 * Why there is a `postinstall` script
 * -----------------------------------
 * This repository patches a few of its dependencies (`@mantine/core`, Radix, etc.) with
 * patch-package. The patches live in the `patches/` folder. The `postinstall` script applies
 * them automatically after every `yarn install` in this repository, before `dist/` is built.
 * It is only relevant for developing Echoes itself.
 *
 * The problem
 * -----------
 * When the library is published, `package.json` is included in the package as is, `scripts`
 * included, so consumers (SonarQube, SonarCloud, etc.) used to receive this `postinstall`
 * script too. It checked whether it was running inside `node_modules` and did nothing in that
 * case, so it was harmless. But its mere presence is already an issue:
 *   - pnpm 10 blocks install scripts of dependencies by default. It shows a warning and asks
 *     the user to run `pnpm approve-builds`.
 *   - Yarn Berry also treats the script as a build step and may show warnings.
 *   - Security scanners flag any package that has an install script, because it is the
 *     classic vector for supply-chain attacks.
 *
 * How it is solved
 * ----------------
 *   - `prepack` runs this script with `--disable` right before the `.tgz` archive is created,
 *     which removes the `postinstall` line from `package.json`.
 *   - `postpack` runs it with `--enable` right after, which puts the line back.
 * The published package has no install script at all, while `yarn install` in this repository
 * keeps applying the patches.
 *
 * Both `yarn pack` and `npm pack` run these lifecycle scripts. The CI publishes with
 * `jf npm publish`, which relies on `npm pack`, so the published package is covered.
 *
 * Things to keep in mind
 * ----------------------
 *   - The `postinstall` line is matched as exact text (see `postinstallLine` below). If you
 *     reformat or reorder the `scripts` section of `package.json`, check that the packed
 *     manifest still has no `postinstall`. This should print nothing:
 *       yarn pack -o /tmp/echoes.tgz
 *       tar -xzOf /tmp/echoes.tgz package/package.json | grep postinstall
 *   - If a pack fails between `prepack` and `postpack`, `package.json` stays modified locally.
 *     Restore it with `git checkout package.json`.
 *
 * Replacing this script with pinst
 * --------------------------------
 * pinst (https://github.com/typicode/pinst, by the author of Husky) does the same job and
 * could replace this script entirely:
 *   "postinstall": "patch-package",
 *   "prepack": "pinst --disable",
 *   "postpack": "pinst --enable"
 * It exists because Yarn 2+ does not support the `prepare` hook, which is how npm and pnpm
 * projects usually run dev-only setup. It is about 50 lines, has no dependencies, and is
 * MIT-licensed.
 *
 * Differences with this script:
 *   - pinst parses `package.json` as JSON and keeps its indentation, so it does not depend on
 *     the exact text of the `postinstall` line or on the order of the scripts.
 *   - pinst renames `postinstall` to `_postinstall` instead of deleting it, so the published
 *     `package.json` still contains `"_postinstall": "patch-package"`. This is harmless: npm,
 *     Yarn and pnpm do not run scripts with that name (verified with npm 11), and scanners
 *     only look at `preinstall`, `install` and `postinstall`.
 * To switch, add pinst as a devDependency (with its entry in `package.json.md`), update the
 * `prepack` and `postpack` scripts above, and delete this file.
 */
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
