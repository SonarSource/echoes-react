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

import { Popover } from '../../popover';
import { MarginIndicator } from '../MarginIndicator';

describe('MarginIndicator', () => {
  it('renders as expected', async () => {
    const { container } = render(<MarginIndicator ariaLabel="indicator" indicatorType="covered" />);

    expect(screen.getByText('indicator')).toBeInTheDocument();
    await expect(container).toHaveNoA11yViolations();
  });

  it('can be interactive', async () => {
    const { container, user } = render(
      <Popover title="popover">
        <MarginIndicator
          ariaLabel="interactive indicator"
          indicatorType="duplication"
          isInteractive
        />
      </Popover>,
    );

    await expect(container).toHaveNoA11yViolations();

    const indicator = screen.getByLabelText('interactive indicator');

    await user.click(indicator);
    expect(screen.getByText('popover')).toBeInTheDocument();
  });
});
