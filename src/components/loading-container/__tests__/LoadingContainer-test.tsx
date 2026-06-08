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

import { screen } from '@testing-library/react';
import { render } from '~common/helpers/test-utils';
import { LoadingContainer } from '..';

it.each([
  ['loading', { isLoading: true }, 'true', 'Loading content'],
  ['not loading', { isLoading: false }, 'false', 'Content loaded'],
  [
    'loading (overriden text)',
    { isLoading: true, loadingMessage: 'Loading your favorite color' },
    'true',
    'Loading your favorite color',
  ],
  ['not loading (overriden text)', { isLoading: false, loadedMessage: 'done' }, 'false', 'done'],
])('should render correctly when %s', async (_, args, ariaBusy, expectedText) => {
  const { container } = render(<LoadingContainer {...args}>contents</LoadingContainer>);

  await expect(container).toHaveNoA11yViolations();

  expect(screen.getByText('contents')).toHaveAttribute('aria-busy', ariaBusy);
  expect(screen.getByText(expectedText)).toBeInTheDocument();
});
