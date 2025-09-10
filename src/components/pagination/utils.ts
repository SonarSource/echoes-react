/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource SA
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

import { PaginationProps } from './PaginationTypes';

const ELLIPSIS_THRESHOLD = 5;
const VISIBLE_NEIGHBOR_DISTANCE = 2;

export function computePages({ page, totalPages }: Pick<PaginationProps, 'page' | 'totalPages'>) {
  const pages = [];

  // Compute the range of pages
  const start = page <= ELLIPSIS_THRESHOLD ? 1 : page - VISIBLE_NEIGHBOR_DISTANCE;

  const end =
    page > totalPages - ELLIPSIS_THRESHOLD ? totalPages : page + VISIBLE_NEIGHBOR_DISTANCE;

  // If we don't start at 1, add the first page and an ellipsis
  if (start !== 1) {
    pages.push(`${1}`, 'ellipsis-low');
  }

  // Add the range computed above
  for (let i = start; i <= end; i++) {
    pages.push(`${i}`);
  }

  // If we don't end at the total, add the last page and an ellipsis
  if (end !== totalPages) {
    pages.push('ellipsis-high', `${totalPages}`);
  }

  return pages;
}
