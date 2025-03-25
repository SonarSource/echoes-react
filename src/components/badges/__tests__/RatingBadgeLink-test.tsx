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
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { render } from '~common/helpers/test-utils';
import { Tooltip } from '../../tooltip';
import { RatingBadgeRating } from '../RatingBadge';
import { RatingBadgeLink } from '../RatingBadgeLink';

describe('RatingBadgeLink', () => {
  it('renders a "Null" badge link by default', async () => {
    const { container } = setupWithMemoryRouter(<RatingBadgeLink to="a farm upsate" />);

    expect(screen.getByRole('link')).toBeVisible();
    expect(screen.getByText(RatingBadgeRating.Null)).toBeInTheDocument();
    await expect(container).toHaveNoA11yViolations();
  });

  it('correctly supports tooltips', async () => {
    const { user } = setupWithMemoryRouter(
      <Tooltip content="my tooltip">
        <RatingBadgeLink to="see the wizard" />
      </Tooltip>,
    );

    await user.hover(screen.getByRole('link'));

    expect(screen.getByRole('tooltip', { name: 'my tooltip' })).toBeInTheDocument();
  });
});

function ShowPath() {
  const { pathname } = useLocation();

  return <pre>{pathname}</pre>;
}

const setupWithMemoryRouter = (component: JSX.Element, initialEntries = ['/initial']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route
          element={
            <>
              {component}
              <ShowPath />
            </>
          }
          path="/initial"
        />

        <Route element={<ShowPath />} path="/second" />
      </Routes>
    </MemoryRouter>,
  );
};
