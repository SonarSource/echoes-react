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
import { ToggleButtonGroup, ToggleButtonGroupProps } from '../ToggleButtonGroup';

const DEFAULT_OPTIONS: ToggleButtonGroupProps['options'] = [
  { label: 'a', value: '1' },
  { label: 'b', value: '2' },
  { label: 'c', value: '3' },
];

describe('RadioButtonGroup', () => {
  it('should render a button for each option', async () => {
    const onChange = jest.fn();
    const { container, user } = renderToggleButtonGroup({ onChange });

    expect(screen.getAllByRole('radio')).toHaveLength(DEFAULT_OPTIONS.length);

    await user.click(screen.getByRole('radio', { name: 'b' }));

    expect(onChange).toHaveBeenCalledWith('2');
    await expect(container).toHaveNoA11yViolations();

    onChange.mockClear();
    await user.click(screen.getByRole('radio', { name: 'a' }));

    expect(onChange).not.toHaveBeenCalled();
  });
});

function renderToggleButtonGroup(overrides: Partial<ToggleButtonGroupProps> = {}) {
  return render(
    <ToggleButtonGroup
      onChange={jest.fn()}
      options={DEFAULT_OPTIONS}
      selected="1"
      {...overrides}
    />,
  );
}
