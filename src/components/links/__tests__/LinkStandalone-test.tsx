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
import { render, renderWithMemoryRouter } from '~common/helpers/test-utils';
import { LinkStandalone } from '..';
import { IconLink } from '../../icons';
import { Tooltip } from '../../tooltip';

describe('LinkStandalone', () => {
  it('should display LinkStandalone properly', async () => {
    const { container } = renderWithMemoryRouter(
      <LinkStandalone to="/path">standalone link</LinkStandalone>,
    );
    expect(screen.getByRole('link')).toBeVisible();
    await expect(container).toHaveNoA11yViolations();
  });

  it('should support a left icon', async () => {
    const { container } = renderWithMemoryRouter(
      <LinkStandalone iconLeft={<IconLink data-testid="link icon" />} to="/path">
        link with icon
      </LinkStandalone>,
    );
    expect(screen.getByRole('link')).toBeVisible();
    expect(screen.getByTestId('link icon')).toBeInTheDocument();
    await expect(container).toHaveNoA11yViolations();
  });

  it('should correctly support tooltips', async () => {
    const { user } = renderWithMemoryRouter(
      <Tooltip content="my tooltip">
        <LinkStandalone to="/path">link</LinkStandalone>
      </Tooltip>,
    );

    await user.hover(screen.getByRole('link'));
    expect(screen.getByRole('tooltip', { name: 'my tooltip' })).toBeInTheDocument();
  });
});

describe('LinkStandalone as button', () => {
  it('should render as a button when there is no "to" prop', async () => {
    const onClick = jest.fn();
    const { user } = render(<LinkStandalone onClick={onClick}>Button Link</LinkStandalone>);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
