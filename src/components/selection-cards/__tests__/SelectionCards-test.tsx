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
import { GroupAlignment } from '~types/GroupAlignment';
import { SelectionCards, SelectionCardsProps } from '../SelectionCards';

const DEFAULT_OPTIONS = [
  { label: 'a', value: '1' },
  { label: 'b', value: '2', helpText: 'helper text' },
  { label: 'c', value: '3' },
];

describe('SelectionCards', () => {
  it('should render a card for each option', async () => {
    const { container, user } = renderSelectionCards({});

    expect(screen.getAllByRole('radio')).toHaveLength(DEFAULT_OPTIONS.length);

    await user.click(screen.getByRole('radio', { name: 'b' }));

    expect(screen.getByRole('radio', { name: 'b' })).toBeChecked();
    await expect(container).toHaveNoA11yViolations();
  });

  it('should render a card for each option, horizontally', async () => {
    const { container } = renderSelectionCards({
      alignment: GroupAlignment.Horizontal,
    });

    expect(screen.getAllByRole('radio')).toHaveLength(DEFAULT_OPTIONS.length);

    await expect(container).toHaveNoA11yViolations();
  });

  it('should disable each card if the group is disabled', () => {
    renderSelectionCards({ isDisabled: true });

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(DEFAULT_OPTIONS.length);
    expect(radioButtons.filter((o) => o.hasAttribute('disabled'))).toHaveLength(
      DEFAULT_OPTIONS.length,
    );
  });

  it('should support arialabel', () => {
    renderSelectionCards({ ariaLabel: 'cool aria-label' });

    const radioGroup = screen.getByLabelText('cool aria-label');
    expect(radioGroup).toBeInTheDocument();
  });
});

function renderSelectionCards(overrides: Partial<SelectionCardsProps> = {}) {
  return render(
    <SelectionCards
      onChange={jest.fn()}
      options={DEFAULT_OPTIONS}
      value="2"
      {...overrides}
      {...{ ariaLabel: overrides.ariaLabel ?? 'radios', ariaLabelledBy: undefined }}
    />,
  );
}
