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
import { useState } from 'react';
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
  });

  it('should not react to clicking the selected option', async () => {
    const onChange = jest.fn();
    const { user } = renderToggleButtonGroup({ onChange });

    await user.click(screen.getByRole('radio', { name: 'a' }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not react to clicking when disabled', async () => {
    const onChange = jest.fn();
    const { user } = renderToggleButtonGroup({ isDisabled: true, onChange });

    await user.click(screen.getByRole('radio', { name: 'b' }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should still visually select an option that has a tooltip when clicked', async () => {
    const { user } = render(
      <ControlledToggleButtonGroup
        options={[...DEFAULT_OPTIONS, { label: 'd', tooltip: 'd tooltip', value: '4' }]}
      />,
    );

    await user.click(screen.getByRole('radio', { name: 'd' }));

    expect(screen.getByRole('radio', { name: 'd' })).toBeChecked();
  });

  it('should show a tooltip when hovering an option that has one', async () => {
    const { container, user } = renderToggleButtonGroup({
      options: [...DEFAULT_OPTIONS, { label: 'd', tooltip: 'd tooltip', value: '4' }],
    });

    expect(screen.queryByRole('tooltip', { name: 'd tooltip' })).not.toBeInTheDocument();

    await user.hover(screen.getByText('d'));

    expect(await screen.findByRole('tooltip', { name: 'd tooltip' })).toBeInTheDocument();
    await expect(container).toHaveNoA11yViolations();
  });

  it('should show a tooltip when focusing an option that has one via keyboard', async () => {
    const { user } = renderToggleButtonGroup({
      options: [...DEFAULT_OPTIONS, { label: 'd', tooltip: 'd tooltip', value: '4' }],
    });

    expect(screen.queryByRole('tooltip', { name: 'd tooltip' })).not.toBeInTheDocument();

    await user.tab(); // focuses the selected radio ('a')
    await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}'); // roving-focus to 'd'

    expect(screen.getByRole('radio', { name: 'd' })).toHaveFocus();
    expect(await screen.findByRole('tooltip', { name: 'd tooltip' })).toBeInTheDocument();
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

function ControlledToggleButtonGroup({ options }: Pick<ToggleButtonGroupProps, 'options'>) {
  const [selected, setSelected] = useState('1');

  return <ToggleButtonGroup onChange={setSelected} options={options} selected={selected} />;
}
