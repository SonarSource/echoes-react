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

import { screen } from '@testing-library/react';
import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { BreadcrumbLink } from '../BreadcrumbLink';

it('should truncate long links when hasEllipsis', () => {
  renderWithMemoryRouter(
    <BreadcrumbLink
      hasEllipsis
      linkElement="A long breadcrumb link with an ellipsis because it overflows the max width"
      to="/path"
    />,
  );

  expect(
    screen.getByRole('link', {
      name: 'A long breadcrumb link with an ellipsis because it overflows the max width',
    }),
  ).toHaveProperty('title');
});
