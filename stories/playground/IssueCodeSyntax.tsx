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

import styled from '@emotion/styled';
import { Fragment } from 'react';
import { cssVar } from '../../src';

type CodeTokenKind = 'comment' | 'keyword' | 'number' | 'string' | 'type';

const CODE_TOKEN_PATTERN =
  /(\/\/.*$|\/\*.*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b(?:async|await|break|case|catch|class|const|continue|default|do|else|export|extends|false|finally|for|from|function|if|import|in|instanceof|let|new|null|return|switch|throw|true|try|typeof|undefined|var|while|yield)\b|\b(?:boolean|Error|Issue|number|Promise|string|unknown|void)\b|\b\d+(?:\.\d+)?\b)/g;

const KEYWORDS = new Set([
  'async',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'default',
  'do',
  'else',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'from',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'let',
  'new',
  'null',
  'return',
  'switch',
  'throw',
  'true',
  'try',
  'typeof',
  'undefined',
  'var',
  'while',
  'yield',
]);

const TYPE_NAMES = new Set([
  'boolean',
  'Error',
  'Issue',
  'number',
  'Promise',
  'string',
  'unknown',
  'void',
]);

function getTokenKind(token: string): CodeTokenKind {
  if (token.startsWith('//') || token.startsWith('/*')) {
    return 'comment';
  }

  if (token.startsWith("'") || token.startsWith('"') || token.startsWith('`')) {
    return 'string';
  }

  if (KEYWORDS.has(token)) {
    return 'keyword';
  }

  if (TYPE_NAMES.has(token)) {
    return 'type';
  }

  return 'number';
}

export function IssueCodeSyntax({ code }: Readonly<{ code: string }>) {
  const matches = Array.from(code.matchAll(CODE_TOKEN_PATTERN));
  let cursor = 0;

  return (
    <>
      {matches.map((match) => {
        const token = match[0];
        const start = match.index ?? 0;
        const prefix = code.slice(cursor, start);
        cursor = start + token.length;

        return (
          <Fragment key={`${start}-${token}`}>
            {prefix}
            <CodeToken $kind={getTokenKind(token)} data-code-token>
              {token}
            </CodeToken>
          </Fragment>
        );
      })}
      {code.slice(cursor)}
    </>
  );
}

IssueCodeSyntax.displayName = 'IssueCodeSyntax';

const CODE_TOKEN_COLORS: Record<CodeTokenKind, string> = {
  comment: cssVar('color-text-success'),
  keyword: cssVar('color-text-accent'),
  number: cssVar('color-text-info'),
  string: cssVar('color-text-danger'),
  type: cssVar('color-dataviz-mint-fill-default'),
};

const CodeToken = styled.span<{ $kind: CodeTokenKind }>`
  color: ${({ $kind }) => CODE_TOKEN_COLORS[$kind]};
`;

CodeToken.displayName = 'CodeToken';
