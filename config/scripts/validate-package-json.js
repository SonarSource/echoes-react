/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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

// Validate that only the exact version of each dependency is installed in "package.json".
import fs from 'fs';

const packageJsonFile = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { dependencies, devDependencies, peerDependencies } = packageJsonFile;

const dependenciesArray = Object.entries(dependencies);
const devDependenciesArray = Object.entries(devDependencies);
const peerDependenciesArray = Object.entries(peerDependencies);

let hasError = false;
const violatingDependencies = [...dependenciesArray, ...devDependenciesArray].filter(
  ([id, version]) => /^[~><^]/.test(version),
);
if (violatingDependencies.length > 0) {
  console.error(`\nFollowing dependencies in "package.json" must be locked to an exact version:
${violatingDependencies.map(([id, version]) => ` - "${id}": "${version}"`).join('\n')}
`);
  hasError = true;
}

const violatingPeerDependencies = peerDependenciesArray.filter(([id, version]) =>
  /^\d/.test(version),
);
if (violatingPeerDependencies.length > 0) {
  console.error(`\nFollowing peer dependencies in "package.json" shouldn't be locked to an exact version, they should accept a wide range of versions:
${violatingPeerDependencies.map(([id, version]) => ` - "${id}": "${version}"`).join('\n')}
`);
  hasError = true;
}

if (hasError) {
  process.exit(1);
} else {
  console.log(`All dependencies in "package.json" are correctly defined.`);
  process.exit(0);
}
