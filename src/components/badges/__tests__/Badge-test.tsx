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
import { IconStar } from '../../icons';
import { Popover } from '../../popover';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders as expected', () => {
    render(
      <Badge data-testid="badge" variety="info">
        badger
      </Badge>,
    );

    expect(screen.getByText('badger')).toBeInTheDocument();
  });

  it('accepts custom className props', () => {
    render(
      <Badge
        IconLeft={IconStar}
        className="custom class"
        isHighContrast
        isIconFilled
        size="medium"
        variety="danger">
        watch out!
      </Badge>,
    );

    const badge = screen.getByText('watch out!');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('custom class');
  });

  it('can be interactive', async () => {
    const { user } = render(
      <Popover title="popover">
        <Badge ariaLabel="custom label" isInteractive size="small" variety="success">
          click me
        </Badge>
      </Popover>,
    );

    const badge = screen.getByText('click me');

    expect(badge).toHaveAttribute('aria-label', 'custom label');

    await user.click(badge);
    expect(screen.getByText('popover')).toBeInTheDocument();
  });
});
