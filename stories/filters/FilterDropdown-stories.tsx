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
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  FilterDropdown,
  FilterDropdownCategory,
  FilterDropdownProps,
  FilterDropdownTrigger,
} from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

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
  title: 'Echoes/Filters/FilterDropdown',
};

export default meta;

type Story = StoryObj<typeof FilterDropdown>;

const SEVERITY_ITEMS = [
  { label: 'High', value: 'high', suffix: '42' },
  { label: 'Medium', value: 'medium', suffix: '17' },
  { label: 'Low', value: 'low', suffix: '8' },
  { label: 'Info', value: 'info', suffix: '3' },
];

const TYPE_ITEMS = [
  { label: 'Bug', value: 'bug', suffix: '24' },
  { label: 'Vulnerability', value: 'vulnerability', suffix: '12' },
  { label: 'Code Smell', value: 'code-smell', suffix: '34' },
];

const STATUS_ITEMS = [
  { label: 'Open', value: 'open', suffix: '55' },
  { label: 'Confirmed', value: 'confirmed', suffix: '11' },
  { label: 'Resolved', value: 'resolved', suffix: '4' },
];

const ALL_ASSIGNEE_ITEMS = [
  { label: 'Alice Martin', value: 'alice' },
  { label: 'Bob Johnson', value: 'bob' },
  { label: 'Carol Williams', value: 'carol' },
  { label: 'David Brown', value: 'david' },
  { label: 'Eve Davis', value: 'eve' },
  { label: 'Frank Miller', value: 'frank' },
  { label: 'Grace Wilson', value: 'grace' },
  { label: 'Hank Moore', value: 'hank' },
  { label: 'Iris Taylor', value: 'iris' },
  { label: 'Jack Anderson', value: 'jack' },
];

function randomDelay(minMs: number, maxMs: number) {
  return Math.random() * (maxMs - minMs) + minMs;
}

function withRandomCounts<T extends { label: string; value: string }>(
  items: T[],
): (T & { suffix: string })[] {
  return items.map((item) => ({
    ...item,
    suffix: (Math.floor(Math.random() * 99) + 1).toString(),
  }));
}

function DateRangeContent({ ref }: Readonly<{ ref?: React.Ref<HTMLInputElement> }>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
      <p style={{ margin: 0 }}>
        This is a custom component rendered inside the right panel. Arrow keys navigate between
        panels; interaction within is managed by the consumer.
      </p>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {'From'}
        <input ref={ref} type="date" />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {'To'}
        <input type="date" />
      </label>
    </div>
  );
}

/**
 * Builds the shared category set used by all stories:
 * - Severity: multi-select, sync items
 * - Type: single-select, sync items
 * - Status: multi-select, client-side search, sync items
 * - Assignee: multi-select, async items, server-side search
 * - Date Range: custom content
 */
function useFilterDropdownCategories() {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [assigneeItems, setAssigneeItems] = useState<FilterDropdownCategory['items']>(undefined);

  const handleCategorySelect = useCallback(
    (label: string) => {
      // Only trigger the async load on the first visit; subsequent visits show cached items.
      if (label === 'Assignee' && assigneeItems === undefined) {
        setTimeout(
          () => setAssigneeItems(withRandomCounts(ALL_ASSIGNEE_ITEMS)),
          randomDelay(1000, 3000),
        );
      }
    },
    [assigneeItems],
  );

  // Simulate a server-side search: keep current items visible while fetching,
  // then replace with filtered results once resolved.
  const handleAssigneeSearch = useCallback((query: string) => {
    setTimeout(() => {
      const matched = ALL_ASSIGNEE_ITEMS.filter(
        (item) => !query || item.label.toLowerCase().includes(query.toLowerCase()),
      );
      setAssigneeItems(withRandomCounts(matched));
    }, 500);
  }, []);

  const categories = useMemo<FilterDropdownCategory[]>(
    () => [
      { isMultiSelect: true, label: 'Severity', items: SEVERITY_ITEMS },
      { isMultiSelect: false, label: 'Type', items: TYPE_ITEMS },
      { isMultiSelect: true, isSearchable: true, label: 'Status', items: STATUS_ITEMS },
      {
        isMultiSelect: true,
        isSearchable: true,
        items: assigneeItems,
        label: 'Assignee',
        labelSearchPlaceholder: 'Search assignees…',
        onSearch: handleAssigneeSearch,
      },
      {
        content: <DateRangeContent ref={dateInputRef} />,
        onFocusContent: () => {
          dateInputRef.current?.focus();
        },
        label: 'Date Range',
      },
    ],
    [assigneeItems, handleAssigneeSearch],
  );

  return { categories, onCategorySelect: handleCategorySelect };
}

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
