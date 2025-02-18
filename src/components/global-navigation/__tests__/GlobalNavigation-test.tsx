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
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '~common/helpers/test-utils';
import { GlobalNavigation } from '..';
import { LogoSonarQubeCloud } from '../../logos';

describe('GlobalNavigation', () => {
  it('should render children inside the GlobalNavigation', () => {
    render(
      <GlobalNavigation>
        <div>Test</div>
      </GlobalNavigation>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render GlobalNavigation.Primary content and GlobalNavigation.Secondary content', () => {
    render(
      <GlobalNavigation>
        <GlobalNavigation.Primary>
          <div>Left Content</div>
        </GlobalNavigation.Primary>
        <GlobalNavigation.Secondary>
          <div>Right Content</div>
        </GlobalNavigation.Secondary>
      </GlobalNavigation>,
    );

    expect(screen.getByText('Left Content')).toBeInTheDocument();
    expect(screen.getByText('Right Content')).toBeInTheDocument();
  });
});

describe('GlobalNavigation.Home', () => {
  it('should render children inside the GlobalNavigation.Home', () => {
    setupWithMemoryRouter(
      <GlobalNavigation>
        <GlobalNavigation.Primary>
          <GlobalNavigation.Home>
            <div>Test</div>
          </GlobalNavigation.Home>
        </GlobalNavigation.Primary>
      </GlobalNavigation>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should navigate to the home page when GlobalNavigation.Home is clicked', async () => {
    const { user } = setupWithMemoryRouter(
      <Routes>
        <Route element={<div>Home Page</div>} path="/" />
        <Route
          element={
            <GlobalNavigation>
              <GlobalNavigation.Primary>
                <GlobalNavigation.Home>
                  <LogoSonarQubeCloud />
                </GlobalNavigation.Home>
              </GlobalNavigation.Primary>
            </GlobalNavigation>
          }
          path="/initial"
        />
      </Routes>,
    );

    await user.click(screen.getByRole('link', { name: /Link to home page/ }));
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});

const setupWithMemoryRouter = (children: React.ReactNode) => {
  return render(<MemoryRouter initialEntries={['/initial']}>{children}</MemoryRouter>);
};
