/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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

import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useCallback, useState } from 'react';
import { Select } from '../src';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Select',
};

export default meta;

type Story = StoryObj<typeof Select>;

const data = [
  { value: '1', label: 'cheese' },
  { value: '2', label: 'bread' },
  { value: '3', label: 'salad' },
  { value: '4', label: 'no' },
];

export const Default: Story = {
  args: {
    data,
    isSearchable: true,
    onSearchChange: undefined,
  },
};

export const AsyncSearch: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: 300 }}>
      <Wrapper args={args} />
    </div>
  ),
};

interface Props {
  args: ComponentProps<typeof Select>;
}

function Wrapper({ args }: Props) {
  const [options, setOptions] = useState(data);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(
    (q: string) => {
      setSearchValue(q);
      console.log('searching', q, searchValue, value);
      if (!loading && q !== searchValue) {
        setLoading(true);
        setTimeout(() => {
          setOptions(data.filter((d) => d.label.includes(q)));
          setLoading(false);
        }, 2000);
      }
    },
    [data, loading],
  );

  const onChange = useCallback((v) => {
    console.log('value change', v);
    setValue(v);
  }, []);

  return (
    <div style={{ width: 300 }}>
      <Select
        {...args}
        data={options}
        isLoading={loading}
        isSearchable
        onChange={onChange}
        onSearchChange={doSearch}
        searchValue={searchValue}
        value={value}
      />
    </div>
  );
}
