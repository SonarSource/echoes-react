/*
 * Echoes React
 * Copyright (C) 2023-2023 SonarSource SA
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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioButtonGroup } from '../RadioButtonGroup';

describe('RadioButtonGroup', () => {
  it('should render a radio button for each option', async () => {
    const user = userEvent.setup();

    const options = [
      { label: 'a', value: '1' },
      { label: 'b', value: '2' },
      { label: 'c', value: '3' },
    ];

    const { container } = renderRadioButtonGroup({ options });

    expect(screen.getAllByRole('radio')).toHaveLength(options.length);

    await user.click(screen.getByRole('radio', { name: 'b' }));

    expect(screen.getByRole('radio', { name: 'b' })).toBeChecked();
    expect(container).toHaveNoA11yViolations();
  });
});

function renderRadioButtonGroup(
  overrides: Partial<React.ComponentProps<typeof RadioButtonGroup>> = {},
) {
  const options = [
    { label: 'a', value: '1' },
    { label: 'b', value: '2' },
    { label: 'c', value: '3' },
  ];

  return render(<RadioButtonGroup id="group1" options={options} {...overrides} />);
}
