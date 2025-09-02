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
import { useBottomShadowScroll } from '~common/helpers/useBottomShadowScroll';
import { IconBranch } from '../../../icons';
import { SidebarNavigationBody } from '../SidebarNavigationBody';
import { SidebarNavigationItem } from '../SidebarNavigationItem';

jest.mock('~common/helpers/useBottomShadowScroll', () => ({
  useBottomShadowScroll: jest.fn(() => [false]),
  BottomShadowScroll: jest.fn(() => <div>bottom-shadow</div>),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it('should render correctly', async () => {
  const { container } = renderWithMemoryRouter(
    <SidebarNavigationBody>
      <SidebarNavigationItem Icon={IconBranch} to="#">
        item1
      </SidebarNavigationItem>
    </SidebarNavigationBody>,
  );

  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByRole('link')).toBeInTheDocument();
  expect(screen.queryByText('bottom-shadow')).not.toBeInTheDocument();
  await expect(container).toHaveNoA11yViolations();
});

it('should render with a bottom scroll shadow', () => {
  jest.mocked(useBottomShadowScroll).mockReturnValue([true]);

  renderWithMemoryRouter(
    <SidebarNavigationBody>
      <SidebarNavigationItem Icon={IconBranch} to="#">
        item1
      </SidebarNavigationItem>
    </SidebarNavigationBody>,
  );

  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getByText('bottom-shadow')).toBeInTheDocument();
});
