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
import { Badge } from '../../../badges';
import { Button } from '../../../buttons';
import { SidebarNavigationFooterPromotionCard } from '../SidebarNavigationFooterPromotionCard';

it('should render correctly', async () => {
  const { container } = render(
    <SidebarNavigationFooterPromotionCard
      actions={<Button>action</Button>}
      headerText="title"
      text="description"
    />,
  );

  expect(screen.getByRole('heading')).toHaveTextContent('title');
  expect(screen.getByText('description')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'action' })).toBeInTheDocument();
  await expect(container).toHaveNoA11yViolations();
});

it('should render correctly with a badge', () => {
  render(
    <SidebarNavigationFooterPromotionCard
      actions={<Button>action</Button>}
      badge={<Badge variety="info">beta</Badge>}
      headerText="title"
      text="description"
    />,
  );

  expect(screen.getByText('beta')).toBeInTheDocument();
});
