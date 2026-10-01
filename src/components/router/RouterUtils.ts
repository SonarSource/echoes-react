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

import { LinkTo } from './RouterTypes';

/** @internal */
export function toHref(to: LinkTo): string {
  if (typeof to === 'string') {
    return to;
  }

  return `${to.pathname ?? ''}${withPrefix('?', to.search)}${withPrefix('#', to.hash)}`;
}

// Same normalization as react-router's createPath.
function withPrefix(prefix: '?' | '#', value: string | undefined) {
  if (!value || value === prefix) {
    return '';
  }

  return value.startsWith(prefix) ? value : `${prefix}${value}`;
}

/** @internal */
export interface PathActiveOptions {
  /**
   * Only match the exact path. Otherwise the path also matches its descendants.
   * @defaultValue false
   */
  end?: boolean;
}

/**
 * Mirrors react-router's NavLink matching: case-insensitive, trailing-slash tolerant, segment-based
 * prefix matching. Relative and search-only destinations never match.
 * @internal
 */
export function isPathActive(
  currentPathname: string,
  to: LinkTo,
  { end = false }: PathActiveOptions = {},
): boolean {
  const target = getPathname(to);

  if (!target?.startsWith('/')) {
    return false;
  }

  const normalizedTarget = normalizePathname(target);
  const normalizedCurrent = normalizePathname(currentPathname);

  if (normalizedCurrent === normalizedTarget) {
    return true;
  }

  if (end) {
    return false;
  }

  return normalizedTarget === '/' || normalizedCurrent.startsWith(`${normalizedTarget}/`);
}

function getPathname(to: LinkTo): string | undefined {
  if (typeof to === 'string') {
    return to.split(/[?#]/)[0];
  }

  return to.pathname;
}

function normalizePathname(pathname: string) {
  let end = pathname.length;

  // Strip trailing slashes but keep the root `/`.
  while (end > 1 && pathname[end - 1] === '/') {
    end--;
  }

  return pathname.slice(0, end).toLowerCase();
}
