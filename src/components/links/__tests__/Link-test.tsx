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
import { render, renderWithMemoryRouter } from '~common/helpers/test-utils';
import { Link } from '..';
import { Tooltip } from '../../tooltip';

describe('Link', () => {
  it('should remove focus after link is clicked', async () => {
    const { user, container } = renderWithMemoryRouter(
      <Link enableBlurAfterClick to="/initial">
        Test
      </Link>,
    );

    await user.click(screen.getByRole('link'));

    expect(screen.getByRole('link')).not.toHaveFocus();
    await expect(container).toHaveNoA11yViolations();
  });

  it('should prevent default when preventDefault is true', async () => {
    const { user } = renderWithMemoryRouter(
      <Link enablePreventDefault to="/second">
        Test
      </Link>,
    );

    expect(screen.getByText('/initial')).toBeVisible();

    await user.click(screen.getByRole('link'));

    // prevent default behavior of page navigation
    expect(screen.getByText('/initial')).toBeVisible();
    expect(screen.queryByText('/second')).not.toBeInTheDocument();
  });

  it('should stop propagation when stopPropagation is true', async () => {
    const buttonOnClick = jest.fn();

    const { user } = renderWithMemoryRouter(
      <button onClick={buttonOnClick} type="button">
        <Link enableStopPropagation to="/second">
          Test
        </Link>
      </button>,
    );

    await user.click(screen.getByRole('link'));

    expect(buttonOnClick).not.toHaveBeenCalled();
  });

  it('should add noreferrer nofollow when link should open in new tab', () => {
    renderWithMemoryRouter(
      <Link enableOpenInNewTab to="https://google.com">
        external link
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer nofollow');
  });

  it('should not add noreferrer nofollow when link is a sonar link', () => {
    renderWithMemoryRouter(
      <Link enableOpenInNewTab to="https://blog.sonarsource.com">
        external link
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener');
  });

  it('should call onClick when one is passed', async () => {
    const onClick = jest.fn();
    const { user } = renderWithMemoryRouter(
      <Link enableStopPropagation onClick={onClick} to="/second">
        Test
      </Link>,
    );

    await user.click(screen.getByRole('link'));

    expect(onClick).toHaveBeenCalled();
  });

  it('internal link should be clickable', async () => {
    const { user } = renderWithMemoryRouter(<Link to="/second">internal link</Link>);
    expect(screen.getByRole('link')).toBeVisible();

    await user.click(screen.getByRole('link'));

    expect(screen.getByText('/second')).toBeVisible();
  });

  it('external links are indicated by additional text', async () => {
    const { container } = renderWithMemoryRouter(
      <Link enableOpenInNewTab to="https://google.com">
        external link
      </Link>,
    );
    expect(screen.getByRole('link')).toBeVisible();
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link')).toHaveTextContent('(opens in new tab)');
    await expect(container).toHaveNoA11yViolations();
  });

  it('should correctly support tooltips', async () => {
    const { user } = renderWithMemoryRouter(
      <Tooltip content="my tooltip">
        <Link to="/path">link</Link>
      </Tooltip>,
    );

    await user.hover(screen.getByRole('link'));
    expect(screen.getByRole('tooltip', { name: 'my tooltip' })).toBeInTheDocument();
  });
});

describe('Link as button', () => {
  it('should render as a button when there is no "to" prop', async () => {
    const onClick = jest.fn();
    const { user } = render(<Link onClick={onClick}>Button Link</Link>);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it("shouldn't have any a11y violation as a button", async () => {
    const onClick = jest.fn();
    const { container } = render(<Link onClick={onClick}>Button Link</Link>);
    await expect(container).toHaveNoA11yViolations();
  });
});
