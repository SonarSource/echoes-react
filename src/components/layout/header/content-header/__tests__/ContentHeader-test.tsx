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
import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { ContentHeader } from '../..';

it('should display a ContentHeader properly', async () => {
  const { container } = renderWithMemoryRouter(
    <ContentHeader title={<ContentHeader.Title>Awesome content header</ContentHeader.Title>} />,
  );

  await expect(container).toHaveNoA11yViolations();
});

describe('isLoading', () => {
  it.each([
    ['loading', { isLoading: true }, 'true', 'Loading page header'],
    ['not loading', { isLoading: false }, 'false', 'Page header loaded'],
    [
      'loading (custom message)',
      { isLoading: true, loadingMessage: 'Fetching data' },
      'true',
      'Fetching data',
    ],
    [
      'not loading (custom message)',
      { isLoading: false, loadedMessage: 'All done' },
      'false',
      'All done',
    ],
  ])('should render correctly when %s', async (_, args, ariaBusy, expectedText) => {
    const { container } = renderWithMemoryRouter(
      <ContentHeader
        title={<ContentHeader.Title>Awesome content header</ContentHeader.Title>}
        {...args}
      />,
    );

    await expect(container).toHaveNoA11yViolations();

    expect(screen.getByRole('banner')).toHaveAttribute('aria-busy', ariaBusy);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
