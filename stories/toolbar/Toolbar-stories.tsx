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
import {
  Button,
  Checkbox,
  DropdownMenu,
  FilterTag,
  IconChevronDown,
  IconFilter,
  SearchInput,
  Text,
  Toolbar,
  ToolbarProps,
} from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta<typeof Toolbar> = {
  argTypes: {
    datasetControls: { control: 'boolean' },
    filterControls: { control: 'boolean' },
    filterTags: { control: false },
    onClearAll: { control: 'boolean' },
    ref: { control: false },
    searchInput: { control: 'boolean' },
    selectAllControl: { control: 'boolean' },
    sortControls: { control: 'boolean' },
  },
  component: Toolbar,
  decorators: [basicWrapperDecorator],
  title: 'Echoes/Toolbar',
};

export default meta;

type Story = StoryObj<typeof Toolbar>;

const SEVERITIES = ['High', 'Medium', 'Low'];
const SORT_OPTIONS = ['Last updated', 'Name', 'Severity'];

function DefaultStory(props: Readonly<ToolbarProps>) {
  const {
    datasetControls,
    filterControls,
    onClearAll,
    searchInput,
    selectAllControl,
    sortControls,
    ...toolbarProps
  } = props;

  const [search, setSearch] = useState('');
  const [selectAll, setSelectAll] = useState<boolean | 'indeterminate'>('indeterminate');
  const [selectedSeverities, setSelectedSeverities] = useState<Set<string>>(new Set(['High']));
  const [currentSort, setCurrentSort] = useState('Last updated');

  function toggleSeverity(severity: string) {
    setSelectedSeverities((prev) => {
      const next = new Set(prev);
      if (next.has(severity)) {
        next.delete(severity);
      } else {
        next.add(severity);
      }
      return next;
    });
  }

  return (
    <Toolbar
      {...toolbarProps}
      datasetControls={
        datasetControls ? (
          <>
            <Text>4 projects</Text>
            <Button>Bulk action</Button>
          </>
        ) : undefined
      }
      filterControls={
        filterControls ? (
          <DropdownMenu
            items={SEVERITIES.map((severity) => (
              <DropdownMenu.ItemButtonCheckable
                isChecked={selectedSeverities.has(severity)}
                key={severity}
                onClick={() => toggleSeverity(severity)}>
                {severity}
              </DropdownMenu.ItemButtonCheckable>
            ))}>
            <Button prefix={<IconFilter />}>Filters</Button>
          </DropdownMenu>
        ) : undefined
      }
      filterTags={[...selectedSeverities].map((severity) => (
        <FilterTag key={severity} onDismiss={() => toggleSeverity(severity)}>
          {`Severity: ${severity}`}
        </FilterTag>
      ))}
      onClearAll={onClearAll ? () => setSelectedSeverities(new Set()) : undefined}
      searchInput={
        searchInput ? (
          <SearchInput
            onChange={setSearch}
            placeholderLabel="Search issues"
            value={search}
            width="large"
          />
        ) : undefined
      }
      selectAllControl={
        selectAllControl ? (
          <Checkbox
            ariaLabel="Select all"
            checked={selectAll}
            onCheck={(checked) => setSelectAll(checked)}
          />
        ) : undefined
      }
      sortControls={
        sortControls ? (
          <DropdownMenu
            items={SORT_OPTIONS.map((option) => (
              <DropdownMenu.ItemButton key={option} onClick={() => setCurrentSort(option)}>
                {option}
              </DropdownMenu.ItemButton>
            ))}>
            <Button suffix={<IconChevronDown />}>Sort: {currentSort}</Button>
          </DropdownMenu>
        ) : undefined
      }
    />
  );
}

export const Default: Story = {
  args: {
    ariaLabel: 'Issue filters and actions',
    datasetControls: true,
    filterControls: true,
    labelClearAll: 'Clear filters',
    labelEmptyFilterTags: 'No filters applied',
    onClearAll: true as unknown as () => void,
    searchInput: true,
    selectAllControl: true,
    sortControls: true,
  },
  render: (args) => <DefaultStory {...args} />,
};
