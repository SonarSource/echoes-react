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

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { toEslintRuleId } from '../rule-ids.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const HEADER = readFileSync(join(ROOT, 'config/license/LICENSE-HEADER.txt'), 'utf8');

test('preserves legacy rule IDs for native and JS plugin rules', () => {
  for (const [code, expected] of [
    ['eslint(no-console)', 'no-console'],
    ['eslint-js(consistent-this)', 'consistent-this'],
    ['react-js(jsx-sort-props)', 'react/jsx-sort-props'],
    ['react(exhaustive-deps)', 'react-hooks/exhaustive-deps'],
    ['react(rules-of-hooks)', 'react-hooks/rules-of-hooks'],
    ['eslint(no-useless-constructor)', '@typescript-eslint/no-useless-constructor'],
    ['jsx-a11y(anchor-has-content)', 'jsx-a11y/anchor-has-content'],
    ['header(header)', 'header/header'],
    [undefined, null],
  ]) {
    assert.equal(toEslintRuleId(code), expected);
  }
});

test('writes Sonar-compatible reports with UTF-16 positions and error exit codes', () => {
  const directory = mkdtempSync(join(ROOT, 'oxlint-fixture-'));
  const filePath = join(directory, 'fixture.tsx');
  const outputFile = join(directory, 'reports/lint.json');

  function run(source) {
    writeFileSync(filePath, HEADER + source);
    const result = spawnSync(
      process.execPath,
      ['config/oxlint/lint-report.mjs', '--output-file', outputFile, filePath],
      { cwd: ROOT, encoding: 'utf8' },
    );
    assert.equal(result.error, undefined);
    assert.equal(result.stderr, '');
    return { status: result.status, report: JSON.parse(readFileSync(outputFile, 'utf8')) };
  }

  try {
    const source = "\nconst value = 'é😀'; console.log(value);\n";
    const errors = run(source);
    assert.equal(errors.status, 1);
    assert.equal(errors.report[0].filePath, filePath);
    const message = errors.report[0].messages.find(({ ruleId }) => ruleId === 'no-console');
    assert.ok(message);
    assert.equal(message.severity, 2);
    assert.equal(message.line, (HEADER + source).split('\n').length - 1);
    assert.equal(message.column, source.split('\n')[1].indexOf('console') + 1);
    assert.ok(message.endColumn > message.column);

    const warnings = run('\nexport function Fixture() { return <a />; }\n');
    assert.equal(warnings.status, 0);
    assert.equal(warnings.report[0].errorCount, 0);
    assert.equal(warnings.report[0].warningCount, 1);
    assert.equal(warnings.report[0].messages[0].ruleId, 'jsx-a11y/anchor-has-content');
    assert.equal(warnings.report[0].messages[0].severity, 1);

    const plugin = run(
      '\nexport function Fixture() { return <button type="button" title="é😀" disabled />; }\n',
    );
    assert.equal(plugin.status, 1);
    assert.ok(plugin.report[0].messages.some(({ ruleId }) => ruleId === 'react/jsx-sort-props'));

    const clean = run('\nexport const value = 1;\n');
    assert.equal(clean.status, 0);
    assert.deepEqual(clean.report, []);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
