/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { Link } from '..';

it('should remove focus after link is clicked', async () => {
  const { user, container } = setupWithMemoryRouter(
    <Link shouldBlurAfterClick to="/initial">
      Test
    </Link>,
  );

  await user.click(screen.getByRole('link'));

  expect(screen.getByRole('link')).not.toHaveFocus();
  await expect(container).toHaveNoA11yViolations();
});

it('should prevent default when preventDefault is true', async () => {
  const { user } = setupWithMemoryRouter(
    <Link shouldPreventDefault to="/second">
      Test
    </Link>,
  );

  expect(screen.getByText('/initial')).toBeVisible();

  await user.click(screen.getByRole('link'));

  // prevent default behavior of page navigation
  expect(screen.getByText('/initial')).toBeVisible();
  expect(screen.queryByText('/second')).not.toBeInTheDocument();
});

it('should stop propagation when stopPropagation is true', async () => {
  const buttonOnClick = jest.fn();

  const { user } = setupWithMemoryRouter(
    <button onClick={buttonOnClick} type="button">
      <Link shouldStopPropagation to="/second">
        Test
      </Link>
    </button>,
  );

  await user.click(screen.getByRole('link'));

  expect(buttonOnClick).not.toHaveBeenCalled();
});

it('should add noreferrer nofollow when link is not a sonar link', () => {
  setupWithMemoryRouter(<Link to="https://google.com">external link</Link>);
  expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer nofollow');
});

it('should not add noreferrer nofollow when link is a sonar link', () => {
  setupWithMemoryRouter(<Link to="https://blog.sonarsource.com">external link</Link>);
  expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener');
});

it('should call onClick when one is passed', async () => {
  const onClick = jest.fn();
  const { user } = setupWithMemoryRouter(
    <Link onClick={onClick} shouldStopPropagation to="/second">
      Test
    </Link>,
  );

  await user.click(screen.getByRole('link'));

  expect(onClick).toHaveBeenCalled();
});

it('internal link should be clickable', async () => {
  const { user } = setupWithMemoryRouter(<Link to="/second">internal link</Link>);
  expect(screen.getByRole('link')).toBeVisible();

  await user.click(screen.getByRole('link'));

  expect(screen.getByText('/second')).toBeVisible();
});

it('external links are indicated by additional text', async () => {
  const { container } = setupWithMemoryRouter(<Link to="https://google.com">external link</Link>);
  expect(screen.getByRole('link')).toBeVisible();
  expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  expect(screen.getByRole('link')).toHaveTextContent('(opens in new tab)');
  await expect(container).toHaveNoA11yViolations();
});

it('should override target if passed as a prop for external link', () => {
  const onClick = jest.fn();
  setupWithMemoryRouter(
    <Link onClick={onClick} target="_self" to="https://google.com">
      Test
    </Link>,
  );

  expect(screen.getByRole('link')).toHaveAttribute('target', '_self');
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
