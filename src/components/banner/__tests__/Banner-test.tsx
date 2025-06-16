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
import { screenReaderOnly } from '~common/helpers/styles';
import { render } from '~common/helpers/test-utils';
import { Link } from '../../links';
import { Banner } from '../Banner';
import { BannerProps, BannerType } from '../BannerTypes';

it('should display banner content', async () => {
  setupBanner({ children: 'Banner Content' });

  const banner = screen.getByRole('alert');
  expect(banner).toBeInTheDocument();
  expect(banner).toHaveTextContent('Information banner: Banner Content');
  expect(banner).toMatchSnapshot();

  await expect(banner).toHaveNoA11yViolations();
});

it.each([
  [BannerType.Danger, 'Error banner:'],
  [BannerType.Info, 'Information banner:'],
  [BannerType.Success, 'Success banner:'],
  [BannerType.Warning, 'Warning banner:'],
])('should render with the type %s and a default screenreader prefix', (type, expectedPrefix) => {
  setupBanner({ type });

  expect(screen.getByRole('alert')).toHaveTextContent(`${expectedPrefix} Default Banner Content`);

  expect(screen.getByText(expectedPrefix)).toHaveStyle(
    screenReaderOnly.styles.replace(/label:.*?;/, ''),
  );
});

it('should be dismissable', async () => {
  const onDismiss = jest.fn();
  const { container, user } = setupBanner({ onDismiss });

  await expect(container).toHaveNoA11yViolations();

  const dismissButton = screen.getByRole('button', { name: 'Dismiss' });
  expect(dismissButton).toBeInTheDocument();
  await user.click(dismissButton);

  expect(onDismiss).toHaveBeenCalled();
});

it('should not render dismiss button when onDismiss is not provided', () => {
  setupBanner();

  expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
});

it('should add custom screen reader prefix when provided', () => {
  setupBanner({
    screenReaderPrefix: 'Important:',
    children: 'Banner Message',
  });

  const alertElement = screen.getByRole('alert');
  expect(alertElement).toHaveTextContent('Important: Banner Message');
});

it('should correctly support Links in the banner content', async () => {
  const { user } = render(
    <MemoryRouter initialEntries={['/initial']}>
      <Routes>
        <Route
          element={
            <Banner type={BannerType.Info}>
              Banner with <Link to="/test">link</Link>
            </Banner>
          }
          path="/initial"
        />
        <Route element={<>Test page</>} path="/test" />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByRole('link', { name: 'link' })).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: 'link' }));
  expect(screen.getByText('Test page')).toBeInTheDocument();
});

function setupBanner({ children, ...props }: Partial<BannerProps> = {}) {
  return render(
    <Banner type={BannerType.Info} {...props}>
      {children ?? 'Default Banner Content'}
    </Banner>,
  );
}
