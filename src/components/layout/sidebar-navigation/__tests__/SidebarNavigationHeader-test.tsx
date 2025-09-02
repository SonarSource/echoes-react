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
import { render } from '~common/helpers/test-utils';
import { useIsOverflow } from '~common/helpers/useIsOverflow';
import { SidebarNavigationHeader } from '../SidebarNavigationHeader';

// Mock the useIsOverflow hook
jest.mock('~common/helpers/useIsOverflow', () => ({
  useIsOverflow: jest.fn().mockReturnValue([false]),
}));

it('should render correctly', async () => {
  const { container } = render(<SidebarNavigationHeader name="main text" />);

  expect(screen.getByText('main text')).toBeInTheDocument();

  await expect(container).toHaveNoA11yViolations();
});

it('should render with an avatar and subtext', async () => {
  const { container } = render(
    <SidebarNavigationHeader avatar={<img alt="avatar" />} name="main text" qualifier="subtext" />,
  );

  expect(screen.getByText('main text')).toBeInTheDocument();
  expect(screen.getByText('subtext')).toBeInTheDocument();
  expect(screen.getByAltText('avatar')).toBeInTheDocument();

  await expect(container).toHaveNoA11yViolations();
});

describe('Ellipsis behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show tooltip when content is overflowing', async () => {
    jest.mocked(useIsOverflow).mockReturnValueOnce([true]);
    const { user } = render(<SidebarNavigationHeader isInteractive name="main text" />);

    await user.hover(screen.getByRole('button'));
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('main text');
  });

  it('should not show tooltip when content is not overflowing', async () => {
    const { user } = render(<SidebarNavigationHeader isInteractive name="main text" />);

    await user.hover(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('should not show tooltip when header is not interactive', async () => {
    jest.mocked(useIsOverflow).mockReturnValueOnce([true]);
    const { user } = render(<SidebarNavigationHeader name="main text" />);

    await user.hover(screen.getByText('main text'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
