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
import { IconBug } from '../../../components/icons';
import { BadgeSeverity } from '../BadgeSeverity';

describe('BadgeSeverity', () => {
  it('renders as expected', () => {
    render(
      <BadgeSeverity
        ariaLabel="required aria-label"
        data-testid="badge"
        quality="Thing"
        severity="info"
      />,
    );

    expect(screen.getByText('Thing')).toBeInTheDocument();
  });

  it('assigns custom ariaLabel to button', () => {
    render(
      <BadgeSeverity
        IconLeft={IconBug}
        ariaLabel="custom label"
        className="custom class"
        quality="Quality"
        severity="high"
      />,
    );

    expect(screen.getByLabelText('custom label')).toBeInTheDocument();
    expect(screen.getByText('Quality')).toBeInTheDocument();
  });

  it("should show a loading state, it doesn't prevent clicking", () => {
    render(<BadgeSeverity ariaLabel="click me" isLoading quality="Some quality" severity="low" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'click me' })).toBeEnabled();
  });
});
