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
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useCallback, useState } from 'react';
import { IconPeople } from '../../src/components/icons';
import { SelectAsync, SelectOption } from '../../src/components/select';
import {
  formFieldsArgTypes,
  iconsElementsArgType,
  toDisabledControlArgType,
} from '../helpers/arg-types';

const meta: Meta<typeof SelectAsync> = {
  component: SelectAsync,
  title: 'Echoes/Select/SelectAsync',
  argTypes: {
    ...formFieldsArgTypes,
    valueIcon: iconsElementsArgType,
    ...toDisabledControlArgType('onChange', 'onOpen'),
  },
};

export default meta;

type Story = StoryObj<typeof SelectAsync>;

export const SimpleAsync: Story = {
  args: {},
  render: (args) => (
    <div>
      <Wrapper args={args} />
    </div>
  ),
};

export const WithCustomItemComponent: Story = {
  args: {},
  render: (args) => (
    <div>
      <Wrapper args={{ ...args, optionComponent: SelectItemComponent }} />
    </div>
  ),
};

const SEARCH_DELAY = 1000;

const data = [
  { value: 'o-cheese', label: 'cheese' },
  { value: 'o-bread', label: 'bread' },
  { value: 'o-salad', label: 'salad' },
  { value: 'o-no', label: 'oh, no!' },
];
interface Props {
  args: ComponentProps<typeof SelectAsync>;
}

function Wrapper({ args }: Props) {
  const [options, setOptions] = useState(data);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState<string>();

  const doSearch = useCallback(
    (q: string) => {
      setLoading(true);
      setTimeout(() => {
        setOptions(data.filter((d) => d.label.includes(q)));
        setLoading(false);
      }, SEARCH_DELAY);
    },
    [setLoading],
  );

  const doChange = useCallback(
    (selection: string | null) => {
      setSelection(selection ?? undefined);
    },
    [setSelection],
  );

  return (
    <div style={{ width: 600 }}>
      <SelectAsync
        {...args}
        data={options}
        isLoading={args.isLoading ?? loading}
        onChange={doChange}
        onSearch={doSearch}
        value={selection}
      />
      <br />
      <div>Selected: {selection ?? '- None -'}</div>
    </div>
  );
}

function SelectItemComponent({ label }: Readonly<SelectOption>) {
  return (
    <>
      <IconPeople />
      <span>{label}</span> <br />
      <span>This is an item!</span>
    </>
  );
}

SelectItemComponent.displayName = 'SelectItem';
