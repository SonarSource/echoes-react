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

import { type IssueSeverity } from './IssueSeverityColors';

export interface IssueNavigationCodeLine {
  content: string;
  number: number;
}

export interface IssueNavigationData {
  assignee: string;
  attribute: string;
  code: ReadonlyArray<IssueNavigationCodeLine>;
  effort: string;
  file: string;
  fix: string;
  introduced: string;
  key: string;
  line: number;
  message: string;
  rule: string;
  ruleDescription: string;
  severity: IssueSeverity;
  severityLabel: string;
  status: string;
  tags: ReadonlyArray<string>;
  type: 'Maintainability' | 'Reliability' | 'Security';
  where: string;
  why: string;
}

const ISSUE_NAVIGATION_STORAGE_KEY = 'echoes-playground-selected-issue';

export function readIssueNavigationData(): IssueNavigationData | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    const storedValue = window.sessionStorage.getItem(ISSUE_NAVIGATION_STORAGE_KEY);

    if (storedValue === null) {
      return undefined;
    }

    const parsedValue: unknown = JSON.parse(storedValue);
    return isIssueNavigationData(parsedValue) ? parsedValue : undefined;
  } catch {
    return undefined;
  }
}

export function writeIssueNavigationData(issue: IssueNavigationData) {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(ISSUE_NAVIGATION_STORAGE_KEY, JSON.stringify(issue));
  }
}

function isIssueNavigationData(value: unknown): value is IssueNavigationData {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<IssueNavigationData>;
  return (
    typeof candidate.file === 'string' &&
    typeof candidate.key === 'string' &&
    typeof candidate.line === 'number' &&
    typeof candidate.message === 'string' &&
    typeof candidate.rule === 'string' &&
    Array.isArray(candidate.code)
  );
}
