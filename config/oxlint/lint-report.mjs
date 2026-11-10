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

// Runs Oxlint and converts its diagnostics to the ESLint JSON format consumed by SonarQube.
// Keeping the existing report path, rule IDs, and source ranges lets Sonar track existing issues
// across the migration. Oxlint's UTF-8 byte offsets are converted to ESLint's UTF-16 columns.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { resolveInWorkspace, runOxlint } from './run-oxlint.mjs';
import { toEslintRuleId } from './rule-ids.mjs';

const { values, positionals: paths } = parseArgs({
  allowPositionals: true,
  options: { 'output-file': { type: 'string' } },
});

if (!values['output-file'] || paths.length === 0) {
  console.error('Usage: lint-report.mjs --output-file <report.json> <path...>');
  process.exit(2);
}

const outputFile = resolveInWorkspace(values['output-file']);
const oxlint = runOxlint(['--format', 'json'], paths, {
  encoding: 'utf8',
  maxBuffer: 1024 * 1024 * 1024,
  stdio: ['ignore', 'pipe', 'inherit'],
});

if (oxlint.error || oxlint.status > 1) {
  console.error(oxlint.error ?? oxlint.stdout);
  process.exit(oxlint.status || 2);
}

const { diagnostics } = JSON.parse(oxlint.stdout);
const sources = new Map();

function getLineStarts(source) {
  const lineStarts = [0];
  for (let index = 0; index < source.length; index++) {
    if (source[index] === 0x0a) {
      lineStarts.push(index + 1);
    }
  }
  return lineStarts;
}

function getSource(filePath) {
  if (!sources.has(filePath)) {
    const source = readFileSync(filePath);
    sources.set(filePath, { source, lineStarts: getLineStarts(source) });
  }
  return sources.get(filePath);
}

function toPosition(filePath, byteOffset) {
  const { source, lineStarts } = getSource(filePath);
  let low = 0;
  let high = lineStarts.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (lineStarts[middle] <= byteOffset) {
      low = middle;
    } else {
      high = middle - 1;
    }
  }
  return {
    line: low + 1,
    column: source.subarray(lineStarts[low], byteOffset).toString('utf8').length + 1,
  };
}

const results = new Map();

for (const diagnostic of diagnostics) {
  const filePath = resolve(diagnostic.filename);
  const span = diagnostic.labels?.[0]?.span;
  const start = span ? toPosition(filePath, span.offset) : { line: 1, column: 1 };
  const end = span ? toPosition(filePath, span.offset + span.length) : start;

  if (!results.has(filePath)) {
    results.set(filePath, { filePath, messages: [], errorCount: 0, warningCount: 0 });
  }

  const result = results.get(filePath);
  const severity = diagnostic.severity === 'error' ? 2 : 1;
  result.messages.push({
    ruleId: toEslintRuleId(diagnostic.code),
    severity,
    message: diagnostic.message,
    line: start.line,
    column: start.column,
    endLine: end.line,
    endColumn: end.column,
  });
  result[severity === 2 ? 'errorCount' : 'warningCount'] += 1;
}

const report = [...results.values()].sort((a, b) => a.filePath.localeCompare(b.filePath));
mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(outputFile, JSON.stringify(report));

process.exitCode = report.some(({ errorCount }) => errorCount > 0) ? 1 : 0;
