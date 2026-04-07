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
import { useShadowScroll } from '~common/helpers/useShadowScroll';
import { IconBranch } from '../../../icons';
import { SidebarNavigationBody } from '../SidebarNavigationBody';
import { SidebarNavigationItem } from '../SidebarNavigationItem';

vi.mock('~common/helpers/useShadowScroll', () => ({
  useShadowScroll: vi.fn(() => ({ showBottomShadow: false, showTopShadow: false })),
  BottomShadowScroll: vi.fn(() => <div>bottom-shadow</div>),
  TopShadowScroll: vi.fn(() => <div>top-shadow</div>),
}));

beforeEach(() => {
  vi.clearAllMocks();
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
  await expect(container).toHaveNoViolations();
});

it('should render with scroll shadows', () => {
  vi.mocked(useShadowScroll).mockReturnValue({ showBottomShadow: true, showTopShadow: true });

  renderWithMemoryRouter(
    <SidebarNavigationBody>
      <SidebarNavigationItem Icon={IconBranch} to="#">
        item1
      </SidebarNavigationItem>
    </SidebarNavigationBody>,
  );

  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getByText('bottom-shadow')).toBeInTheDocument();
  expect(screen.getByText('top-shadow')).toBeInTheDocument();
});
