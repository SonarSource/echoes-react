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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FilterDropdown, FilterDropdownProps, FilterDropdownTrigger } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';
import { useFilterDropdownCategories } from './filter-dropdown-helpers';

const meta: Meta<typeof FilterDropdown> = {
  component: FilterDropdown,
  decorators: [basicWrapperDecorator],
  argTypes: {
    categories: { control: false },
    children: { control: false },
    onApply: { control: false },
    onCategorySelect: { control: false },
    onClear: { control: false },
    onClose: { control: false },
    onItemSelect: { control: false },
    onOpen: { control: false },
    ref: { control: false },
    selectedValues: { control: false },
  },
  title: 'Echoes Patterns/Filters/FilterDropdown',
};

export default meta;

type Story = StoryObj<typeof FilterDropdown>;

function FilterDropdownStory(props: Readonly<FilterDropdownProps>) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { categories, onCategorySelect } = useFilterDropdownCategories();

  return (
    <FilterDropdown
      {...props}
      categories={categories}
      onApply={setSelectedValues}
      onCategorySelect={onCategorySelect}
      onClear={() => setSelectedValues([])}
      selectedValues={selectedValues}>
      <FilterDropdownTrigger selectedCount={selectedValues.length}>Filters</FilterDropdownTrigger>
    </FilterDropdown>
  );
}

export const Default: Story = {
  render: (args) => <FilterDropdownStory {...args} />,
};

function ImmediateSelectStory(props: Readonly<FilterDropdownProps>) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { categories, onCategorySelect } = useFilterDropdownCategories();

  return (
    <FilterDropdown
      {...props}
      categories={categories}
      onApply={undefined}
      onCategorySelect={onCategorySelect}
      onClear={() => setSelectedValues([])}
      onItemSelect={setSelectedValues}
      selectedValues={selectedValues}>
      <FilterDropdownTrigger selectedCount={selectedValues.length}>Filters</FilterDropdownTrigger>
    </FilterDropdown>
  );
}

// Demonstrates the pattern where onApply is omitted and selections take effect immediately.
export const ImmediateSelect: Story = {
  render: (args) => <ImmediateSelectStory {...args} />,
};
