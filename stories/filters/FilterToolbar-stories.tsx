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
  ButtonIcon,
  Checkbox,
  DropdownMenu,
  FilterDropdown,
  FilterDropdownTrigger,
  FilterTag,
  IconChevronDown,
  IconFilter,
  IconHome,
  SearchInput,
  Text,
  ToggleButtonGroup,
  Toolbar,
  ToolbarProps,
} from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';
import { FILTER_TAG_LABELS, useFilterDropdownCategories } from './filter-dropdown-helpers';

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
  title: 'Echoes Patterns/Filters',
};

export default meta;

type Story = StoryObj<typeof Toolbar>;

const EVENTS = ['Quality gate', 'Definition Change', 'Other'];
const SORT_OPTIONS = ['Last updated', 'Name', 'Events'];

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
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set(['Quality gate']));
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [currentSort, setCurrentSort] = useState('Last updated');
  const [scope, setScope] = useState('overall');

  function toggleEvent(event: string) {
    setSelectedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(event)) {
        next.delete(event);
      } else {
        next.add(event);
      }
      return next;
    });
  }

  function dismissValue(value: string) {
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  }

  const { categories, onCategorySelect } = useFilterDropdownCategories();

  return (
    <Toolbar
      {...toolbarProps}
      datasetControls={
        datasetControls ? (
          <>
            <Text>
              <b>4</b> projects
            </Text>
            <ButtonIcon Icon={IconHome} ariaLabel="Set homepage" />
          </>
        ) : undefined
      }
      filterControls={
        filterControls ? (
          <>
            <FilterDropdown
              categories={categories}
              onApply={setSelectedValues}
              onCategorySelect={onCategorySelect}
              onClear={() => setSelectedValues([])}
              selectedValues={selectedValues}>
              <FilterDropdownTrigger selectedCount={selectedValues.length}>
                Facets Filters
              </FilterDropdownTrigger>
            </FilterDropdown>
            <DropdownMenu
              items={EVENTS.map((event) => (
                <DropdownMenu.ItemButtonCheckable
                  isChecked={selectedEvents.has(event)}
                  key={event}
                  onClick={() => toggleEvent(event)}>
                  {event}
                </DropdownMenu.ItemButtonCheckable>
              ))}>
              <Button prefix={<IconFilter />} suffix={<IconChevronDown />}>
                Events
              </Button>
            </DropdownMenu>
          </>
        ) : undefined
      }
      filterTags={[
        ...selectedValues.map((value) => (
          <FilterTag key={value} onDismiss={() => dismissValue(value)}>
            {FILTER_TAG_LABELS[value] ?? value}
          </FilterTag>
        )),
        ...[...selectedEvents].map((event) => (
          <FilterTag key={event} onDismiss={() => toggleEvent(event)}>
            {`Events: ${event}`}
          </FilterTag>
        )),
      ]}
      onClearAll={
        onClearAll
          ? () => {
              setSelectedValues([]);
              setSelectedEvents(new Set());
            }
          : undefined
      }
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
          <>
            <DropdownMenu
              items={SORT_OPTIONS.map((option) => (
                <DropdownMenu.ItemButton key={option} onClick={() => setCurrentSort(option)}>
                  {option}
                </DropdownMenu.ItemButton>
              ))}>
              <Button suffix={<IconChevronDown />}>Sort by: {currentSort}</Button>
            </DropdownMenu>
            <ToggleButtonGroup
              onChange={setScope}
              options={[
                { label: 'Overall code', value: 'overall' },
                { label: 'New code', value: 'new' },
              ]}
              selected={scope}
            />
          </>
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
