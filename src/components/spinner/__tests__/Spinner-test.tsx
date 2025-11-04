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
import { ComponentProps } from 'react';
import { render } from '~common/helpers/test-utils';
import { Tooltip } from '../../tooltip';
import { Spinner } from '../Spinner';

it('can be controlled by the isLoading prop', async () => {
  const { container, rerender } = setupSpinner({ isLoading: true });
  expect(screen.getByRole('status')).toBeVisible();
  expect(screen.getByRole('status')).toHaveTextContent('Loading...');
  await expect(container).toHaveNoA11yViolations();

  rerender({ isLoading: false });
  expect(screen.getByRole('status')).toBeVisible();
  expect(screen.getByRole('status')).not.toHaveTextContent('Loading...');
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  await expect(container).toHaveNoA11yViolations();
});

it('allows setting a custom label to the spinner', () => {
  const { rerender } = setupSpinner({ label: 'loading too many things...' });
  expect(screen.getByText('loading too many things...')).toBeVisible();

  rerender({ isLoading: false });
  expect(screen.queryByText('loading too many things...')).not.toBeInTheDocument();
});

it('allows setting a custom aria-label to the spinner', () => {
  const { rerender } = setupSpinner({ ariaLabel: 'loading too many things...' });
  expect(screen.getByText('loading too many things...')).toBeInTheDocument();

  rerender({ isLoading: false });
  expect(screen.queryByText('loading too many things...')).not.toBeInTheDocument();
});

it('shows the children when not loading', () => {
  const { rerender } = setupSpinner({ children: <div>My content</div> });
  expect(screen.getByText('Loading...')).toBeVisible();
  expect(screen.queryByText('My content')).not.toBeInTheDocument();

  rerender({ isLoading: false });
  expect(screen.getByText('My content')).toBeVisible();
});

it('should display a placeholder when not loading', async () => {
  const { container, rerender } = setupSpinner({ className: 'my-classname', hasPlaceholder: true });
  expect(screen.getByText('Loading...')).toBeVisible();

  rerender({ isLoading: false });

  // eslint-disable-next-line testing-library/no-node-access  -- this is purely visual element that isn't accessible
  expect(container.querySelector('.my-classname')).toBeInTheDocument();
  await expect(container).toHaveNoA11yViolations();
});

it('should correctly support tooltips', async () => {
  const { user } = render(
    <Tooltip content="my tooltip">
      <Spinner />
    </Tooltip>,
  );

  await user.hover(screen.getByRole('status'));
  expect(screen.getByRole('tooltip', { name: 'my tooltip' })).toBeInTheDocument();
});

function setupSpinner(props: Partial<ComponentProps<typeof Spinner>> = {}) {
  const { rerender: rtlRerender, ...rest } = render(<Spinner {...props} />);
  return {
    rerender(override?: Partial<ComponentProps<typeof Spinner>>) {
      rtlRerender(<Spinner {...props} {...override} />);
    },
    ...rest,
  };
}
