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
import { Navbar } from '..';
import { render } from '~common/helpers/test-utils';

describe('Navbar', () => {
  it('should render children inside the Navbar', () => {
    render(
      <Navbar>
        <div>Test</div>
      </Navbar>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render Navbar.Primary content and Navbar.Secondary content', () => {
    render(
      <Navbar>
        <Navbar.Primary>
          <div>Left Content</div>
        </Navbar.Primary>
        <Navbar.Secondary>
          <div>Right Content</div>
        </Navbar.Secondary>
      </Navbar>,
    );

    expect(screen.getByText('Left Content')).toBeInTheDocument();
    expect(screen.getByText('Right Content')).toBeInTheDocument();
  });
});
