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
import { FilterTag, FilterTagProps } from '../FilterTag';

function renderFilterTag(props: Partial<FilterTagProps> = {}) {
  return render(
    <FilterTag labelDismiss="Remove filter" onDismiss={jest.fn()} {...props}>
      {props.children ?? 'Severity'}
    </FilterTag>,
  );
}

describe('FilterTag', () => {
  it('renders the label and dismiss button', async () => {
    const { container } = renderFilterTag({ labelDismiss: 'Remove severity filter' });

    expect(screen.getByText('Severity')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove severity filter' })).toBeInTheDocument();
    await expect(container).toHaveNoA11yViolations();
  });

  it('calls onDismiss when the dismiss button is clicked', async () => {
    const onDismiss = jest.fn();
    const { user } = renderFilterTag({ onDismiss });

    await user.click(screen.getByRole('button', { name: 'Remove filter' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('activates the dismiss button via keyboard', async () => {
    const onDismiss = jest.fn();
    const { user } = renderFilterTag({ onDismiss });

    await user.tab();
    await user.keyboard('{Enter}');

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('disables the dismiss button when isDisabled is true', () => {
    renderFilterTag({ isDisabled: true });

    expect(screen.getByRole('button', { name: 'Remove filter' })).toBeDisabled();
  });

  it('forwards extra props to the root element', () => {
    renderFilterTag({ 'data-testid': 'my-tag' } as Partial<FilterTagProps>);

    expect(screen.getByTestId('my-tag')).toBeInTheDocument();
  });

  it('accepts a custom className', () => {
    renderFilterTag({ className: 'my-tag', 'data-testid': 'root' } as Partial<FilterTagProps>);

    expect(screen.getByTestId('root')).toHaveClass('my-tag');
  });
});
