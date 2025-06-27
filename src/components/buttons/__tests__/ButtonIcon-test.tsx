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
import { IconClock, IconPeople } from '../../icons';
import { ButtonIcon } from '../ButtonIcon';

describe('ButtonIcon', () => {
  it('should render and handle click', async () => {
    const onClick = jest.fn();
    const { user } = render(
      <ButtonIcon Icon={IconClock} ariaLabel="click the clock" onClick={onClick} />,
    );

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'click the clock' }));

    expect(onClick).toHaveBeenCalled();
  });

  it("should show a loading state, it doesn't prevent clicking", () => {
    render(
      <ButtonIcon
        Icon={IconPeople}
        ariaLabel="click this people button"
        isLoading
        tooltipContent="people button"
      />,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'click this people button' })).toBeEnabled();
  });

  it('should render with a tooltip', async () => {
    const { user } = render(
      <ButtonIcon
        Icon={IconPeople}
        ariaLabel="click this people button"
        tooltipContent="people button"
      />,
    );

    expect(screen.getByRole('button', { name: 'click this people button' })).toBeInTheDocument();
    await user.hover(screen.getByRole('button', { name: 'click this people button' }));
    expect(screen.getByRole('tooltip', { name: 'people button' })).toBeInTheDocument();
  });
});

describe('Button as Link', () => {
  it('should render as a link when "to" prop is provided', () => {
    renderWithMemoryRouter(
      <ButtonIcon
        Icon={IconPeople}
        ariaLabel="click this people button"
        onClick={jest.fn()}
        to="/second"
        tooltipContent="people button"
      />,
    );

    expect(screen.getByRole('link', { name: 'click this people button' })).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should call onClick function and navigate when link is clicked', async () => {
    const onClick = jest.fn();
    const { user } = renderWithMemoryRouter(
      <ButtonIcon
        Icon={IconPeople}
        ariaLabel="click this people button"
        onClick={onClick}
        to="/second"
        tooltipContent="people button"
      />,
    );

    await user.click(screen.getByRole('link', { name: 'click this people button' }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByText('/second')).toBeInTheDocument();
  });
});
