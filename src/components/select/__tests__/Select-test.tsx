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
import { ComponentProps } from 'react';
import { OmitPropsWithLabels, render } from '~common/helpers/test-utils';
import { Select, SelectOptionType } from '..';

describe('it should correctly handle the clearable state', () => {
  const clearLabel = 'Clear select field';
  it('should display the clearable button when the clearable prop is true and a value is selected', () => {
    const { rerender } = setupSelect({ ariaLabel: 'my-select', isNotClearable: false });

    expect(screen.queryByLabelText(clearLabel)).not.toBeInTheDocument();

    rerender({ value: '1' });
    expect(screen.getByLabelText(clearLabel)).toBeInTheDocument();
  });

  it('should display the loading spinner and not the clearable button when isLoading is set to true', () => {
    setupSelect({ ariaLabel: 'my-select', isNotClearable: false, isLoading: true, value: '1' });

    expect(screen.queryByLabelText(clearLabel)).not.toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should not display the clearable button is the field is required', () => {
    setupSelect({ ariaLabel: 'my-select', isNotClearable: false, isRequired: true, value: '1' });

    expect(screen.queryByLabelText(clearLabel)).not.toBeInTheDocument();
  });
});

it('should display options with radio style', async () => {
  const { user } = setupSelect({ ariaLabel: 'my-select', optionType: SelectOptionType.Radio });

  await user.click(screen.getByRole('combobox'));

  expect(screen.getAllByRole('option')).toHaveLength(3);
});

function setupSelect(props: OmitPropsWithLabels<typeof Select>) {
  const data = [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
  ];
  const { rerender: rtlRerender, ...rest } = render(
    <Select data={data} onChange={jest.fn()} value={undefined} {...props} />,
  );
  return {
    rerender(override: Partial<ComponentProps<typeof Select>>) {
      const newProps = { ...props, ...override } as OmitPropsWithLabels<typeof Select>;
      rtlRerender(<Select data={data} onChange={jest.fn()} value={undefined} {...newProps} />);
    },
    ...rest,
  };
}
