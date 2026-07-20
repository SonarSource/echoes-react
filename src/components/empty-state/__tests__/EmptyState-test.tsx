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

import { createRef } from 'react';
import { screen } from '@testing-library/react';
import { render } from '~common/helpers/test-utils';
import { cssVar } from '~utils/design-tokens';
import { Button } from '../../buttons';
import { EmptyState, EmptyStateProps } from '../EmptyState';

describe('EmptyState', () => {
  it('renders the default structure accessibly', async () => {
    const { container } = renderEmptyState();

    expect(screen.getByRole('heading', { level: 2, name: 'No releases yet' })).toBeVisible();
    expect(
      screen.getByText('Versions will appear here once the first release is available.'),
    ).toBeVisible();

    expect(
      screen.getByText('Versions will appear here once the first release is available.', {
        selector: 'p',
      }),
    ).toBeVisible();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    await expect(container).toHaveNoA11yViolations();
  });

  it('renders action only', () => {
    renderEmptyState({
      action: <Button>View documentation</Button>,
    });

    expect(screen.getByRole('button', { name: 'View documentation' })).toBeVisible();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders link only', () => {
    renderEmptyState({
      link: <a href="/details">Learn more</a>,
    });

    expect(screen.getByRole('link', { name: 'Learn more' })).toBeVisible();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders both action and link', () => {
    renderEmptyState({
      action: <Button>View documentation</Button>,
      link: <a href="/details">Learn more</a>,
    });

    expect(screen.getByRole('button', { name: 'View documentation' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Learn more' })).toBeVisible();
  });

  it('preserves passed custom react nodes', () => {
    renderEmptyState({
      action: <button type="button">Retry</button>,
      graphic: <span data-testid="custom-graphic">icon</span>,
      link: <a href="/contact">Contact support</a>,
    });

    expect(screen.getByTestId('custom-graphic')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Contact support' })).toBeVisible();
  });

  it('applies the validated layout and sizing tokens', () => {
    renderEmptyState();

    const root = screen.getByTestId('empty-state');
    const graphicContent = screen.getByTestId('empty-state-graphic-content');
    const graphicWrapper = screen.getByTestId('empty-state-graphic-wrapper');

    expect(root).toHaveStyle({
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('dimension-space-300'),
      textAlign: 'center',
    });

    expect(graphicWrapper).toHaveStyle({
      'background-color': cssVar('color-background-neutral-subtle-default'),
      'border-radius': cssVar('border-radius-400'),
      height: cssVar('dimension-height-800'),
      padding: cssVar('dimension-space-0'),
      width: cssVar('dimension-width-400'),
    });

    expect(graphicContent).toHaveStyle({
      alignItems: 'center',
      display: 'flex',
      height: cssVar('dimension-height-600'),
      justifyContent: 'center',
      width: cssVar('dimension-width-300'),
    });
  });

  it('forwards the root ref', () => {
    const ref = createRef<HTMLDivElement>();

    renderEmptyState({ ref });

    expect(ref.current).toBe(screen.getByTestId('empty-state'));
  });
});

function renderEmptyState(overrides: Partial<EmptyStateProps> = {}) {
  return render(
    <EmptyState
      data-testid="empty-state"
      graphic={<svg data-testid="empty-state-graphic" />}
      heading="No releases yet"
      text="Versions will appear here once the first release is available."
      {...overrides}
    />,
  );
}
