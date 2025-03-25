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

import { render, screen } from '@testing-library/react';
import { RatingBadge, RatingBadgeRating, RatingBadgeSize } from '../RatingBadge';

describe('RatingBadge', () => {
  it('renders a "Null" badge by default', () => {
    render(<RatingBadge data-testid="badge" />);

    const badge = screen.getByTestId('badge');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('aria-label', RatingBadgeRating.Null);
    expect(screen.getByText(RatingBadgeRating.Null)).toBeInTheDocument();
  });

  it('accepts custom ariaLabel, className and style props', () => {
    render(
      <RatingBadge
        ariaLabel="custom label"
        className="custom class"
        data-testid="badge"
        rating={RatingBadgeRating.C}
        size={RatingBadgeSize.ExtraLarge}
        style={{ margin: '10px' }}
      />,
    );

    const badge = screen.getByTestId('badge');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('aria-label', 'custom label');
    expect(badge).toHaveClass('custom class');
    expect(badge).toHaveStyle('margin: 10px;');
    expect(screen.getByText(RatingBadgeRating.C)).toBeInTheDocument();
  });

  it('forwards ref to the root element', () => {
    const ref = jest.fn();

    render(<RatingBadge ref={ref} />);

    expect(ref).toHaveBeenCalled();
  });
});
